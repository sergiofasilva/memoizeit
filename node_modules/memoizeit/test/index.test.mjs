'use strict';
import { describe, it, before, mock } from 'node:test';
import assert from 'node:assert/strict';
import memoizeIt from "../index.mjs";

describe("memoizeIt", () => {
  it("It should return an error when no parameter is passed to it.", () => {
    assert.throws(() => {
      memoizeIt();
    }, Error);
  });

  it("It should return an error when the parameter passed in is not a function.", () => {
    assert.throws(() => {
      memoizeIt("string");
    }, Error);
  });

  it("It should return a function.", () => {
    function sum(a, b) {
      return a + b;
    }

    const memoSum = memoizeIt(sum);
    assert.deepEqual(typeof memoSum, 'function');
  });

  it("Should return the memoized result for a function", () => {
    function sum(a, b) {
      return a + b;
    }
    const memoSum = memoizeIt(sum);

    assert.strictEqual(memoSum(1, 2), 3);
    assert.strictEqual(memoSum(2, 3), 5);
    assert.strictEqual(memoSum(1, 2), 3);
  });

  it("Should return the cached result when it cached", (ctx) => {
    function sum(a, b) {
      return a + b;
    }

    const memoSum = memoizeIt(sum);

    ctx.mock.method(sum, 'apply');
    assert.strictEqual(memoSum(1, 2), 3);
    assert.strictEqual(sum.apply.mock.calls.length, 1); // addt o cache
    assert.strictEqual(memoSum(2, 3), 5);
    assert.strictEqual(sum.apply.mock.calls.length, 2); // add to cache
    assert.strictEqual(memoSum(1, 2), 3);
    assert.strictEqual(sum.apply.mock.calls.length, 2); // get from cache
    assert.strictEqual(memoSum(2, 3), 5);
    assert.strictEqual(sum.apply.mock.calls.length, 2); // get from cache
  });

  it("Should handle different argument types correctly", () => {
    function concat(a, b) {
      return `${a}${b}`;
    }
    const memoConcat = memoizeIt(concat);

    assert.strictEqual(memoConcat("a", "b"), "ab");
    assert.strictEqual(memoConcat(1, 2), "12");
    assert.strictEqual(memoConcat(true, null), "truenull");
  });

  it("Should handle promises correctly", async () => {
    async function delayedSum(a, b) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(a + b);
        }, 100);
      });
    }
    const memoDelayedSum = memoizeIt(delayedSum);
    const result1 = await memoDelayedSum(1, 2);
    assert.strictEqual(result1, 3);

    const result2 = await memoDelayedSum(1, 2);
    assert.strictEqual(result2, 3);
  });
});
