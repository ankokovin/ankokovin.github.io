import {filesize} from "filesize";
import fs from "fs";
import {gitlogPromise} from "gitlog";
import { resolve } from "path";
import { PluginOption, ResolvedConfig } from "vite";

export interface PostsInfo {
	/** Name of html file */
    file: string,
	/** Timestamp of first commit */
    created: number,
	/** Timestamp of last commit */
	lastUpdated: number,
	/** Name of the first commit author*/
    author: string
}

export interface PostsJsonCompilePluginParams {
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
	repo?: string,
	/**
	 * Output information to stdout
	 * 
	 * @default false
	 */
	verbose?: boolean,
}

export default function vitePluginPostsJsonCompile({outIndexPath, postsPath, indexFileName = "index.json", repo = __dirname, verbose = false}: PostsJsonCompilePluginParams) : PluginOption{
	const PLUGIN_NAME = "vite-plugin-posts-json-compile";

	let viteConfig = null as null | ResolvedConfig;

	async function getPostHistory(file: string) : Promise<PostsInfo> {
		const timeLable = `\n${PLUGIN_NAME}: Ran post ${file} in`;
		if (verbose) {
			console.time(timeLable);
		}
	
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

		if (verbose) {
			console.timeEnd(timeLable);
		}
		
		return {
			file,
			created: firstCommit.date,
			lastUpdated: lastCommit.date,
			author: firstCommit.author
		};
	}

	async function getPosts(): Promise<PostsInfo[]> {
		return await Promise.all(fs.readdirSync(postsPath)
			.filter(file => file.endsWith(".html"))
			.map(file => getPostHistory(file)));
	}
	
	return {
		name: PLUGIN_NAME,
		configResolved(resolvedConfig) {
			viteConfig = resolvedConfig;
		},
		async writeBundle() {
			const timeLable = `${PLUGIN_NAME}: Compiled posts in`;
			
			if (verbose) {
				console.log(`\n${PLUGIN_NAME}: Compiling posts\n`);
				console.time(timeLable);	
			}
			
			const outDir = resolve(viteConfig?.build?.outDir || "dist");

			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir);
			}

			const outIndexDir = resolve(outDir, outIndexPath);

			if (!fs.existsSync(outIndexDir)) {
				fs.mkdirSync(outIndexDir);
			}

			const fileOutPath = resolve(outIndexDir, indexFileName);
			const result = getPosts();

			fs.writeFileSync(fileOutPath, JSON.stringify(result));

			if (verbose) {
				console.log(`\n${PLUGIN_NAME}: Compiled posts info at ${fileOutPath} ${filesize(fs.statSync(fileOutPath).size)}`);
				console.timeEnd(timeLable);
			}
		},
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				if(req.method === "GET" && req.url?.endsWith(`${outIndexPath}/${indexFileName}`)) {
					res.end(JSON.stringify(await getPosts()));
					return;
				}
				next();
			});
		}
	};
}