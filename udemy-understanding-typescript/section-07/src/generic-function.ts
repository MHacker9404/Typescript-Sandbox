function merge<T, U>(oA: T, oB: U) {
    return Object.assign(oA, oB);
}
let merged = merge({ name: 'phil' }, { age: 52 });
console.log(merged);
