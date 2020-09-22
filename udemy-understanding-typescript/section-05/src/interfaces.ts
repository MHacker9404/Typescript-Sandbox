interface Person {
    name: string;
    age: number;
    greet(phrase: string): string;
}

let person: Person;
person = {
    name: 'phil',
    age: 52,
    // greet(phrase: string): string {
    //     return `${phrase}, ${name}`;
    // },
    greet: (phrase: string) => `${phrase}, ${name}`,
};
