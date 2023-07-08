import "./Main.css";

import myPortrait from "Assets/self-portrait.svg";

import myLogoRaw from "/icon.svg?raw";

import GitHubIssueBadge from "./GitHubIssueBadge";

export default function Main() {
	return <main>
		<h1>Коковин Алексей</h1>
		{
			//Very hack, much wow!
		}
		<div className="my-logo" dangerouslySetInnerHTML={{__html: myLogoRaw}}></div>
		<img className="my-portrait" src={myPortrait}/>
		<section aria-labelledby="todos-heading">
			<details>
				<summary id="todos-heading" >Список TODO прямо по серерине, чтобы я не забыл</summary>
				<ul className='todos'>
					<li>
						<input type="checkbox" checked readOnly id="minimum" />
						<label htmlFor="minimum">Минимум</label>
					</li>
					<li>
						<input type="checkbox" checked readOnly id="add-dark-mode-toggle" />
						<label htmlFor="add-dark-mode-toggle">Dark mode toggle</label>
					</li>
					<li>
						<GitHubIssueBadge id={1} />
						<label>Дополнить шапку ссылками</label>
					</li>
					<li>
						<GitHubIssueBadge id={2} />
						<label>Описания проектов</label>
					</li>
					<li>
						<GitHubIssueBadge id={3} />
						<label>Ранжирование проектов</label>
					</li>
					<li>
						<GitHubIssueBadge id={4} />
						<label>Распределение проектов по времени</label>
					</li>
					<li>
						<GitHubIssueBadge id={5} />
						<label>favicon</label>
					</li>
					<li>
						<GitHubIssueBadge id={6} />
						<label>Стиль для Dark mode toggle</label>
					</li>
					<li>
						<GitHubIssueBadge id={7} />
						<label>Попробывать пофиксить iframe</label>
					</li>
					<li>
						<GitHubIssueBadge id={8} />
						<label>English</label>
					</li>
					<li>
						<GitHubIssueBadge id={9} />
						<label>Секция о себе</label>
					</li>
					<li>
						<input type="checkbox" disabled readOnly id="more-interesting-projects" />
						<label htmlFor="more-interesting-projects">Более интересные проекты</label>
					</li>
					<li>
						<GitHubIssueBadge id={10} /><label>Блог</label>
					</li>
				</ul>
			</details>
		</section>
		<section aria-labelledby="about-me-heading">
			<h2 id="about-me-heading">Обо мне</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem fuga ab obcaecati quas laudantium laboriosam facilis neque laborum unde veniam! Cupiditate nesciunt non mollitia aliquid in distinctio error sequi nam!</p>
		</section>
	</main>;
}