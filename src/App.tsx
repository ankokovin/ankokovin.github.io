import "./App.css";

import { useCallback, useState } from "react";

import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";
import DarkModeContext from "./context/DarkModeContext";
import { Project, Scheme } from "./types";
import { getPreferredColorScheme, isSmallScreen } from "./utils";



export default function App() {

	const [currentProject, setCurrentProject] = useState<null | Project>(null);

	const onProjectChange = useCallback((project: null | Project) => {
		if (!project) {
			setCurrentProject(project);
			return;
		}

		const shouldOpenInNewTab = project.tags.includes("colab")
      || (isSmallScreen() && project.tags.includes("no-mobile"));


		if (shouldOpenInNewTab) {
			window.open(project.link ?? `https://ankokovin.github.io/${project.id}`);
			return;
		}

		setCurrentProject(project);
	}, []);

	const [currentScheme, setCurrentScheme] = useState<Scheme>(getPreferredColorScheme());


	const darkModeContextValue = {
		isDarkMode: currentScheme === "dark",
		currentScheme,
		setCurrentScheme
	};

	return (
		<DarkModeContext.Provider value={darkModeContextValue} >
			<Header onProjectChange={onProjectChange} />
			<Main currentProject={currentProject}/>
			<Footer />
		</DarkModeContext.Provider>
	);
}