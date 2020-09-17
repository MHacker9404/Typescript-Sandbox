let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'hello';
userInput = { name: 'phil' };

if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, code: number): never {
    throw { message: message, code: code };
}

const result = generateError('error occured', 500);
console.log(result);
