# MemoizeIt

**MemoizeIt is a node.js module for functions memoization.**

---

>**Memoisation** is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

More about **memoization** here: [https://en.wikipedia.org/wiki/Memoization](https://en.wikipedia.org/wiki/Memoization)

---

**Should only be used with pure functions.**

>A pure function is a function that has the following properties:
>
>1. the function return values are identical for identical arguments (no variation with local static variables, non-local variables, mutable reference arguments or input streams), and
>2. the function has no side effects (no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams).

More about **pure functions** here: [https://en.wikipedia.org/wiki/Pure_function](https://en.wikipedia.org/wiki/Pure_function)

## Installation

```bash
npm i memoizeit
```

## Usage

```javascript
import memoizeit from "memoizeit";

// function to be memoized
function sum(a, b) {
  return a + b;
}

// memoization of the sum function
const memoSum = memoizeIt(sum);

// using the memoized function
const result1 = memoSum(1, 2));  // first call (no cached value)
console.log(result1); // prints 3

const result1 = memoSum(1, 2));  // second call (cache usage)
console.log(result1); // prints 3
```


## Authors

- [@sergiofasilva](https://github.com/sergiofasilva)


## License

[MIT](https://choosealicense.com/licenses/mit/)
