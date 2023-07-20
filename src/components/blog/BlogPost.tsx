import { useLoaderData } from "react-router-dom";
import { Post } from "Types";

import PostComponent from "./PostComponent";


export default function BlogPost() {
	const post = useLoaderData() as Post;

	return <main className="post">
		<PostComponent post={post}/>
	</main>;
}