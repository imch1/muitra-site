import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const port = Number(process.env.PORT || 8080);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname.replace(/^\/+/, '');
  let file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`) && file !== root) {
    response.writeHead(403).end();
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  else if (!fs.existsSync(file) && !path.extname(file)) file += '.html';
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, { 'Content-Type': types['.html'] }).end(fs.readFileSync('404.html'));
    return;
  }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}/`));
