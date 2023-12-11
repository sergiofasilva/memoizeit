'use strict'

function memoizeit (func, ttl) {
  const cache = new Map()
  if (typeof func !== 'function') {
    throw new Error('The argument of momoizeIt must be a function.')
  }
  const ttlExists = ttl !== undefined && ttl !== null
  const isTtlPositiveInteger = Number.isInteger(ttl) && ttl > 0
  if (ttlExists && !isTtlPositiveInteger) {
    throw new Error('The ttl argument must be a positive integer.')
  }

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
