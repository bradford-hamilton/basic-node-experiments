// clustering experiment. Do not use nodemon as it doesn't play well with clustering
const cluster = require('cluster');

process.env.UV_THREADPOOL_SIZE = 1;

// is the file being executed in master mode
if (cluster.isMaster) {
  // cause index.js to be executed again, but in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // i'm a child, I will act as server and nothing else
  const express = require('express');
  const app = express();
  const crypto = require('crypto');

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('heyo');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('this was fast');
  });

  app.listen(1337);
}
