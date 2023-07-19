import Footer from "Components/footer";
import Header from "Components/header";
import useProjectsDialog from "Components/project/ProjectsDialog";
import { useNavigate } from "react-router-dom";
import { Project } from "Types";
import { isSmallScreen } from "Utils";


type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export default function DefaultLayout({children} : Props) {

	const navigate = useNavigate();

	const onProjectChange = (project: null | Project) => {
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
			navigate(`/${project.id}`);
			return;
		}
	
		navigate(`/project/${project.id}`);
	};

	const [projectDialogButton, projectDialog] =  useProjectsDialog(onProjectChange);

	return <>
		<Header projectDialogButton={projectDialogButton}/>
		<div className="project-dialog-wrapper">
			{projectDialog}
		</div>
		{children}
		<Footer/>
	</>;
}