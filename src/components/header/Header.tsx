import "./Header.css";

import emailLogo from "Assets/email-address-svgrepo-com.svg";
import emailLogoWhite from "Assets/email-address-svgrepo-com-white.svg";
import githubLogo from "Assets/github-mark.svg";
import githubLogoWhite from "Assets/github-mark-white.svg";
import telegramLogo from "Assets/telegram-fill-svgrepo-com.svg";
import telegramLogoWhite from "Assets/telegram-fill-svgrepo-com-white.svg";

import { Project } from "../../types";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import ProjectsDialog from "./ProjectsDialog";


function Header(props: { onProjectChange: (arg0: null | Project) => void; }) {
	const {projectDialogButton, projectDialog} = ProjectsDialog(props.onProjectChange);

	return (
		<>
			<header>
				<a href="/">🏠</a>
				<DarkModeToggle />
				{projectDialogButton}
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
				{projectDialog}
			</header>

		</>
	);
}

export default Header; 