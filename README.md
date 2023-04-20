# MemoizeIt

**MemoizeIt** is a node.js module for functions memoization.

---

> **Memoisation** is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

More about **memoization** here: [https://en.wikipedia.org/wiki/Memoization](https://en.wikipedia.org/wiki/Memoization)

---

**This module should only be used with pure functions**

> A pure function is a function that has the following properties:
>
> 1.  the function return values are identical for identical arguments (no variation with local static variables, non-local variables, mutable reference arguments or input streams), and
> 2.  the function has no side effects (no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams).

More about **pure functions** here: [https://en.wikipedia.org/wiki/Pure_function](https://en.wikipedia.org/wiki/Pure_function)

## Installation

```bash
npm i memoizeit
```

## Usage

```javascript
import memoizeit from 'memoizeit';

// function to be memoized
function sum(a, b) {
  return a + b;
}

// memoization of the sum function
const memoSum = memoizeit(sum);

// using the memoized function
const result1 = memoSum(1, 2); // first call (no cached value)
console.log(result1); // prints 3

const result2 = memoSum(1, 2); // second call (cache usage)
console.log(result2); // prints 3
```

## Promises

Functions that return promises are supported.

```javascript
import memoizeit from 'memoizeit';

// promise function to be memoized
async function promiseIncrementOne(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Number(value) + 1);
    }, ms);
  });
}

async function init() {
  // memoization of the promised function
  const memoizedPromise = memoizeit(promiseIncrementOne);

  // using the memoized function
  console.time('First time');
  console.log('First call calculation:', await memoizedPromise(3000, 4)); // first call (no cached value)
  console.timeEnd('First time');
  console.log();
  console.log(' #################### ');
  console.log();
  console.time('second time');
  console.log('Second call calculation:', await memoizedPromise(3000, 4)); // second call (cache usage)
  console.timeEnd('second time');
}

init();
```

## Functions that return objects (including arrays)

The memorized functions of functions that return objects (including arrays) return a reference to the object. If the object is changed, the next calls to the memorized function will return a reference to the modified object.

```javascript
import memoizeit from 'memoizeit';

function getObject(arg1, arg2) {
  return { a: arg1, b: arg2 };
}

const memoGetObject = memoizeit(getObject);
const resultObject = memoGetObject('x', 'y');
console.log(resultObject); // { a: 'x', b: 'y' }

resultObject.c = 'z';
const resultObject2 = memoGetObject('x', 'y');
console.log(resultObject); // { a: 'x', b: 'y', c: 'z' }
```

## Some examples

### Fibonacci

```javascript
import memoizeit from 'memoizeit';

// fibonacci function to be memoized
function fibonacciWithMemoizeIt(n) {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
}

// fibonacci non-memoized function
function fibonacciWithoutMemoizeIt(n) {
  if (n <= 1) return n;
  return fibonacciWithoutMemoizeIt(n - 1) + fibonacciWithoutMemoizeIt(n - 2);
}

// memoization of the fibonacci function
const memoizedFibonacci = memoizeit(fibonacciWithMemoizeIt);

// using the memoized function
console.time('memoizedit time');
console.log('Memoized calculation:', memoizedFibonacci(45)); // Memoized calculation: 1134903170
console.timeEnd('memoizedit time'); // memoizedit time: 7.275ms

// use of the non-memoized function
console.time('not memoizedit time');
console.log('Not memoized calculation:', fibonacciWithoutMemoizeIt(45)); // Not memoized calculation: 1134903170
console.timeEnd('not memoizedit time'); // not memoizedit time: 17.834s
```

## Authors

- [@sergiofasilva](https://github.com/sergiofasilva)

## License

[MIT](https://choosealicense.com/licenses/mit/)
