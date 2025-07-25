"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = void 0;
exports.memoizeit = memoizeit;
exports.memoizeIt = memoizeit;
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
module.exports = memoizeit; // For CommonJS compatibility
__exportStar(require("./types"), exports);
var index_1 = require("./index"); // For backward compatibility
Object.defineProperty(exports, "memoize", { enumerable: true, get: function () { return index_1.memoizeit; } });
exports.default = memoizeit; // Single default export
