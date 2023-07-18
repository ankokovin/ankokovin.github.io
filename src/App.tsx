import "./App.css";

import Footer from "Components//footer";
import Header from "Components//header";
import Main from "Components//main";
import BlogMain from "Components/blog";
import DisplayProject from "Components/project";
import useProjectsDialog from "Components/project/ProjectsDialog";
import { projects } from "Data/projects.json";
import { useCallback, useState } from "react";
import {
	createHashRouter,
	RouterProvider} from "react-router-dom";

import DarkModeContext from "./context/DarkModeContext";
import { Project, Scheme } from "./types";
import { getPreferredColorScheme, isSmallScreen } from "./utils";

const router = createHashRouter([
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "/project/:projectId",
		element: <DisplayProject />,
		loader: async ({params}) => projects.find(project => project.id === params.projectId),
	},
	{
		path: "/blog",
		element: <BlogMain />
	}
]);

export default function App() {

	const onProjectChange = useCallback((project: null | Project) => {
		if (!project) {
			return;
		}

		const shouldOpenInNewTab = project.tags.includes("colab")
      || (isSmallScreen() && project.tags.includes("no-mobile"));


		if (shouldOpenInNewTab) {
			window.open(project.link ?? `https://ankokovin.github.io/${project.id}`);
			return;
		}

		if (project.tags.includes("local")) {
			router.navigate(`/${project.id}`);
			return;
		}

		router.navigate(`/project/${project.id}`);
	}, []);

	const [projectDialogButton, projectDialog] =  useProjectsDialog(onProjectChange);

	const [currentScheme, setCurrentScheme] = useState<Scheme>(getPreferredColorScheme());
	

	const darkModeContextValue = {
		isDarkMode: currentScheme === "dark",
		currentScheme,
		setCurrentScheme
	};

	return (
		<DarkModeContext.Provider value={darkModeContextValue}>
			<Header home={() => router.navigate("/")} projectDialogButton={projectDialogButton} />
			<div className="project-dialog-wrapper">
				{projectDialog}
			</div>
			<RouterProvider router={router}/>
			<Footer />
		</DarkModeContext.Provider>
	);
}