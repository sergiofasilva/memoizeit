# MemoizeIt
[![npm version](https://img.shields.io/npm/v/memoizeit)](https://www.npmjs.com/package/memoizeit)
[![Build Status](https://img.shields.io/github/actions/workflow/status/sergiofasilva/memoizeit/ci.yml)](https://github.com/sergiofasilva/memoizeit/actions)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/sergiofasilva/memoizeit/badge.svg)](https://snyk.io/test/github/sergiofasilva/memoizeit)

&nbsp;

**MemoizeIt** is a powerful JavaScript package that allows you to improve the performance of expensive functions. By "memorizing" the output of a function for specific input values. **MemoizeIt** is able to return the memorized output immediately when called with the same arguments, instead of having to calculate the result again.

&nbsp;

> **Memoisation** is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

More about **memoization** here: [https://en.wikipedia.org/wiki/Memoization](https://en.wikipedia.org/wiki/Memoization)

---

&nbsp;

**Note:** **_This module should only be used with pure functions_**

A pure function is a function that has the following properties:

> 1.  the function return values are identical for identical arguments (no variation with local static variables, non-local variables, mutable reference arguments or input streams), and
> 2.  the function has no side effects (no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams).

More about **pure functions** here: [https://en.wikipedia.org/wiki/Pure_function](https://en.wikipedia.org/wiki/Pure_function)

&nbsp;

## Installation

To use **MemoizeIt**, simply install it via **npm**:

```bash
npm i memoizeit
```

&nbsp;
... _or via **yarn**_:

```bash
yarn add memoizeit
```

&nbsp;

## Usage

Then import it into your code and use it:

```javascript
import { memoizeit } from 'memoizeit'
```

&nbsp;
... _or with **require** (CommonJS)_:

```javascript
const memoizeit = require('memoizeit')
```

&nbsp;

To benefit from **MemoizeIt** performance improvements, simply pass the function to be memoized as an input parameter:

```javascript
// function to be memoized
function sum (a, b) {
  return a + b
}

// memoization of the sum function
const memoSum = memoizeit(sum)
```

&nbsp;

Memoized functions can then be called as normal, with the added bonus of improved performance for repeated calls with the same arguments:

```javascript
// using the memoized function
const result1 = memoSum(1, 2) // first call (no cached value)
console.log(result1) // prints 3

const result2 = memoSum(1, 2) // second call (cache usage)
console.log(result2) // prints 3
```
&nbsp;

## Limit Parameter
You can limit the number of cached results by passing a second parameter to the memoizeit function. This is useful to prevent excessive memory usage.

```javascrip`
const memoSum = memoizeit(sum, 2);

console.log(memoSum(1, 2)); // 3
console.log(memoSum(2, 3)); // 5
console.log(memoSum(3, 4)); // 7 (recalculated, as the first result was deleted from cache)
```

&nbsp;

## Promises are supported

Functions that return promises are supported.

```javascript
import memoizeit from 'memoizeit'

// promise function to be memoized
async function promiseIncrementOne (ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Number(value) + 1)
    }, ms)
  })
}

async function init () {
  // memoization of the promised function
  const memoizedPromise = memoizeit(promiseIncrementOne)

  // using the memoized function
  console.time('First time')
  console.log('First call calculation:', await memoizedPromise(3000, 4)) // first call (no cached value)
  console.timeEnd('First time') // First time: 3.012s
  console.log()
  console.log(' #################### ')
  console.log()
  console.time('second time')
  console.log('Second call calculation:', await memoizedPromise(3000, 4)) // second call (cache usage)
  console.timeEnd('second time') // second time: 0.078ms
}

init()
```

&nbsp;

## Functions that return objects (including arrays)

The memorized functions of functions that return objects (including arrays) return a reference to the object. If the object is changed, the next calls to the memorized function will return a reference to the modified object.

```javascript
import memoizeit from 'memoizeit'

function getObject (arg1, arg2) {
  return { a: arg1, b: arg2 }
}

const memoGetObject = memoizeit(getObject)
const resultObject = memoGetObject('x', 'y')
console.log(resultObject) // { a: 'x', b: 'y' }

resultObject.c = 'z'
const resultObject2 = memoGetObject('x', 'y')
console.log(resultObject) // { a: 'x', b: 'y', c: 'z' }
```

&nbsp;

## Some examples

### Fibonacci

The calculation of a high number in the fibonacci sequence requires a lot of computation as it is necessary to recursively calculate the fibonacci value of smaller numbers.

![Image](https://raw.githubusercontent.com/sergiofasilva/memoizeit/main/media/images/fib7.png)

As we see in the image to calculate the fibonacci value for the number 7, we need to calculate the fibonacci value several times from other lower numbers. The fibonacci for the number 2 is calculated 8 times.
By using memoization we only have to do the calculation once and save the result to be used immediately in the next calculation, saving a lot of time and computing resources.

&nbsp;

Here's an example of how to use **MemoizeIt** to improve the performance of an expensive function that calculates Fibonacci numbers recursively:

```javascript
import memoizeit from 'memoizeit'

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
console.log('Memoized calculation:', memoizedFibonacci(45)) // Memoized calculation: 1134903170
console.timeEnd('memoizedit time') // memoizedit time: 7.275ms

// use of the non-memoized function
console.time('not memoizedit time')
console.log('Not memoized calculation:', fibonacciWithoutMemoizeIt(45)) // Not memoized calculation: 1134903170
console.timeEnd('not memoizedit time') // not memoizedit time: 17.834s
```

&nbsp;

## Authors

- [@sergiofasilva](https://github.com/sergiofasilva)

&nbsp;

## License

[MIT](https://choosealicense.com/licenses/mit/)
