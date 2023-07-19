import "./DisplayProject.css";

import { useLoaderData } from "react-router-dom";

import { Project } from "../../types";

export default function DisplayProject() {
	const project = useLoaderData() as Project;

	return <main className="display-project">
		<div>
			<h1>{project["ru-name"]}</h1>
			<iframe src={`https://ankokovin.github.io/${project.id}`} title={`Project "${project.id}"`}></iframe>
		</div>
	</main> ;
}
