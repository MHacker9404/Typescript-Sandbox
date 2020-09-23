import { autobind } from '../decorators/autobind';
import { Draggable } from '../models/drap-drop-interfaces';
import { Project } from '../models/project-model';
import { Component } from './component';

// namespace App {
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    protected _configure(): void {
        this._element.addEventListener('dragstart', this.dragStartHandler);
        this._element.addEventListener('dragend', this.dragEndHandler);
    }
    protected _renderContent(): void {
        const html = `<h2>${this._project.title}</h2><h3>${this.people}</h3><p>${this._project.description}</p>`;
        this._element.innerHTML = html;
    }

    get people(): string {
        return this._project.people > 1
            ? `${this._project.people} people assigned`
            : `${this._project.people} person assigned`;
    }
    constructor(_hostId: string, private _project: Project) {
        super('single-project', _hostId, false, _project.id);

        this._configure();
        this._renderContent();
    }
    @autobind dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this._project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    @autobind dragEndHandler(_: DragEvent): void {
        console.log('DragEnd');
    }
}
// }
