import memoizeit from './index.mjs'

function sum (a, b) {
  return a + b
}

console.log(typeof memoizeit) // function')

// const memoSum = memoizeit(sum)

const resSum = sum(1, 2)
// const memoResSum = memoSum(1, 3)
console.log('Orig:', resSum) // 3
// console.log('Mem:', memoResSum) // 4
