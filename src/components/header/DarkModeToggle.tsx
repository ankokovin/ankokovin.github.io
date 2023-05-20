import { useContext, useEffect } from "react";
import DarkModeContext from "Context/DarkModeContext";
import { applyPreferredColorScheme, invert, savePreferredColorScheme } from "../../DarkModeUtils";


export default function DarkModeToggle() {

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