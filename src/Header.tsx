import { DarkModeToggle } from './DarkModeToggle'
import { isDarkMode } from './DarkModeUtils'
import './Header.css'

import colab from './assets/Google_Colaboratory_SVG_Logo.svg'
import warning from './assets/warning-circle-svgrepo-com.svg'

import { projects } from './projects.json'
import { useRef } from 'react'

export type Project = typeof projects[number]


function Tag(props: { tag: string }) {
    if (props.tag === 'colab') {
        return <img className='tag-logo' src={colab} alt="Google Colab logo" title='Google Colab' />;
    }
    if (props.tag === 'flash-warning' && isDarkMode()) {
        return <img className='tag-logo' src={warning} alt="Warning sign" title='Осторожно, без тёмной темы' />;
    }
    if (props.tag === 'no-mobile') {
        return <span className='tag-strikethrough' title='Не расчитан на мобильный'>📱</span>;
    }
    return null;
}

function Project(project: Project, close: (project?: false | Project) => void) {
    return (<button
        className='project-button'
        key={project.id}
        onClick={() => {
            close(project)
        }}>{project['ru-name']}
        {project.tags.map((tag, index) => <Tag tag={tag} key={index} />)}
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
            <a href="/">🏠</a>
            <DarkModeToggle />
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