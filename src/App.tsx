import "./App.css";

import Main from "Components//main";
import BlogMain from "Components/blog";
import BlogPost from "Components/blog/BlogPost";
import DisplayProject from "Components/project";
import { projects } from "Data/projects.json";
import { useState } from "react";
import {
	createHashRouter,
	LoaderFunctionArgs,
	RouterProvider} from "react-router-dom";

import DarkModeContext from "./context/DarkModeContext";
import DefaultLayout from "./DefaultLayout";
import { Post, PostIndex, Project, Scheme } from "./types";
import { getPreferredColorScheme } from "./utils";


export default function App() {

	async function loadProject({params} : LoaderFunctionArgs) : Promise<Project | null> {
		const project = projects.find(project => project.id === params.projectId);
		if (!project) {
			return null;
		}

		return project;
	}

	async function fetchPostsIndex() : Promise<PostIndex> {
		const res = await fetch("/posts/index.json");

		return await res.json() as PostIndex;
	}

	async function loadPost({params} : LoaderFunctionArgs) : Promise<Post | null> {
		const index = await fetchPostsIndex();
		const post = index.find(postInfo => postInfo.file === `${params.postName}.html`);
		if (!post) {
			//TODO: post not found
			return null;
		}
		const html = await (await fetch(`/posts/${post?.file}`)).text();
		return {...post, html};
	}

	const router = createHashRouter([
		{
			path: "/",
			element: <DefaultLayout>
				<Main />
			</DefaultLayout>,
		},
		{
			path: "/project/:projectId",
			element: <DefaultLayout>
				<DisplayProject />
			</DefaultLayout>,
			loader: loadProject
		},
		{
			path: "/blog",
			element: <DefaultLayout>
				<BlogMain />
			</DefaultLayout>,
			loader: fetchPostsIndex
		},
		{
			path: "/blog/:postName",
			element: <DefaultLayout>
				<BlogPost />
			</DefaultLayout>,
			loader: loadPost
		}
	]);

	const [currentScheme, setCurrentScheme] = useState<Scheme>(getPreferredColorScheme());
	

	const darkModeContextValue = {
		isDarkMode: currentScheme === "dark",
		currentScheme,
		setCurrentScheme
	};

	return (
		<DarkModeContext.Provider value={darkModeContextValue}>
			<RouterProvider router={router}/>
		</DarkModeContext.Provider>
	);
}