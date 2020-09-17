function add(n1: number, n2: number): number {
    return n1 + n2;
}

function addAndHandle(n1: number, n2: number, cb: (n3: number) => void): void {
    cb(n1 + n2);
}

function printReult(n: number): void {
    console.log(`Result 2: ${n}`);
}

addAndHandle(2, 3, (n) => console.log(`Result 1: ${n}`));

addAndHandle(2, 3, printReult);
