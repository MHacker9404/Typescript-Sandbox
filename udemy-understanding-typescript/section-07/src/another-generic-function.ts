interface Lengthy {
    length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'got no value';
    if (element.length > 0) {
        description = `Got ${element.length} elements`;
    }
    return [element, description];
}

console.log(countAndDescribe('hi there'));
