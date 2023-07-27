import "./Blog.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Post, PostIndex } from "Types";

import PostComponent from "./PostComponent";

export default function BlogMain() {
	const postsInfo = useLoaderData() as PostIndex;

	const [posts, setPosts] = useState([] as Post[]);

	const fetchData = useCallback(async () => {
		if (posts.length >= postsInfo.length) {
			return;
		}
		const nextPostId = posts.length;
		const blogToLoad = postsInfo[nextPostId];

		const resp = await fetch(`/posts/${blogToLoad.file}`);
		const data = await resp.text();

		setPosts(prevPosts => [...prevPosts, {
			...blogToLoad,
			html: data
		}]);

	},[posts, postsInfo]);

	const observerTarget = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				// eslint-disable-next-line no-magic-numbers
				if (entries[0].isIntersecting) {
					fetchData();
				}
			},
			{ threshold: 1 }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		const observerToUnobserve = observerTarget.current;  

		return () => {
			if (observerToUnobserve) {
				observer.unobserve(observerToUnobserve);
			}
		};
	}, [observerTarget, fetchData]);


	return <main className="blog">
		{posts.map(post =>
			<div key={post.file} className="post">
				<PostComponent post={post}/>
				<hr />
			</div>
		)}
		<div ref={observerTarget}></div>
	</main>;
}
