import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import vitePluginPostsJsonCompile from "./vite-plugin-posts-json-compile";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"Assets": path.resolve(__dirname, "src/assets"),
			"Context": path.resolve(__dirname, "src/context"),
			"Components": path.resolve(__dirname, "src/components"),
			"Data": path.resolve(__dirname, "src/data"),
			"Types": path.resolve(__dirname, "src/types.d.ts"),
			"Utils": path.resolve(__dirname, "src/utils.ts"),
			"Plugin": path.resolve(__dirname, "plugin")
		},
	},
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: path.resolve(__dirname, "./legacy") + "/[!.]*",
					dest: "./legacy"
				},
				{
					src: path.resolve(__dirname, "./src/data/posts/imgs/[!.]*"),
					dest: "./posts/imgs"
				},
				{
					src: path.resolve(__dirname, "./src/data/posts/[!.]*.html"),
					dest: "./posts"
				}
			]
		}),
		vitePluginPostsJsonCompile({outIndexPath: "posts", postsPath: "./src/data/posts/", verbose: true, debug: true})
	],
});
