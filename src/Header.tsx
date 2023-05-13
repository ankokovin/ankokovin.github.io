import './Header.css'

import colab from './assets/Google_Colaboratory_SVG_Logo.svg'
import warning from './assets/warning-circle-svgrepo-com.svg'

import { projects } from './projects.json'
import { useRef } from 'react'

export type Project = typeof projects[number]

function isDarkMode(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function Project(project: Project, close: (project?: false | Project) => void) {
    return (<button
        key={project.id}
        onClick={() => {
            close(project)
        }}>{project['ru-name']}
        {project.tags.includes('colab') && <img className='tag-logo' src={colab} alt="Google Colab logo" title='Google Colab'/> }
        {isDarkMode() && project.tags.includes('flash-warning') && <img className='tag-logo' src={warning} alt="Warning sign" title='Осторожно, без тёмной темы'/>}
        </button>)
}

function Header(props: { onProjectChange: (arg0: null | Project) => void; }) {
    const projectDialogRef = useRef<null | HTMLDialogElement>(null);
    const projectDialogContentWrapperRef = useRef<null | HTMLDivElement>(null);
  

    const open = () => {
        if (!projectDialogRef?.current) {
            return
        }
        projectDialogRef.current.showModal();
        projectDialogRef.current.addEventListener('click', handleClick);
    }

    const close = (project?: false | Project) => {
        if (!projectDialogRef?.current) {
            return
        }
        projectDialogRef.current.removeEventListener('click', handleClick);
        projectDialogRef.current.close();
        if (project === false) {
            props.onProjectChange(null)
        }
        if (project) {
            props.onProjectChange(project)
        }
    };

    const handleClick = (e: MouseEvent) => {
        if (!projectDialogContentWrapperRef?.current?.contains(e.target as Node | null)) {
            close();
        }
    };

    const interestingProjects = projects.filter(project => project.tags.includes('interesting')).map(project =>
        Project(project, close)
    );

    return (
        <header>
            <div>
                <button onClick={open}>Выбрать проект</button>
                <dialog ref={projectDialogRef}>
                    <div className='dialog-wrapper' ref={projectDialogContentWrapperRef}>
                        <h2>Проекты</h2>
                        <button onClick={() => close(false)}>Главная</button>
                        <h3>Интересные</h3>
                        <section className='project-container'>
                        {interestingProjects.length ? (interestingProjects) : <p>Таких <del>пока</del> нет &#128550;</p>}
                        </section>
                        <h3>Учебные</h3>
                        <section className='project-container'>
                            {projects.filter(project => project.tags.includes('study')).map(project =>
                                Project(project, close)
                            )}
                        </section>
                    </div>
                </dialog>
            </div>
            <a href="/legacy" target="_blank">Легаси версия</a>
        </header>)
}

export default Header 