declare function memoizeit<T extends (...args: any[]) => any>(func: T, limit?: number): T;
export { memoizeit };
export default memoizeit;
