// namespace App {
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected readonly _templateElement: HTMLTemplateElement;
    protected readonly _hostElement: T;
    protected readonly _element: U;

    protected constructor(
        private _templateId: string,
        private _hostElementId: string,
        private _insertAtStart: boolean,
        private _newElementId?: string
    ) {
        this._templateElement = document.getElementById(this._templateId) as HTMLTemplateElement;
        this._hostElement = document.getElementById(this._hostElementId) as T;

        const importedNode = document.importNode(this._templateElement.content, true);
        this._element = importedNode.firstElementChild as U;
        if (this._newElementId) {
            this._element.id = this._newElementId;
        }

        this._attach();
    }

    private _attach() {
        this._hostElement.insertAdjacentElement(this._insertAtStart ? 'afterbegin' : 'beforeend', this._element);
    }

    protected abstract _configure(): void;
    protected abstract _renderContent(): void;
}
// }
