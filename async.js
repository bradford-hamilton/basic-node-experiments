const https = require('https');

const start = Date.now();

function makeRequest() {
  https.request('https://www.google.com', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start);
    });
  })
  .end();
}

makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
