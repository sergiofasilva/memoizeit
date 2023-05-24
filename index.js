'use strict'

function memoizeit (func, options) {
  const opt = isValidOptions(options)
    ? options
    : { cache: new Map(), key: 'key' }
  const cache = opt.cache
  const okey = opt.key

  if (typeof func !== 'function') {
    throw new Error('The argument of momoizeIt must be a function.')
  }

  const memoized = (...args) => {
    const key = `${okey}_${JSON.stringify(args)}`
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

function isValidOptions (options) {
  if (options === undefined || options === null) {
    return
  }

  if (options.constructor !== Object) {
    throw new Error(
      'When provided, the options parameter must be of type object.'
    )
  }

  const schemaOptions = {
    cache: (value) => isValidCache(value)
  }

  const validate = (object, schema) =>
    Object.entries(schema)
      .map(([key, validate]) => [
        key,
        !(key in object) || validate(object[key])
      ])
      .filter(([_, ...tests]) => !tests.every(Boolean))
      .map((key) => new Error(`Option ${key} is 'invalid'.`))

  const errors = validate(options, schemaOptions)

  if (errors.length > 0) {
    throw new Error(errors[0])
  } else {
    if (options.cache) {
      return true
    }
  }
}

function isValidCache (cache) {
  if (cache === undefined || cache === null) {
    return
  }

  if (cache.constructor !== Object) {
    throw new Error(
      'When provided, the cache option parameter must be of type object.'
    )
  }

  if (!Object.keys(cache).includes('client')) {
    throw new Error(
      'When provided, the cache option parameter must include "client" propety.'
    )
  }

  if (!Object.keys(cache).includes('key')) {
    throw new Error(
      'When provided, the cache option parameter must include "key" property.'
    )
  }

  if (
    typeof cache.client.get !== 'function' ||
    typeof cache.client.set !== 'function'
  ) {
    throw new Error(
      'When provided, the cache option parameter must have a valid cache client.'
    )
  }

  if (!cache.key) {
    throw new Error(
      'When provided, the cache option parameter must have a valid key.'
    )
  }
  return true
}

module.exports = memoizeit
