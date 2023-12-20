// export = memoizeit;
// declare function memoizeit<Args extends unknown[], Out>(func: (...args: Args) => Out): (...args: Args) => Out;
export = memoizeit;
interface Options {
    cache?: Map<any, any>
    ttl?: number
}
declare function memoizeit<Args extends unknown[], Out>(func: (...args: Args) => Out, options?: Options): (...args: Args) => Out;
