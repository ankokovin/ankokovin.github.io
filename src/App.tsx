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
                  <input type="checkbox" checked  /><span>Минимум</span>
                  <input type="checkbox" disabled /><span>Дополнить шапку ссылками</span>
                  <input type="checkbox" disabled /><span>Описания проектов</span>
                  <input type="checkbox" disabled /><span>Ранжирование проектов</span>
                  <input type="checkbox" disabled /><span>favicon</span>
                  <input type="checkbox" disabled /><span>Dark mode toggle</span>
                  <input type="checkbox" disabled /><span>Попробовать пофиксить вёрстку</span>
                  <input type="checkbox" disabled /><span>Попробывать пофиксить iframe</span>
                  <input type="checkbox" disabled /><span>English</span>
                  <input type="checkbox" disabled /><span>Написать о себе</span>
                  <input type="checkbox" disabled /><span>Более интересные проекты</span>
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
