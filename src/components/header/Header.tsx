import "./Header.css";

import emailLogo from "Assets/email-address-svgrepo-com.svg";
import emailLogoWhite from "Assets/email-address-svgrepo-com-white.svg";
import githubLogo from "Assets/github-mark.svg";
import githubLogoWhite from "Assets/github-mark-white.svg";
import telegramLogo from "Assets/telegram-fill-svgrepo-com.svg";
import telegramLogoWhite from "Assets/telegram-fill-svgrepo-com-white.svg";
import { projects } from "Data/projects.json";
import { useRef } from "react";
import { isSmallScreen } from "Utils";

import { Project } from "../../types";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import ProjectItem from "./ProjectItem";


function Header(props: { onProjectChange: (arg0: null | Project) => void; }) {
	const projectDialogRef = useRef<HTMLDialogElement>(null);
	const projectDialogContentWrapperRef = useRef<HTMLDivElement>(null);
	const projectsButtonDialogRef = useRef<HTMLButtonElement>(null);

	const handleClick = (e: MouseEvent) => {
		if (e.target == projectsButtonDialogRef?.current) {
			return;
		}
		
		if (!projectDialogContentWrapperRef?.current?.contains(e.target as Node | null)) {
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

		if (isSmallScreen()) {
			projectDialogRef.current.showModal();
			projectDialogRef.current.addEventListener("click", handleClick);
			return;
		} 

		projectDialogRef.current.show();
		document.addEventListener("click", handleClick);		
	};

	const close = (project?: false | Project) => {
		if (!projectDialogRef?.current) {
			return;
		}
		projectDialogRef.current.removeEventListener("click", handleClick);
		document.removeEventListener("click", handleClick);	
		projectDialogRef.current.close();
		if (project === false) {
			props.onProjectChange(null);
		}
		if (project) {
			props.onProjectChange(project);
		}
	};

	const renderProjectsByTag = (tag: string) => {
		const filteredProjects = projects
			.filter(project => project.tags.includes(tag))
			.map((project, idx) =>
				<ProjectItem key={idx} project={project} close={close} />
			);
		return filteredProjects.length ? filteredProjects : (<p>Таких <del>пока</del> нет &#128550;</p>);
	};

	return (
		<>
			<header>
				<a href="/">🏠</a>
				<DarkModeToggle />
				<div>
					<button onClick={open} ref={projectsButtonDialogRef}>Выбрать проект</button>
				</div>

				<Logo
					href="https://github.com/ankokovin/ankokovin.github.io"
					title="Код этой страницы"
					darkModeImg={githubLogoWhite}
					lightModeImg={githubLogo}
					alt="GitHub Invercat logo"
				/>
				<Logo
					href="mailto:rycarok@gmail.com"
					title="rycarok@gmail.com"
					darkModeImg={emailLogoWhite}
					lightModeImg={emailLogo}
					alt="Email icon"
				/>
				<Logo
					href="https://t.me/ankokovin"
					title="Мой Telegram"
					darkModeImg={telegramLogoWhite}
					lightModeImg={telegramLogo}
					alt="Telegram logo"
				/>
				<dialog ref={projectDialogRef}>
					<div className='dialog-wrapper' ref={projectDialogContentWrapperRef}>
						<button className="dialog-close-button" onClick={() => close(false)}>
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
								<circle cx="50%" cy="50%" r="45%"  fill="none" stroke="currentColor" strokeWidth="2" />
								<line 	x1="22%" x2="78%" y1="22%" y2="78%"		 stroke="currentColor" strokeWidth="2"/>
								<line 	x1="22%" x2="78%" y1="78%" y2="22%"		 stroke="currentColor" strokeWidth="2"/>
							</svg></button>
						<h2>Проекты</h2>
						<button onClick={() => close(false)}>Главная</button>
						<h3>Интересные</h3>
						<section className='project-container'>
							{renderProjectsByTag("interesting")}
						</section>
						<h3>Учебные</h3>
						<section className='project-container'>
							{renderProjectsByTag("study")}
						</section>
					</div>
				</dialog>
			</header>

		</>
	);
}

export default Header; 