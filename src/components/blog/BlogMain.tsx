import blog from "Data/posts/LighthouseBestPracticeServesImageWithLowResolution.html?raw";

export default function BlogMain() {
	return <main className="blog">
		<article dangerouslySetInnerHTML={{__html: blog}} lang="ru"/>
	</main>;
}