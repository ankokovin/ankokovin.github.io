import "./DisplayProject.css";

import { useLoaderData } from "react-router-dom";

import { Project } from "../../types";

export default function DisplayProject() {
	const project = useLoaderData() as Project;

	return <main>
		<div className='display-project'>
			<h1>{project["ru-name"]}</h1>
			<iframe src={`https://ankokovin.github.io/${project.id}`} title={`Project "${project.id}"`}></iframe>
		</div>
	</main> ;
}
