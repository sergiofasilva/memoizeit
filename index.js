'use strict'

function memoizeit (func, options = {}) {
  if (typeof func !== 'function') {
    throw new Error('The first argument of memoizeIt must be a function.')
  }

  const isCacheOptionProvided = options?.cache !== undefined && options?.cache !== null
  const isCacheOptionValid = options?.cache instanceof Map
  if (isCacheOptionProvided && !isCacheOptionValid) {
    throw new Error('When provided, the cache option must be a Map object.')
  }

  const ttl = options?.ttl
  const isTtlProvided = ttl !== undefined && ttl !== null
  const isTtlPositiveInteger = Number.isInteger(ttl) && ttl > 0
  if (isTtlProvided && !isTtlPositiveInteger) {
    throw new Error('When provided, the ttl option must be a positive integer.')
  }

  const cache = options?.cache instanceof Map ? options.cache : new Map()

  const memoized = (...args) => {
    const key = JSON.stringify(args)
    const now = new Date().getTime()
    const expire = isTtlPositiveInteger ? new Date().getTime() + ttl * 1000 : -1

    setImmediate(() => {
      deleteExpiredCacheKeys(cache)
    })

    if (cache.has(key)) {
      const isExpired = expire !== -1 && cache.get(key).expireAt < now
      if (isExpired) {
        cache.delete(key)
        return memoized(...args)
      }
      return cache.get(key).value
    }
    const funcResult = func(...args)

    const isPromise =
      typeof funcResult === 'object' && typeof funcResult.then === 'function'

    if (isPromise) {
      return funcResult.then((promiseResult) => {
        cache.set(key, new Memoized(promiseResult, expire))
        return promiseResult
      })
    }

    cache.set(key, new Memoized(funcResult, expire))
    return funcResult
  }
  return memoized
}

function deleteExpiredCacheKeys (cache) {
  const now = new Date().getTime()
  for (const [key, value] of cache.entries()) {
    const isExpired = value.expireAt !== -1 && value.expireAt < now

    if (!isExpired) {
      break
    }
    cache.delete(key)
  }
}

class Memoized {
  constructor (value, expire) {
    this.value = value
    this.expireAt = expire
  }
}

module.exports = memoizeit
