import "./Blog.css";

import blog from "Data/posts/LighthouseBestPracticeServesImageWithLowResolution.html?raw";

export default function BlogMain() {
	return <main className="blog">
		{
			//TODO: add aria-label or aria-labelledby on article
		}
		<article dangerouslySetInnerHTML={{__html: blog}} lang="ru"/>
	</main>;
}