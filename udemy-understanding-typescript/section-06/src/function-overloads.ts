type Combinable2 = string | number;
type Numeric2 = number | boolean;
type Universal2 = Combinable2 & Numeric2;

function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: Combinable2, b: Combinable2) {
    //  type guard
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add2(1, 5);
