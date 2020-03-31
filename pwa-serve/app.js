const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');
const port = process.env.httpPort || 80;
const sslPort = process.env.sslPort || 443;

app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

http.createServer(app).listen(port, err => {
  console.log('Started HTTP Server.');
  if (err) console.log(err);
});

if (process.env.NODE_ENV === 'prod') {
  https
    .createServer(
      {
        key: fs.readFileSync('certs/' + process.env.keyName),
        cert: fs.readFileSync('certs/' + process.env.certName),
      },
      app
    )
    .listen(sslPort, err => {
      console.log('Started HTTPS Server.');
      if (err) console.log(err);
    });
}
