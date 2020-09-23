//  drag and drop interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DropTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

//  project
enum ProjectStatus {
    Active,
    Finished,
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

type Listener<T> = (projects: T[]) => void;

class State<T> {
    protected _items: T[] = [];
    protected _listeners: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>) {
        this._listeners.push(listenerFn);
    }
}
//  project state management
class ProjectState extends State<Project> {
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

//  validation logic
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(iv: Validatable) {
    let isValid = true;
    if (iv.required) {
        isValid &&= iv.value.toString().length !== 0;
    }
    if (typeof iv.value === 'string' && typeof iv.minLength !== 'undefined') {
        isValid &&= iv.value.length > iv.minLength;
    }
    if (typeof iv.value === 'string' && typeof iv.maxLength !== 'undefined') {
        isValid &&= iv.value.length <= iv.maxLength;
    }
    if (typeof iv.value === 'number' && typeof iv.min !== 'undefined') {
        isValid &&= iv.value >= iv.min;
    }
    if (typeof iv.value === 'number' && typeof iv.max !== 'undefined') {
        isValid &&= iv.value <= iv.max;
    }

    return isValid;
}

// import autobind from './autobind';
function autobind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
    constructor(private _hostId: string, private _project: Project) {
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DropTarget {
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

class App extends Component<HTMLDivElement, HTMLFormElement> {
    private readonly _titleInputElement: HTMLInputElement;
    private readonly _descriptionInputElement: HTMLInputElement;
    private readonly _peopleInputElement: HTMLInputElement;

    // private readonly _activeList: ProjectList;
    // private readonly _finishedList: ProjectList;

    constructor() {
        super('project-input', 'app', true, `user-input`);

        this._titleInputElement = this._element.querySelector('#title') as HTMLInputElement;
        this._descriptionInputElement = this._element.querySelector('#description') as HTMLInputElement;
        this._peopleInputElement = this._element.querySelector('#people') as HTMLInputElement;

        this._configure();
    }

    //  overrides
    private _gatherUserInput(): { title: string; description: string; people: number } | void {
        const title = this._titleInputElement.value;
        const description = this._descriptionInputElement.value;
        const people = +this._peopleInputElement.value;

        const titleValidate: Validatable = {
            value: title,
            required: true,
            maxLength: 100,
        };

        const descriptionValidate: Validatable = {
            value: description,
            required: true,
            maxLength: 100,
            minLength: 5,
        };

        const peopleValidate: Validatable = {
            value: people,
            required: true,
            min: 1,
            max: 5,
        };

        if (!(validate(titleValidate) && validate(descriptionValidate) && validate(peopleValidate))) {
            alert('Invalid input - please try again');
            return;
        }

        return { title, description, people };
    }

    private _clearInputs() {
        this._titleInputElement.value = '';
        this._descriptionInputElement.value = '';
        this._peopleInputElement.value = '';
    }

    @autobind
    private _submitHandler(event: Event) {
        event.preventDefault();

        //  validate the inputs
        const userInput = this._gatherUserInput();
        if (typeof userInput !== 'undefined') {
            const { title, description, people } = userInput;
            // console.log(userInput, title, description, people);

            ProjectState.Instance.addProject(title, description, people);

            this._clearInputs();
        }
    }

    protected _configure() {
        this._element.addEventListener('submit', this._submitHandler);
    }

    protected _renderContent() {}
}

const app = new App();

const activeList = new ProjectList('active');
const finishedList = new ProjectList('finished');
