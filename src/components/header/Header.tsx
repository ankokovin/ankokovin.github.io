import DarkModeToggle from './DarkModeToggle'
import './Header.css'
import githubLogo from 'Assets/github-mark.svg';
import githubLogoWhite from 'Assets/github-mark-white.svg';
import emailLogo from 'Assets/email-address-svgrepo-com.svg';
import emailLogoWhite from 'Assets/email-address-svgrepo-com-white.svg';
import telegramLogoWhite from 'Assets/telegram-fill-svgrepo-com-white.svg';
import telegramLogo from 'Assets/telegram-fill-svgrepo-com.svg';


import { useRef } from 'react'
import Logo from './Logo';
import ProjectItem from './ProjectItem';

import { projects } from 'Data/projects.json'
import { Project } from '../../types';


function Header(props: { onProjectChange: (arg0: null | Project) => void; }) {
    const projectDialogRef = useRef<null | HTMLDialogElement>(null);
    const projectDialogContentWrapperRef = useRef<null | HTMLDivElement>(null);

    const handleClick = (e: MouseEvent) => {
        if (!projectDialogContentWrapperRef?.current?.contains(e.target as Node | null)) {
            close();
        }
    };

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

    const renderProjectsByTag = (tag: string) => {
        const filteredProjects = projects
            .filter(project => project.tags.includes(tag))
            .map((project, idx) =>
                <ProjectItem key={idx} project={project} close={close} />
            );
        return filteredProjects.length ? filteredProjects : (<p>Таких <del>пока</del> нет &#128550;</p>);
    }

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
                            {renderProjectsByTag('interesting')}
                        </section>
                        <h3>Учебные</h3>
                        <section className='project-container'>
                            {renderProjectsByTag('study')}
                        </section>
                    </div>
                </dialog>
            </div>

            <Logo
                href="https://github.com/ankokovin/ankokovin.github.io"
                title="Код этой страницы"
                darkModeImg={githubLogoWhite}
                lightModeImg={githubLogo}
                alt="GitHub Invercat logo"
            />
            <Logo
                href="mailto:rycarok@gmail.com"
                title="rycarok@gmail.com"
                darkModeImg={emailLogoWhite}
                lightModeImg={emailLogo}
                alt="Email icon"
            />
            <Logo
                href="https://t.me/ankokovin"
                title="Мой Telegram"
                darkModeImg={telegramLogoWhite}
                lightModeImg={telegramLogo}
                alt="Telegram logo"
            />
        </header>)
}

export default Header 