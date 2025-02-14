'use strict'

const { isNaturalNumber } = require('./utils/validations.cjs')

function memoizeit (func, limit = 0) {
  const cache = new Map()
  if (typeof func !== 'function') {
    throw new Error('The argument of momoizeIt must be a function.')
  }

  if (!isNaturalNumber(limit)) {
    throw new Error('The limit argument must be a natural number.')
  }

  const memoized = (...args) => {
    const key = JSON.stringify(args)
    if (limit > 0 && cache.size >= limit) {
      cache.delete(cache.keys().next().value)
    }
    if (cache.has(key)) {
      return cache.get(key)
    }
    const funcResult = func(...args)

    const isPromise =
      typeof funcResult === 'object' && typeof funcResult.then === 'function'

    if (isPromise) {
      return funcResult.then((promiseResult) => {
        cache.set(key, promiseResult)
        return promiseResult
      })
    }

    cache.set(key, funcResult)
    return funcResult
  }
  return memoized
}

module.exports = memoizeit
