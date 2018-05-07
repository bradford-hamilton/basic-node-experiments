// node.js single threaded? The event loop IS but some of the functionality is not

// customize the threadpool size
process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

/*
  if node were truly single threaded and each of these took 1 second, the
  total time taken would be 2 seconds. Instead they were both around 1 at
  the same time.

  libuv uses a thread pool outside of nodes event loop to process SOME
  expensive computations
*/

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});

/*
  Now when we run 5, the first 4 calls take the normal 1 second then the 5th
  call took an additional second. The threadpool in libuv used 4 threads
  which were assigned to the cores on my computer. After the 4 tasks complete
  node is able to move onto the 5th function call which is then computed
*/
