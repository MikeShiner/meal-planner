const express = require('express');
const app = express();
const port = 8080;
const https = require('https');
const http = require('http');

app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

http.createServer(app).listen(80);

if (process.env.NODE_ENV === 'prod') {
  https
    .createServer(
      {
        key: fs.readFileSync('certs/privkey.pem'),
        cert: fs.readFileSync('certs/cert.pem'),
      },
      app
    )
    .listen(443);
}
