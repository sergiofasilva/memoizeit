'use strict';
import { describe, it, before, mock } from 'node:test';
import assert from 'node:assert/strict';
import memoizeIt from "../index.mjs";

describe("memoizeIt", () => {
    it("Should return the memoized result for a function", () => {
      function sum(a, b) {
        return a + b;
      }
      const memoSum = memoizeIt(sum);
  
      assert.strictEqual(memoSum(1, 2), 3);
      assert.strictEqual(memoSum(2, 3), 5);
      assert.strictEqual(memoSum(1, 2), 3);
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

    it("It should return a function.", () => {
      function sum(a, b) {
        return a + b;
      }

      const memoSum = memoizeIt(sum);
      assert.deepEqual(typeof memoSum, 'function');
    });

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

    it("Should return the chached result for a function", (ctx) => {
      function sum(a, b) {
        return a + b;
      }
      const memoSum = memoizeIt(sum);
      const cache = new Map();


      ctx.mock.method(cache, 'set');
      assert.strictEqual(memoSum(1, 2), 3);
      assert.strictEqual(memoSum(2, 3), 5);
      assert.strictEqual(memoSum(1, 2), 3);
      console.log('CAHCHE GET', cache.set.mock.calls.length);
    });
  });
