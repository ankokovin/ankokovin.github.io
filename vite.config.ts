import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"Assets": path.resolve(__dirname, "./src/assets"),
			"Context": path.resolve(__dirname, "./src/context"),
			"Data": path.resolve(__dirname, "./src/data"),
			"Types": path.resolve(__dirname, "./src/types.d.ts"),
			"Utils": path.resolve(__dirname, "./src/utils.ts"),
		}
	},
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: path.resolve(__dirname, "./legacy") + "/[!.]*",
					dest: "./legacy"
				}
			]
		}),
	],
});
