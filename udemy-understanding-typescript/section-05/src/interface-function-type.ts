type AddFun = (a: number, b: number) => number;
let addFun: AddFun;
addFun = (n1: number, n2: number) => {
    return n1 + n2;
};

//  custom function type
interface AddFn {
    (a: number, b: number): number;
}
let addFn: AddFn;
addFn = (n1: number, n2: number) => n1 + n2;
