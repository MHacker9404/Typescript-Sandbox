import { autobind } from '../decorators/autobind.js';
import { ProjectState } from '../state/project-state.js';
import { Validatable, validate } from '../util/validation.js';
import { Component } from './component.js';

// namespace App {
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
// }
