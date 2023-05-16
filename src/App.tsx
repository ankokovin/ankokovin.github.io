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

function App() {

  const [currentProject, setCurrentProject] = useState<null | Project>(null);

  const onProjectChange = useCallback((project: null | Project) => {
    console.log({ project })

    if (project?.link) {
      window.open(project.link)
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
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/1"/><label>Дополнить шапку ссылками</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/2"/><label>Описания проектов</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/3"/><label>Ранжирование проектов</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/4"/><label>Распределение проектов по времени</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/5"/><label>favicon</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/6"/><label>Стиль для Dark mode toggle</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/7"/><label>Попробывать пофиксить iframe</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/8"/><label>English</label>
                  <img alt="GitHub issue/pull request detail" src="https://img.shields.io/github/issues/detail/state/ankokovin/ankokovin.github.io/9"/><label>Секция о себе</label>
                  <input type="checkbox" disabled readOnly id="more-interesting-projects" /><label htmlFor="more-interesting-projects">Более интересные проекты</label>
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
        Powered by
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
