/*
  webworker-threads library (worker-threads are experimental at this point)
  - a lot of times heavy computation is already being executed in its own thread
  outside of the event loop so that would defeat the purpose
*/
const Worker = require('webworker-threads').Worker;

const express = require('express');
const app = express();
// const crypto = require('crypto');

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;

      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    }
  });

  worker.onmessage = function(message) {
    console.log(message.data);
    res.send('' + message.data)
  }

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('this was fast');
});

app.listen(1337);
