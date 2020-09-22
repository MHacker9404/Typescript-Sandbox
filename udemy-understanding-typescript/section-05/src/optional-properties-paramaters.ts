interface IName {
    readonly name: string;
    outputName?: string;
}

class Person implements IName {
    constructor(public name: string, public outputName?: string) {}
}

const p = new Person('phil');
const p2 = new Person('phil', 'outputPhil');
console.log(p, p2);
