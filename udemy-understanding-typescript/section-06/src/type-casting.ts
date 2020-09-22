const paragraph = document.querySelector('p');
const id = document.getElementById('message-output');
const input = <HTMLInputElement>document.getElementById('message-input');
const input2 = document.getElementById('message-input') as HTMLInputElement;
input.value = 'hi there';
input2.value = 'hi there';
