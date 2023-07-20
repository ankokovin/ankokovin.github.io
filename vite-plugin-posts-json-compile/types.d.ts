
export interface PostInfo {
	/** Name of html file */
	file: string;
	/** Timestamp of first commit */
	created: number;
	/** Timestamp of last commit */
	lastUpdated: number;
	/** Name of the first commit author*/
	author: string;
}

export type PostIndex = PostInfo[];

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
	/**
	 * Output debug information
	 * 
	 * @default false
	 */
	debug?: boolean
}
