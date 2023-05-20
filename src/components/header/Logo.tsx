import { useContext } from "react";
import DarkModeContext from "../../context/DarkModeContext";

export default function Logo(props: {
    href: string;
    title: string;
    darkModeImg: string;
    lightModeImg: string;
    alt: string;
}) {
    const darkModeContext = useContext(DarkModeContext);

    return <a href={props.href} title={props.title} target="_blank">
        <img src={darkModeContext.isDarkMode ? props.darkModeImg : props.lightModeImg} alt={props.alt} className="header-logo" />
    </a>
}