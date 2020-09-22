function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return obj[key];
}

// extractAndConvert({}, 'name');   // compile error - name key does not exist
extractAndConvert({ name: 'phil' }, 'name');
