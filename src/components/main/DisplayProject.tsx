import { Project } from "../../types";

export default function DisplayProject(props: { project: Project }) {
	return <div className='display-project'>
		<h1>{props.project["ru-name"]}</h1>
		<iframe src={`https://ankokovin.github.io/${props.project.id}`}></iframe>
	</div>;
}
