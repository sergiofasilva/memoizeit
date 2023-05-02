const memoizeit = require('memoizeit-develop')

// function to be memoized
function getSumBetween (start, end) {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += i
  }
  return sum
}

// memoization of the getSumBetween function
const memoizedGetSum = memoizeit(getSumBetween)

// using the memoized function
console.time('First time')
console.log('First calculation:', memoizedGetSum(1, 3000000000)) // first call (no cached value)
console.timeEnd('First time')
console.log()
console.log(' #################### ')
console.log()
console.time('Second time')
console.log('Second calculation:', memoizedGetSum(1, 3000000000)) // second call (cache usage)
console.timeEnd('Second time')
