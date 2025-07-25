function memoizeit<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 0
): T {
  const cache = new Map<string, any>();
  if (typeof func !== 'function') {
    throw new Error('The argument of memoizeIt must be a function.');
  }

  if (!Number.isInteger(limit) || limit < 0) {
    throw new Error('The limit argument must be a natural number.');
  }

  const memoized = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (limit > 0 && cache.size >= limit) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }
    if (cache.has(key)) {
      return cache.get(key);
    }
    const funcResult = func(...args);

    const isPromise =
      typeof funcResult === 'object' &&
      funcResult !== null &&
      typeof (funcResult as any).then === 'function';

    if (isPromise) {
      return (funcResult as Promise<any>).then((promiseResult: any) => {
        cache.set(key, promiseResult);
        return promiseResult;
      }) as ReturnType<T>;
    }

    cache.set(key, funcResult);
    return funcResult;
  };
  return memoized as T;
}

export { memoizeit };
export default memoizeit;

// Compatibility CommonJS and ES Modules:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = memoizeit;
  module.exports.default = memoizeit;
  module.exports.memoizeit = memoizeit; //named export
}

