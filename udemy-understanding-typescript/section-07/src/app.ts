const names: Array<string> = [];
let uname = names[0];

const promise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});

promise.then((data) => data.split(' '));
