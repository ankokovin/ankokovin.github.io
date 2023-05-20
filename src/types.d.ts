import { projects } from 'Data/projects.json'

export type Project = typeof projects[number];

export type Scheme = "dark" | "light";