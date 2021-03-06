type NS = number | string;

function combine(
    n1: number | string,
    n2: NS,
    resultType: 'as-number' | 'as-text'
): NS {
    let result: number | string;
    if (typeof n1 === 'number' && typeof n2 === 'number') {
        result = n1 + n2;
    } else {
        result = n1.toString() + n2.toString();
    }
    if (resultType === 'as-number') {
        return +result;
    } else {
        return result.toString();
    }
}

const n1 = 5;
const n2 = 2.8;

const rn = combine(n1, n2, 'as-number');
const rs = combine(n1.toString(), n2.toString(), 'as-text');

console.log(rn, rs);
