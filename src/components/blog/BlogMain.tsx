import "./Blog.css";

import {PostInfo} from "Plugin/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

export interface Post extends PostInfo {
	html: string
}

export default function BlogMain() {
	const postsInfo = useLoaderData() as PostInfo[];

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
		{posts.map(post => <div key={post.file} className="post">
			<div className="post-info">
				<div>
					Author: {post.author}
				</div>
				<div>
					Created: {new Date(post.created).toLocaleDateString()}
				</div>
				{post.created != post.lastUpdated && (<div>Updated: {new Date(post.lastUpdated).toLocaleDateString()}</div>)}
			</div>
			<article dangerouslySetInnerHTML={{ __html: post.html }} lang="ru" />
		</div>)}
		<div ref={observerTarget}></div>
	</main>;
}
