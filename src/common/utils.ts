export const logger = console.log;
export const errorLogger = console.error;

export function generateUniqueInteger(): number {
    const now = Date.now();
    const then = (new Date('2016-01-01')).getTime();
    return now - then;
}