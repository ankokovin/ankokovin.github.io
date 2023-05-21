import DarkModeContext from "Context/DarkModeContext";
import { useContext, useEffect } from "react";

import { applyPreferredColorScheme, invertScheme, savePreferredColorScheme } from "../../utils";


export default function DarkModeToggle() {

	const darkModeContext = useContext(DarkModeContext);

	function toggleColorScheme() {
		const newScheme = invertScheme(darkModeContext.currentScheme);

		darkModeContext.setCurrentScheme?.(newScheme);
		savePreferredColorScheme(newScheme);
	}

	useEffect(() => {
		applyPreferredColorScheme(darkModeContext.currentScheme);
	}, [darkModeContext.currentScheme]);

	return <button onClick={toggleColorScheme}>{darkModeContext.isDarkMode ? "🌞" : "🌚"}</button>;

}