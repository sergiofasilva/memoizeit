'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function memoizeit(func) {
    var cache = new Map();
    if (typeof func !== 'function') {
        throw new Error('The argument of momoizeIt must be a function.');
    }
    var memoized = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        var funcResult = func.apply(void 0, args);
        var isPromise = typeof funcResult === 'object' && typeof funcResult.then === 'function';
        if (isPromise) {
            return funcResult.then(function (promiseResult) {
                cache.set(key, promiseResult);
                return promiseResult;
            });
        }
        cache.set(key, funcResult);
        return funcResult;
    };
    return memoized;
}
exports.default = memoizeit;
//# sourceMappingURL=index.js.map