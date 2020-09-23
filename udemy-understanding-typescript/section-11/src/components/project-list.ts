import { autobind } from '../decorators/autobind';
import { DropTarget } from '../models/drap-drop-interfaces';
import { Project, ProjectStatus } from '../models/project-model';
import { ProjectState } from '../state/project-state';
import { Component } from './component';
import { ProjectItem } from './project-item';

// namespace App {
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DropTarget {
    private _assignedProjects: Project[] = [];

    constructor(private _type: 'active' | 'finished') {
        super('project-list', 'app', false, `${_type}-projects`);

        this._configure();
        this._renderContent();
    }
    @autobind dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault(); //  need this to allow drop to happen

            const list = this._element.querySelector('ul')!;
            list.classList.add('droppable');
        }
    }

    @autobind dropHandler(event: DragEvent): void {
        event.preventDefault(); //  firefox issue
        const pid = event.dataTransfer!.getData('text/plain');
        ProjectState.Instance.moveProject(pid, this._type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autobind dragLeaveHandler(_: DragEvent): void {
        const list = this._element.querySelector('ul')!;
        list.classList.remove('droppable');
    }

    protected _renderContent() {
        const listId = `${this._type}-projects-list`;
        this._element.querySelector('ul')!.id = listId;

        this._element.querySelector('h2')!.textContent = `${this._type.toUpperCase()} PROJECTS`;
    }

    private _renderProjects() {
        const ul = document.getElementById(`${this._type}-projects-list`) as HTMLUListElement;
        ul.innerHTML = '';
        this._assignedProjects.map((project: Project) => {
            new ProjectItem(ul.id, project);
        });
    }

    protected _configure() {
        this._element.addEventListener('dragover', this.dragOverHandler);
        this._element.addEventListener('drop', this.dropHandler);
        this._element.addEventListener('dragleave', this.dragLeaveHandler);

        ProjectState.Instance.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) =>
                this._type === 'active' ? project.status === ProjectStatus.Active : project.status === ProjectStatus.Finished
            );
            this._assignedProjects = relevantProjects;
            this._renderProjects();
        });
    }
}
// }
