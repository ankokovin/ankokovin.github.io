import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header, { Project } from './Header'
import { useCallback, useState } from 'react'

function DisplayProject(project: Project) {
  return <div className='display-project'>
    <h1>{project['ru-name']}</h1>
    <iframe src={`https://ankokovin.github.io/${project.id}`}></iframe>
  </div>
}

function GithubIssueBadge({ id }: { id: number }) {
  return <img alt="GitHub issue/pull request detail" src={`https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/${id}.svg`} />
}


function App() {

  const [currentProject, setCurrentProject] = useState<null | Project>(null);

  const onProjectChange = useCallback((project: null | Project) => {
    if (!project) {
      setCurrentProject(project);
      return;
    }

    const shouldOpenInNewTab = project.tags.includes('colab')
      || (window.screen.width < 600 && project.tags.includes('no-mobile'));


    if (shouldOpenInNewTab) {
      window.open(project.link ?? `https://ankokovin.github.io/${project.id}`);
      return
    }

    setCurrentProject(project)
  }, []);

  return (
    <>
      <Header onProjectChange={onProjectChange} />
      <main>
        {currentProject != null ? DisplayProject(currentProject) :
          (<>
            <h1>Коковин Алексей</h1>
            <section>
              <details>
                <summary>
                  Список TODO прямо по серерине, чтобы я не забыл
                </summary>
                <section className='todos'>
                  <input type="checkbox" checked readOnly id="minimum" />                <label htmlFor="minimum">Минимум</label>
                  <input type="checkbox" checked readOnly id="add-dark-mode-toggle" />   <label htmlFor="add-dark-mode-toggle">Dark mode toggle</label>
                  <GithubIssueBadge id={1} /><label>Дополнить шапку ссылками</label>
                  <GithubIssueBadge id={2} /><label>Описания проектов</label>
                  <GithubIssueBadge id={3} /><label>Ранжирование проектов</label>
                  <GithubIssueBadge id={4} /><label>Распределение проектов по времени</label>
                  <GithubIssueBadge id={5} /><label>favicon</label>
                  <GithubIssueBadge id={6} /><label>Стиль для Dark mode toggle</label>
                  <GithubIssueBadge id={7} /><label>Попробывать пофиксить iframe</label>
                  <GithubIssueBadge id={8} /><label>English</label>
                  <GithubIssueBadge id={9} /><label>Секция о себе</label>
                  <input type="checkbox" disabled readOnly id="more-interesting-projects" /><label htmlFor="more-interesting-projects">Более интересные проекты</label>
                  <GithubIssueBadge id={10} /><label>Блог</label>
                </section>
              </details>
            </section>
            <section>
              <h2>Обо мне</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem fuga ab obcaecati quas laudantium laboriosam facilis neque laborum unde veniam! Cupiditate nesciunt non mollitia aliquid in distinctio error sequi nam!</p>
            </section>
          </>
          )}
      </main>
      <footer>
        <p>Powered by</p>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </footer>
    </>
  )
}

export default App
