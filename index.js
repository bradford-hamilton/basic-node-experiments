/*
  pm2 start index.js -i 0

  this will spin up a number of instances equal to the number of logical CPU
  cores you have. Physical core is obvious (dual-core machine is 2), while
  logical cores is in the case of multi-threading or hyper-threading where a
  single core can process multiple threads at a time
*/

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
