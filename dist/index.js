function memoizeit(func, limit = 0) {
    const cache = new Map();
    if (typeof func !== 'function') {
        throw new Error('The argument of memoizeIt must be a function.');
    }
    if (!Number.isInteger(limit) || limit < 0) {
        throw new Error('The limit argument must be a natural number.');
    }
    const memoized = (...args) => {
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
        const isPromise = typeof funcResult === 'object' &&
            funcResult !== null &&
            typeof funcResult.then === 'function';
        if (isPromise) {
            return funcResult.then((promiseResult) => {
                cache.set(key, promiseResult);
                return promiseResult;
            });
        }
        cache.set(key, funcResult);
        return funcResult;
    };
    return memoized;
}
export { memoizeit };
export default memoizeit;
// Compatibility CommonJS and ES Modules:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = memoizeit;
    module.exports.memoizeit = memoizeit; //named export
}
