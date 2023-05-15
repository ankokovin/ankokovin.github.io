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
                  Страничка очень WIP
                </summary>
                <section className='todos'>
                  <input type="checkbox" checked  id="minimum"/>                <label htmlFor="minimum">Минимум</label>
                  <input type="checkbox" disabled id="add-links"/>              <label htmlFor="add-links">Дополнить шапку ссылками</label>
                  <input type="checkbox" disabled id="add-project-annotations"/><label htmlFor="add-project-annotations">Описания проектов</label>
                  <input type="checkbox" disabled id="add-project-ranking"/>    <label htmlFor="add-project-ranking">Ранжирование проектов</label>
                  <input type="checkbox" disabled id="add-custom-favicon"/>     <label htmlFor="add-custom-favicon">favicon</label>
                  <input type="checkbox" disabled id="add-dark-mode-toggle"/>   <label htmlFor="add-dark-mode-toggle">Dark mode toggle</label>
                  <input type="checkbox" disabled id="fix-layput"/>             <label htmlFor="fix-layput">Попробовать пофиксить вёрстку</label>
                  <input type="checkbox" disabled id="fix-iframes"/>            <label htmlFor="fix-iframes">Попробывать пофиксить iframe</label>
                  <input type="checkbox" disabled id="add-english"/>            <label htmlFor="add-english">English</label>
                  <input type="checkbox" disabled id="add-about"/>              <label htmlFor="add-about">Написать о себе</label>
                  <input type="checkbox" disabled id="better-projects"/>        <label htmlFor="better-projects">Более интересные проекты</label>
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
