import { projects } from "Data/projects.json";
import { useRef } from "react";
import { Project } from "Types";
import { isSmallScreen } from "Utils";

import ProjectItem from "./ProjectItem";

export default function ProjectsDialog(onProjectChange: (arg0: null | Project) => void) {
	const projectDialogRef = useRef<HTMLDialogElement>(null);
	const projectDialogContentWrapperRef = useRef<HTMLDivElement>(null);
	const projectsButtonDialogRef = useRef<HTMLButtonElement>(null);


	const renderProjectsByTag = (tag: string) => {
		const filteredProjects = projects
			.filter(project => project.tags.includes(tag))
			.map((project, idx) =>
				<ProjectItem key={idx} project={project} close={close} />
			);
		return filteredProjects.length ? filteredProjects : (<p>Таких <del>пока</del> нет &#128550;</p>);
	};

	const close = (project?: false | Project) => {
		if (!projectDialogRef?.current) {
			return;
		}
		document.body.removeEventListener("keydown", handleKeyDown);
		projectDialogRef.current.removeEventListener("click", handleClick);
		document.removeEventListener("click", handleClick);	
		projectDialogRef.current.close();
		if (project === false) {
			onProjectChange(null);
		}
		if (project) {
			onProjectChange(project);
		}
	};

	const handleClick = (e: MouseEvent) => {
		if (e.target == projectsButtonDialogRef?.current) {
			return;
		}
		
		if (!projectDialogContentWrapperRef?.current?.contains(e.target as Node | null)) {
			close();
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			close();
		}
	};

	const open = () => {
		if (!projectDialogRef?.current) {
			return;
		}

		if (projectDialogRef.current.open) {
			projectDialogRef.current.close();
			return;
		}

		document.body.addEventListener("keydown", handleKeyDown);

		if (isSmallScreen()) {
			projectDialogRef.current.showModal();
			projectDialogRef.current.addEventListener("click", handleClick);
			return;
		} 

		projectDialogRef.current.show();
		document.addEventListener("click", handleClick);
	};

	const projectDialogButton = <button onClick={open} ref={projectsButtonDialogRef}>Выбрать проект</button>;

	const projectDialog = <dialog ref={projectDialogRef}>
		<div className='dialog-wrapper' ref={projectDialogContentWrapperRef}>
			<button className="dialog-close-button" onClick={() => close(false)}>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
					<circle cx="50%" cy="50%" r="45%"  fill="none" stroke="currentColor" strokeWidth="2"/>
					<line 	x1="22%" x2="78%" y1="22%" y2="78%"		 stroke="currentColor" strokeWidth="2"/>
					<line 	x1="22%" x2="78%" y1="78%" y2="22%"		 stroke="currentColor" strokeWidth="2"/>
				</svg>
			</button>
			<h2>Проекты</h2>
			<h3>Интересные</h3>
			<section className='project-container'>
				{renderProjectsByTag("interesting")}
			</section>
			<h3>Учебные</h3>
			<section className='project-container'>
				{renderProjectsByTag("study")}
			</section>
		</div>
	</dialog>;
	return {
		projectDialogButton,
		projectDialog
	};
}