const memoizeit = require('memoizeit-main')

// fibonacci function to be memoized
function fibonacciWithMemoizeIt (n) {
  if (n <= 1) return n
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2)
}

// fibonacci non-memoized function
function fibonacciWithoutMemoizeIt (n) {
  if (n <= 1) return n
  return fibonacciWithoutMemoizeIt(n - 1) + fibonacciWithoutMemoizeIt(n - 2)
}

// memoization of the fibonacci function
const memoizedFibonacci = memoizeit(fibonacciWithMemoizeIt)

// using the memoized function
console.time('memoizedit time')
console.log('Memoized calculation:', memoizedFibonacci(45))
console.timeEnd('memoizedit time')

// use of the non-memoized function
console.time('not memoizedit time')
console.log('Not memoized calculation:', fibonacciWithoutMemoizeIt(45))
console.timeEnd('not memoizedit time')
