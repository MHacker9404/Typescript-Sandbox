// namespace App {
//  validation logic
export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(iv: Validatable) {
    let isValid = true;
    if (iv.required) {
        isValid &&= iv.value.toString().length !== 0;
    }
    if (typeof iv.value === 'string' && typeof iv.minLength !== 'undefined') {
        isValid &&= iv.value.length > iv.minLength;
    }
    if (typeof iv.value === 'string' && typeof iv.maxLength !== 'undefined') {
        isValid &&= iv.value.length <= iv.maxLength;
    }
    if (typeof iv.value === 'number' && typeof iv.min !== 'undefined') {
        isValid &&= iv.value >= iv.min;
    }
    if (typeof iv.value === 'number' && typeof iv.max !== 'undefined') {
        isValid &&= iv.value <= iv.max;
    }

    return isValid;
}
// }
