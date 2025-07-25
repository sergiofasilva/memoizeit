declare function memoizeit<Args extends unknown[], Out>(
  func: (...args: Args) => Out,
  limit?: number
): (...args: Args) => Out;

export = memoizeit;
export as namespace memoizeit;
export default memoizeit;

