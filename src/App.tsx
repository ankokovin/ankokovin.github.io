import "./App.css";

import Main from "Components//main";
import BlogMain from "Components/blog";
import DisplayProject from "Components/project";
import { projects } from "Data/projects.json";
import { useState } from "react";
import {
	createHashRouter,
	RouterProvider} from "react-router-dom";

import DarkModeContext from "./context/DarkModeContext";
import DefaultLayout from "./DefaultLayout";
import {  Scheme } from "./types";
import { getPreferredColorScheme } from "./utils";


export default function App() {

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
			loader: async ({params}) => projects.find(project => project.id === params.projectId),
		},
		{
			path: "/blog",
			element: <DefaultLayout>
				<BlogMain />
			</DefaultLayout>,
			loader: async () => {
				const res = await fetch("/posts/index.json");

				return await res.json();
			} 
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