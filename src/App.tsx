import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header, { Project } from './Header'
import { useCallback, useState } from 'react'



function App() {

  const [currentProject, setCurrentProject] = useState<null | Project>(null);

  const onProjectChange = useCallback((project: null | Project) => {
    console.log({project})

    if (project?.link) {
      window.open(project.link)
      return
    }

    setCurrentProject(project)
  },[]);

  return (
    <>
      <Header onProjectChange={onProjectChange} />
      <main>
        {currentProject != null ? (<iframe src={`/${currentProject.id}`}></iframe>) :
        (<>
        <h1>Коковин Алексей</h1>
        <section>
          <p>Здесь наверное будет обо мне?</p>
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
