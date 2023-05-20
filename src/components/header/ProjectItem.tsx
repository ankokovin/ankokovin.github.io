import Tag from "./Tag"

import { Project } from '../../types'

export default function ProjectItem(props: { project: Project, close: (project?: false | Project) => void }) {
    return (<button
        className='project-button'
        key={props.project.id}
        onClick={() => {
            props.close(props.project)
        }}>{props.project['ru-name']}
        {props.project.tags.map((tag, index) => <Tag tag={tag} key={index} />)}
    </button>)
}