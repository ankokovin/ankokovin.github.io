import { useContext, useEffect } from "react";
import { applyPreferredColorScheme, invert, savePreferredColorScheme } from "./DarkModeUtils";
import DarkModeContext from "./DarkModeContext";


export function DarkModeToggle() {

    const darkModeContext = useContext(DarkModeContext);

    function toggleColorScheme() {
        const newScheme = invert(darkModeContext.currentScheme)

        darkModeContext.setCurrentScheme?.(newScheme);
        savePreferredColorScheme(newScheme);
    }

    useEffect(() => {
        applyPreferredColorScheme(darkModeContext.currentScheme);
    }, [darkModeContext.currentScheme])

    return <div>
        <button onClick={toggleColorScheme}>{darkModeContext.isDarkMode ? '🌞' : '🌚'}</button>
    </div>
}