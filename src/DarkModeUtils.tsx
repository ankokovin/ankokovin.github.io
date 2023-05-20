export type Scheme = "dark" | "light";


function isDarkMode(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function invert(scheme: Scheme): Scheme {
    if (scheme === "dark") {
        return "light";
    }
    return "dark";
}

// https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting
// Return the system level color scheme, but if something's in local storage, return that
// Unless the system scheme matches the the stored scheme, in which case... remove from local storage
export function getPreferredColorScheme() {
    let systemScheme: Scheme = 'light';
    if (isDarkMode()) {
        systemScheme = 'dark';
    }
    let chosenScheme = systemScheme;


    const savedScheme = localStorage.getItem("scheme");
    if (savedScheme && ["dark", "light"].includes(savedScheme)) {
        chosenScheme = savedScheme as Scheme;
    }

    if (systemScheme === chosenScheme) {
        localStorage.removeItem("scheme");
    }

    return chosenScheme;
}

// Write chosen color scheme to local storage
// Unless the system scheme matches the the stored scheme, in which case... remove from local storage
export function savePreferredColorScheme(scheme: Scheme) {
    let systemScheme = 'light';

    if (isDarkMode()) {
        systemScheme = 'dark';
    }

    if (systemScheme === scheme) {
        localStorage.removeItem("scheme");
    }
    else {
        localStorage.setItem("scheme", scheme);
    }

}

// Apply the chosen color scheme by traversing stylesheet rules, and applying a medium.
export function applyPreferredColorScheme(scheme: Scheme) {
    for (let s = 0; s < document.styleSheets.length; s++) {
        for (let i = 0; i < document.styleSheets[s].cssRules.length; i++) {
            const rule = document.styleSheets[s].cssRules[i] as CSSMediaRule;

            if (rule && rule.media && rule.media.mediaText.includes("prefers-color-scheme")) {

                switch (scheme) {
                    case "dark":
                        rule.media.appendMedium("original-prefers-color-scheme");
                        if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
                        if (rule.media.mediaText.includes("dark")) rule.media.deleteMedium("(prefers-color-scheme: dark)");
                        break;
                    case "light":
                        rule.media.appendMedium("(prefers-color-scheme: light)");
                        rule.media.appendMedium("(prefers-color-scheme: dark)");
                        if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
                        break;
                    default:
                        rule.media.appendMedium("(prefers-color-scheme: dark)");
                        if (rule.media.mediaText.includes("light")) rule.media.deleteMedium("(prefers-color-scheme: light)");
                        if (rule.media.mediaText.includes("original")) rule.media.deleteMedium("original-prefers-color-scheme");
                        break;
                }
            }
        }
    }
}