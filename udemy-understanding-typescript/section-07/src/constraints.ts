function merge2<T extends object, U extends object>(oA: T, oB: U) {
    return Object.assign(oA, oB);
}
// let merged2 = merge2({ name: 'phil', hobbies: ['triathlons'] }, 52);
let merged2 = merge2({ name: 'phil', hobbies: ['triathlons'] }, { age: 52 });
console.log(merged2);
