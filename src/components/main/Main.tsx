import "./Main.css";

import GitHubIssueBadge from "./GitHubIssueBadge";

export default function Main() {
	return <main>
		<h1>Коковин Алексей</h1>
		<section>
			<details>
				<summary>Список TODO прямо по серерине, чтобы я не забыл</summary>
				<section className='todos'>
					<input type="checkbox" checked readOnly id="minimum" />                <label htmlFor="minimum">Минимум</label>
					<input type="checkbox" checked readOnly id="add-dark-mode-toggle" />   <label htmlFor="add-dark-mode-toggle">Dark mode toggle</label>
					<GitHubIssueBadge id={1} /><label>Дополнить шапку ссылками</label>
					<GitHubIssueBadge id={2} /><label>Описания проектов</label>
					<GitHubIssueBadge id={3} /><label>Ранжирование проектов</label>
					<GitHubIssueBadge id={4} /><label>Распределение проектов по времени</label>
					<GitHubIssueBadge id={5} /><label>favicon</label>
					<GitHubIssueBadge id={6} /><label>Стиль для Dark mode toggle</label>
					<GitHubIssueBadge id={7} /><label>Попробывать пофиксить iframe</label>
					<GitHubIssueBadge id={8} /><label>English</label>
					<GitHubIssueBadge id={9} /><label>Секция о себе</label>
					<input type="checkbox" disabled readOnly id="more-interesting-projects" /><label htmlFor="more-interesting-projects">Более интересные проекты</label>
					<GitHubIssueBadge id={10} /><label>Блог</label>
				</section>
			</details>
		</section>
		<section>
			<h2>Обо мне</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem fuga ab obcaecati quas laudantium laboriosam facilis neque laborum unde veniam! Cupiditate nesciunt non mollitia aliquid in distinctio error sequi nam!</p>
		</section>
	</main>;
}