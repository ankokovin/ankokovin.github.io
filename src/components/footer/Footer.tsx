import "./Footer.css";

import githubLogo from "Assets/github-mark.svg";
import githubLogoWhite from "Assets/github-mark-white.svg";
import reactLogo from "Assets/react.svg";
import typescriptLogo from "Assets/ts-logo-128.svg";
import viteLogo from "Assets/vite.svg";
import Logo from "Components/Logo";

export default function Footer() {
	return <footer>
		<section aria-label="Powered by" className="powered-by">
			<p>Powered by</p>
			<Logo
				href="https://github.com/ankokovin/ankokovin.github.io"
				title="Код этой страницы"
				darkModeImg={githubLogoWhite}
				img={githubLogo}
				alt="GitHub Invercat logo"
				imgClasses={["logo"]}
			/>	
			<Logo
				href="https://vitejs.dev"
				img={viteLogo}
				alt="Vite logo"
				imgClasses={["logo"]}
			/>
			<Logo
				href="https://react.dev"
				img={reactLogo}
				alt="React logo"
				imgClasses={["logo", "react"]}
			/>
			<Logo
				href="https://www.typescriptlang.org/"
				img={typescriptLogo}
				alt="Typescript logo"
				imgClasses={["logo"]}
			/>
		</section>
	</footer>;
}