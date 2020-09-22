function Logger(logString: string) {
    console.log('Logger factory');
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template factory');
    return function (_: Function) {
        console.log('templating');
        const el = document.getElementById(hookId);
        if (el) {
            el.innerHTML = template;
        }
    };
}

@Logger('Logging - Person')
@WithTemplate('<h1>My Person object</h1>', 'app')
class Person {
    constructor(public name: string) {
        console.log('creating person.....');
    }
}

const person = new Person('phil');
console.log(person);
