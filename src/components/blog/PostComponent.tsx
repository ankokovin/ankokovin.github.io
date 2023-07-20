import { Post } from "Types";

export type PostComponentProps = {
    post: Post
}

export default function PostComponent({post} : PostComponentProps) {
	const onShare = async () => {
		//TODO a cleaner way to get this link? Will break if no longer hash routed.
		const url = `/#/blog/${post.file.replace(".html","")}`;

		//https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
		//TODO: add title and maybe text?
		const shareData = {
			url
		} as ShareData;
		if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
			navigator.share(shareData);
			return;
		}

		navigator.clipboard.writeText(new URL(url, window.location.origin).toString());
		//TODO: nicer way to give such feedback? It works, but might be a bit ugly
		alert("Copied link to clipboard!");
	};
    
	return <>
		<div className="post-info">
			<div>
        Author: {post.author}
			</div>
			<div>
        Created: {new Date(post.created).toLocaleDateString()}
			</div>
			{post.created != post.lastUpdated && (<div>Updated: {new Date(post.lastUpdated).toLocaleDateString()}</div>)}
			<button onClick={onShare}>Share</button>
		</div>
		<article dangerouslySetInnerHTML={{ __html: post.html }} lang="ru" />
	</>;
}