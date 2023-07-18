import "./Header.css";

import emailLogo from "Assets/email-address-svgrepo-com.svg";
import emailLogoWhite from "Assets/email-address-svgrepo-com-white.svg";
import telegramLogo from "Assets/telegram-fill-svgrepo-com.svg";
import telegramLogoWhite from "Assets/telegram-fill-svgrepo-com-white.svg";

import Logo from "../Logo";
import DarkModeToggle from "./DarkModeToggle";


function Header(props: { home: () => void, projectDialogButton: JSX.Element}) {

	return (
		<>
			<header>
				<a className="text-button" onClick={props.home}>Home</a>
				{props.projectDialogButton}
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
				<DarkModeToggle />
			</header>
		</>
	);
}

export default Header; 