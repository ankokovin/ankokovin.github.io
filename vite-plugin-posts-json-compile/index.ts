import {filesize} from "filesize";
import fs from "fs";
import {gitlogPromise} from "gitlog";
import { resolve } from "path";
import { PluginOption, ResolvedConfig } from "vite";

import { PostInfo, PostsJsonCompilePluginParams } from "./types";

export default function vitePluginPostsJsonCompile({outIndexPath, postsPath, indexFileName = "index.json", repo = __dirname, verbose = false}: PostsJsonCompilePluginParams) : PluginOption{
	const PLUGIN_NAME = "vite-plugin-posts-json-compile";

	let viteConfig = null as null | ResolvedConfig;

	const PLUGIN_LOG_PREFIX = `\x1b[96m[${PLUGIN_NAME}]\x1b[00m`;

	async function getPostHistory(file: string) : Promise<PostInfo> {
		const timeLable = `\n${PLUGIN_LOG_PREFIX} Ran post ${file} in`;
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

	function getPosts(): Promise<PostInfo[]> {
		return Promise.all(fs.readdirSync(postsPath)
			.filter(file => file.endsWith(".html"))
			.map(file => getPostHistory(file)));
	}
	
	return {
		name: PLUGIN_NAME,
		configResolved(resolvedConfig) {
			viteConfig = resolvedConfig;
		},
		async writeBundle() {
			const timeLable = `${PLUGIN_LOG_PREFIX} Compiled posts in`;
			
			if (verbose) {
				console.log(`\n${PLUGIN_LOG_PREFIX} Compiling posts ...\n`);
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
			const result = await getPosts();

			if (!result || !result.length) {
				console.warn(`${PLUGIN_LOG_PREFIX} \x1b[33mResult is empty!\x1b[0m`)
			}

			fs.writeFileSync(fileOutPath, JSON.stringify(result));

			if (verbose) {
				console.log(`\n${PLUGIN_LOG_PREFIX} Compiled posts info at ${fileOutPath} ${filesize(fs.statSync(fileOutPath).size)}`);
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