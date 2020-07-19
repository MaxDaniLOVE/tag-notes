const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
});

server.on('request', (req, res) => {
  if (req.url === '/') {
    const rawdata = fs.readFileSync(`${__dirname}/notes.json`);
    res.end(rawdata);
  } else {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        fs.writeFileSync(`${__dirname}/notes.json`, body);
        res.end(JSON.stringify({ message: 'successfully updated!' }));
      });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
