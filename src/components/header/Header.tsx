import "./Header.css";

import emailLogo from "Assets/email-address-svgrepo-com.svg";
import emailLogoWhite from "Assets/email-address-svgrepo-com-white.svg";
import telegramLogo from "Assets/telegram-fill-svgrepo-com.svg";
import telegramLogoWhite from "Assets/telegram-fill-svgrepo-com-white.svg";

import { Project } from "../../types";
import Logo from "../Logo";
import DarkModeToggle from "./DarkModeToggle";
import ProjectsDialog from "./ProjectsDialog";


function Header(props: { onProjectChange: (arg0: null | Project) => void; home: () => void}) {
	const {projectDialogButton, projectDialog} = ProjectsDialog(props.onProjectChange);

	return (
		<>
			<header>
				<button onClick={props.home}>🏠</button>
				<DarkModeToggle />
				{projectDialogButton}
				<Logo
					href="https://t.me/ankokovin"
					title="Мой Telegram"
					darkModeImg={telegramLogoWhite}
					img={telegramLogo}
					alt="Telegram logo"
					imgClasses={["header-logo"]}
				/>
				<Logo
					href="mailto:rycarok@gmail.com"
					title="rycarok@gmail.com"
					darkModeImg={emailLogoWhite}
					img={emailLogo}
					alt="Email icon"
					imgClasses={["header-logo"]}
				/>
				
				{projectDialog}
			</header>
		</>
	);
}

export default Header; 