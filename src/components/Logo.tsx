import DarkModeContext from "Context/DarkModeContext";
import { useContext } from "react";

export default function Logo(props: {
    href: string;
    title?: string;
    img: string;
    darkModeImg?: string;
    alt: string;
    imgClasses: string[];
}) {
	const darkModeContext = useContext(DarkModeContext);

	return <a href={props.href} title={props.title} target="_blank">
		<img src={darkModeContext.isDarkMode && props.darkModeImg ? props.darkModeImg : props.img} alt={props.alt} className={props.imgClasses.join(" ")} />
	</a>;
}