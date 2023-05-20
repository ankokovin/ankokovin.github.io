import './App.css'
import Header from './components/header'
import { useCallback, useState } from 'react'
import DarkModeContext from './context/DarkModeContext'
import { Project, Scheme } from './types'
import Main from './components/main'
import Footer from './components/footer'
import { getPreferredColorScheme } from './DarkModeUtils'


export default function App() {

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

  const [currentScheme, setCurrentScheme] = useState<Scheme>(getPreferredColorScheme())


  const darkModeContextValue = {
    isDarkMode: currentScheme === 'dark',
    currentScheme,
    setCurrentScheme
  }

  return (
    <DarkModeContext.Provider value={darkModeContextValue} >
      <Header onProjectChange={onProjectChange} />
      <Main currentProject={currentProject}/>
      <Footer />
    </DarkModeContext.Provider>
  )
}