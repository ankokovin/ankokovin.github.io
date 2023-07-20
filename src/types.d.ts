import { projects } from "Data/projects.json";
import {PostInfo} from "Plugin/types";

export type Project = typeof projects[number];

export type Scheme = "dark" | "light";

export interface Post extends PostInfo {
	html: string
}

export {PostIndex,PostInfo} from "Plugin/types";