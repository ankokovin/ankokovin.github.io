export default function GitHubIssueBadge({ id }: { id: number }) {
	return <img
		alt="GitHub issue/pull request detail"
		src={`https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/${id}.svg`} />;
}