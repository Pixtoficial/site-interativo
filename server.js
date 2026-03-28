const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Users\\T-GAMER\\Desktop\\Claude pojeto';
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.css': 'text/css',
  '.js': 'application/javascript'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/portfolio_wallace_ferreira.html';
  if (urlPath === '/obrigado') urlPath = '/obrigado.html';
  if (urlPath === '/site-oficial') urlPath = '/site oficial.html';
  const relative = decodeURIComponent(urlPath.replace(/^\//, ''));
  const filePath = path.join(ROOT, relative);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end(); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('404:', filePath);
      res.writeHead(404); res.end(); return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(9988, '127.0.0.1', () => console.log('Server on http://127.0.0.1:9988'));
