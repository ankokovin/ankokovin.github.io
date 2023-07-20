import fs from "fs";
import {gitlogPromise} from "gitlog";
import { resolve } from "path";
import {filesize} from "filesize";
import { PluginOption, ResolvedConfig } from "vite";

export interface BlogInfo {
    file: string,
    created: number,
    author: string
}

export interface BlogsJsonCompilePluginParams {
	postsPath: string,
	outIndexPath: string
}

export default function blogsJsonCompilePlugin({outIndexPath, postsPath}: BlogsJsonCompilePluginParams) : PluginOption{
	const PLUGIN_NAME = "vite-plugin-blogs-json-compile-plugin";

	let viteConfig = null as any;

	async function getPostHistory(file: string) : Promise<BlogInfo> {
		const timeLable = `\n${PLUGIN_NAME}: Ran blog ${file} in`;
		console.time(timeLable)
	
		const gitLogs = (await gitlogPromise({	
			repo: __dirname,
			file: postsPath + file 
		})).map(commit => {
			return {
				date: Date.parse(commit.authorDate),
				author: commit.authorName 
			}
		})
		const firstCommit = gitLogs.reduce((p, v) => p.date > v.date ? v : p);
		
		console.timeEnd(timeLable);
	
		return {
			file,
			created: firstCommit.date,
			author: firstCommit.author
		}
	}
	
	return {
		name: PLUGIN_NAME,
		configResolved(resolvedConfig: ResolvedConfig) {
			viteConfig = resolvedConfig;
		},
		async writeBundle() {
			console.log(`\n${PLUGIN_NAME}: Compiling blogs\n`)
			const timeLable = `${PLUGIN_NAME}: Compiled blogs in`;
			console.time(timeLable)

			const outDir = resolve(viteConfig?.build?.outDir || "dist");

			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir);
			}

			const postsDir = resolve(outDir, outIndexPath);

			if (!fs.existsSync(postsDir)) {
				fs.mkdirSync(postsDir);
			}

			const fileOutPath = resolve(postsDir, "index.json");

			const result =  await Promise.all(fs.readdirSync(resolve(__dirname, "./src/data/posts/"))
				.filter(file => file.endsWith(".html"))
				.map(getPostHistory));

			fs.writeFileSync(fileOutPath, JSON.stringify(result));

			console.log(`\n${PLUGIN_NAME}: Compiled blog info at ${fileOutPath} ${filesize(fs.statSync(fileOutPath).size)}`);
			console.timeEnd(timeLable)
		}
	};
}