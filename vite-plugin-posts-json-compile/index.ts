import {filesize} from "filesize";
import fs from "fs";
import {gitlogPromise} from "gitlog";
import { resolve } from "path";
import { PluginOption, ResolvedConfig } from "vite";

import { PostIndex, PostInfo, PostsJsonCompilePluginParams } from "./types";

export default function vitePluginPostsJsonCompile({outIndexPath, postsPath, indexFileName = "index.json", repo = __dirname, verbose = false, debug = false}: PostsJsonCompilePluginParams) : PluginOption{
	const PLUGIN_NAME = "vite-plugin-posts-json-compile";

	let viteConfig = null as null | ResolvedConfig;

	const PLUGIN_LOG_PREFIX = `\x1b[96m[${PLUGIN_NAME}]\x1b[00m`;

	const DEFAULT_COMMIT = {date: Date.now(), author: "Unknown"};

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
			if (debug) {
				console.debug(`${PLUGIN_LOG_PREFIX} ${file} got git logs`, commit)
			}
			return {
				date: Date.parse(commit.authorDate),
				author: commit.authorName 
			};
		});
		const firstCommit = gitLogs.length ? gitLogs.reduce((p, v) => p.date > v.date ? v : p) : DEFAULT_COMMIT;
		const lastCommit = gitLogs.length ? gitLogs.reduce((p, v) => p.date < v.date ? v : p) : DEFAULT_COMMIT;

		if (verbose) {
			console.timeEnd(timeLable);
		}

		if (debug) {
			console.debug(`${PLUGIN_LOG_PREFIX} ${file}`, {firstCommit, lastCommit})
		}
		
		return {
			file,
			created: firstCommit.date,
			lastUpdated: lastCommit.date,
			author: firstCommit.author
		};
	}

	async function getPostsIndex(): Promise<PostIndex> {
		return (await Promise.all(fs.readdirSync(postsPath)
			.filter(file => file.endsWith(".html"))
			.map(file => getPostHistory(file))))
			.sort((a, b) => b.created - a.created);
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
			const result = await getPostsIndex();

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
					res.end(JSON.stringify(await getPostsIndex()));
					return;
				}
				next();
			});
		}
	};
}