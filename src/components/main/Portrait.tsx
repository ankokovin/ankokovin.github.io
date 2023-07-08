import "./Portrait.css";

import myPortrait from "Assets/self-portrait.svg";

import myLogoRaw from "/icon.svg?raw";

export default function Portait() {
	return <div className="portrait">
		<div className="portrait-logo" dangerouslySetInnerHTML={{__html: myLogoRaw}}></div>
		<img className="portrait-image" src={myPortrait}/>
	</div>;
}