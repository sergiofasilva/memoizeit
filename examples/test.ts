import { memoizeit } from 'memoizeit'

function getSumBetween (start, end) {
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += i
  }
  return sum
}

// memoization of the getSumBetween function
const memoizedGetSum = memoizeit()

memoizedGetSum()
