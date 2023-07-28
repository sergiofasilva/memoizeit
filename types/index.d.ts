export = memoizeit;
declare function memoizeit<Args extends unknown[], Out>(func: (...args: Args) => Out): (...args: Args) => Out;
