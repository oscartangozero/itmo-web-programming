const NUMBER_REGEX = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?[0-9]+)?$/;

export function isBoundedNumber(min, max) {
    return (str) => {
        if (!NUMBER_REGEX.test(str)) return false;
        const float = parseFloat(str);
        return min <= float && float <= max};
}