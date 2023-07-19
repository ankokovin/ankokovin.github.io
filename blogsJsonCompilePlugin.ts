//starting source https://github.com/tasynguyen3894/vite-plugin-example/blob/master/viteCNAMEPlugin.js
import fs from "fs";
import {gitlogPromise} from "gitlog";
import { resolve } from "path";

let viteConfig = null as any;

export default function blogsJsonCompilePlugin(){
	return {
		name: "blogsJsonCompilePlugin",
		configResolved(resolvedConfig) {
			viteConfig = resolvedConfig;
		},
		async writeBundle() {
			const outDir = resolve(viteConfig?.build?.outDir || "dist");

			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir);
			}

			const postsDir = resolve(outDir, "posts");


			if (!fs.existsSync(postsDir)) {
				fs.mkdirSync(postsDir);
			}

			const fileOutPath = resolve(postsDir, "index.json");

			const result =  await Promise.all(fs.readdirSync(resolve(__dirname, "./src/data/posts/"))
				.filter(file => file.endsWith(".html"))
				.map(file => {
					console.log({file, __dirname});
					return gitlogPromise({
						repo: __dirname,
						file: "./src/data/posts/" + file 
					});
				}));

			fs.writeFileSync(fileOutPath, JSON.stringify(result));
		}
	};
}