import { ProjectStatus, Project } from '../models/project-model.js';

// namespace App {
type Listener<T> = (projects: T[]) => void;

class State<T> {
    protected _items: T[] = [];
    protected _listeners: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>) {
        this._listeners.push(listenerFn);
    }
}
//  project state management
export class ProjectState extends State<Project> {
    private static _instance: ProjectState;

    private constructor() {
        super();
    }

    static get Instance() {
        return ProjectState._instance || (this._instance = new ProjectState());
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);

        this._items.push(newProject);

        this.updateListeners();
    }

    moveProject(id: string, newStatus: ProjectStatus) {
        const project = this._items.find((p) => p.id === id);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
        }

        this.updateListeners();
    }

    private updateListeners() {
        this._listeners.map((fn) => fn(this._items.slice()));
    }
}
// }
