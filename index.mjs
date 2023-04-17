"use strict";

export default function memoizeIt(func) {
    const cache = new Map();
    if (typeof func !== "function") {
        throw new Error("The argument of momoizeIt must be a function.");
    }
    function memoized(...args) {
        const key = JSON.stringify(args) ?? String(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const funcResult = func.apply(this, args);

        const isPromise =
            typeof funcResult === "object" &&
            typeof funcResult.then === "function";

        if (isPromise) {
            return funcResult.then((promiseResult) => {
                cache.set(key, promiseResult);
                return promiseResult;
            });
        }

        cache.set(key, funcResult);
        return funcResult;
    }
    return memoized;
}
