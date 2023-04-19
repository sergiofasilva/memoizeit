import memoizeit from 'memoizeit';

// function to be memoized
async function promiseIncrementeOne(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Number(value) + 1);
    }, ms);
  });
}

async function init() {
  // memoization of the memoization of the promised function
  const memoizedPromise = memoizeit(promiseIncrementeOne);

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
