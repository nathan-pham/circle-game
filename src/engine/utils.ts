export const random = (start: number = 0, end: number = 1) =>
    Math.random() * (end - start) + start;

export const choice = <T>(array: Array<T>) =>
    array[Math.floor(Math.random() * array.length)];

export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
