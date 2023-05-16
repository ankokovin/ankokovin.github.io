import { useEffect, useState } from "react";
import { applyPreferredColorScheme, getPreferredColorScheme, invert, savePreferredColorScheme } from "./DarkModeUtils";


export function DarkModeToggle() {
    function toggleColorScheme() {
        const newScheme = invert(mode)

        setMode(newScheme);
        savePreferredColorScheme(newScheme);
    }

    const [mode, setMode] = useState(getPreferredColorScheme());

    useEffect(() => {
        applyPreferredColorScheme(mode)
    }, [mode])

    return <div>
        <button onClick={toggleColorScheme}>{mode === 'dark' ? '🌞' : '🌚'}</button>
        </div>
}