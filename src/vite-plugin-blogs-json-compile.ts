import {filesize} from "filesize";
import fs from "fs";
import {gitlogPromise} from "gitlog";
import { resolve } from "path";
import { PluginOption, ResolvedConfig } from "vite";

export interface BlogInfo {
	/** Name of html file */
    file: string,
	/** Timestamp of first commit */
    created: number,
	/** Timestamp of last commit */
	lastUpdated: number,
	/** Name of the first commit author*/
    author: string
}

export interface BlogsJsonCompilePluginParams {
	/** The location of html posts */
	postsPath: string,
	/** The target location of JSON file with post`s information, specified relative to outDir */
	outIndexPath: string, 
	/** 
	 * The name of JSON file with post`s information 
	 * 
	 * @default 'index.json'
	*/
	indexFileName?: string,
	/** 
	 * The location of the git repo 
	 * 
	 * @default __dirname
	*/
	repo?: string
}

export default function vitePluginBlogsJsonCompile({outIndexPath, postsPath, indexFileName = "index.json", repo = __dirname}: BlogsJsonCompilePluginParams) : PluginOption{
	const PLUGIN_NAME = "vite-plugin-blogs-json-compile";

	let viteConfig = null as null | ResolvedConfig;

	async function getPostHistory(file: string) : Promise<BlogInfo> {
		const timeLable = `\n${PLUGIN_NAME}: Ran blog ${file} in`;
		console.time(timeLable);
	
		const filePath = resolve(postsPath, file);

		const gitLogs = (await gitlogPromise({	
			repo,
			file: filePath,
		})).map(commit => {
			return {
				date: Date.parse(commit.authorDate),
				author: commit.authorName 
			};
		});
		const firstCommit = gitLogs.reduce((p, v) => p.date > v.date ? v : p);
		const lastCommit = gitLogs.reduce((p, v) => p.date < v.date ? v : p);

		console.timeEnd(timeLable);
	
		return {
			file,
			created: firstCommit.date,
			lastUpdated: lastCommit.date,
			author: firstCommit.author
		};
	}
	
	return {
		name: PLUGIN_NAME,
		configResolved(resolvedConfig: ResolvedConfig) {
			viteConfig = resolvedConfig;
		},
		async writeBundle() {
			console.log(`\n${PLUGIN_NAME}: Compiling blogs\n`);
			const timeLable = `${PLUGIN_NAME}: Compiled blogs in`;
			console.time(timeLable);

			const outDir = resolve(viteConfig?.build?.outDir || "dist");

			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir);
			}

			const outIndexDir = resolve(outDir, outIndexPath);

			if (!fs.existsSync(outIndexDir)) {
				fs.mkdirSync(outIndexDir);
			}

			const fileOutPath = resolve(outIndexDir, indexFileName);
			const result =  await Promise.all(fs.readdirSync(postsPath)
				.filter(file => file.endsWith(".html"))
				.map(getPostHistory));

			fs.writeFileSync(fileOutPath, JSON.stringify(result));

			console.log(`\n${PLUGIN_NAME}: Compiled blog info at ${fileOutPath} ${filesize(fs.statSync(fileOutPath).size)}`);
			console.timeEnd(timeLable);
		}
	};
}