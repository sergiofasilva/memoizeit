'use strict';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import memoizeit from '../index.js';

describe('memoizeIt', () => {
  it('It should return an error when no parameter is passed to it.', () => {
    assert.throws(() => {
      memoizeit();
    }, Error);
  });

  it('It should return an error when the parameter passed in is not a function.', () => {
    assert.throws(() => {
      memoizeit('string');
    }, Error);
  });

  it('It should return a function.', () => {
    const memoFoo = memoizeit(Function);
    assert.deepEqual(typeof memoFoo, 'function');
  });

  it('Should return the memoized result for a function.', () => {
    function sum(a, b) {
      return a + b;
    }

    const memoSum = memoizeit(sum);

    assert.strictEqual(memoSum(1, 2), 3);
    assert.strictEqual(memoSum(2, 3), 5);
    assert.strictEqual(memoSum(1, 2), 3);
  });

  it('Should return the cached result when it cached.', (ctx) => {
    function sum(a, b) {
      return a + b;
    }

    const memoSum = memoizeit(sum);

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

  it('Should handle different argument types correctly.', () => {
    function concat(a, b) {
      return `${a}${b}`;
    }
    const memoConcat = memoizeit(concat);

    assert.strictEqual(memoConcat('a', 'b'), 'ab');
    assert.strictEqual(memoConcat(1, 2), '12');
    assert.strictEqual(memoConcat(true, null), 'truenull');
  });

  it('Should handle promises correctly.', async () => {
    async function delayedSum(a, b) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(a + b);
        }, 100);
      });
    }
    const memoDelayedSum = memoizeit(delayedSum);
    const result1 = await memoDelayedSum(1, 2);
    assert.strictEqual(result1, 3);

    const result2 = await memoDelayedSum(3, 2);
    assert.strictEqual(result2, 5);

    const result3 = await memoDelayedSum(1, 2);
    assert.strictEqual(result3, 3);
  });

  it('Should return reference when result is an object.', () => {
    function getObject(arg1, arg2) {
      return { a: arg1, b: arg2 };
    }

    const memoGetObject = memoizeit(getObject);
    const resultObject1 = memoGetObject('x', 'y');
    assert.deepStrictEqual(resultObject1, { a: 'x', b: 'y' });

    const resultObject2 = memoGetObject('x', 'y');
    assert.deepStrictEqual(resultObject2, { a: 'x', b: 'y' });

    resultObject2.c = 'z';
    const resultObject3 = memoGetObject('x', 'y');
    assert.notDeepStrictEqual(resultObject3, { a: 'x', b: 'y' });
    assert.deepStrictEqual(resultObject3, { a: 'x', b: 'y', c: 'z' });
    assert.deepStrictEqual(resultObject1, resultObject2);
    assert.deepStrictEqual(resultObject1, resultObject3);
  });

  it('Should return reference when result is an array.', () => {
    function getArray(arg1, arg2) {
      return [arg1, arg2];
    }

    const memoGetArray = memoizeit(getArray);
    const resultArray1 = memoGetArray('x', 'y');
    assert.deepStrictEqual(resultArray1, ['x', 'y']);

    const resultArray2 = memoGetArray('x', 'y');
    assert.deepStrictEqual(resultArray2, ['x', 'y']);

    resultArray2.push('z');
    const resultArray3 = memoGetArray('x', 'y');
    assert.notDeepStrictEqual(resultArray3, ['x', 'y']);
    assert.deepStrictEqual(resultArray3, ['x', 'y', 'z']);
    assert.deepStrictEqual(resultArray1, resultArray2);
    assert.deepStrictEqual(resultArray1, resultArray3);
  });
});
