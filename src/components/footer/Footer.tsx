import "./Footer.css";

import reactLogo from "Assets/react.svg";
import typescriptLogo from "Assets/ts-logo-128.svg";
import viteLogo from "Assets/vite.svg";

export default function Footer() {
	return <footer>
		<p>Powered by</p>
		<a href="https://vitejs.dev" target="_blank">
			<img src={viteLogo} className="logo" alt="Vite logo" />
		</a>
		<a href="https://react.dev" target="_blank">
			<img src={reactLogo} className="logo react" alt="React logo" />
		</a>
		<a href="https://www.typescriptlang.org/" target="_blank">
			<img src={typescriptLogo} className="logo" alt="Typescript logo" />
		</a>
	</footer>;
}