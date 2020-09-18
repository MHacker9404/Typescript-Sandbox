console.log('Time to get started...');

const add = (n1: number, n2: number): number => n1 + n2;
const printOut = (output: string | number) => console.log(output);
printOut(add(5, 3));

const hobbies = ['sports', 'cooking'];
const hobbies2: string[] = ['hiking', ...hobbies];
console.log(hobbies2);

const person = {
    name: 'max',
    age: 53,
};
const copy = { ...person };
console.log(copy);

const addRest = (...pNums: number[]): number =>
    pNums.reduce((result, value) => result + value, 0);
console.log(addRest(1, 3, 5, 7));
