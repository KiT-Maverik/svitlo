/**
 * Tiny test-only HTTP origin for production IndexDB controller browser checks.
 * Bundles real package exports; no Next.js app or cross-host test route is needed.
 */
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { build } from 'esbuild';

const port = Number(process.env.PLAYWRIGHT_DB_PORT ?? '3107');
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PLAYWRIGHT_DB_PORT must be a valid TCP port');
}

const { outputFiles } = await build({
  entryPoints: [resolve('testing/db-browser-harness.ts')],
  outfile: 'db-browser-harness.js',
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: 'es2022',
  write: false,
  logLevel: 'warning',
});
const script = outputFiles.find(file => file.path.endsWith('.js'))?.contents;
if (!script) throw new Error('IndexedDB test harness bundle is missing');

const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>IndexedDB browser controller checks</title></head>
  <body>
    <main><h1>Native IndexedDB controller test harness</h1>
      <p data-testid="db-harness-ready">Ready</p>
    </main>
    <script defer src="/db-browser-harness.js"></script>
  </body>
</html>`;

const server = createServer((request, response) => {
  const pathname = new URL(request.url ?? '/', `http://127.0.0.1:${port}`).pathname;
  if (pathname === '/db-browser-harness' || pathname === '/db-browser-harness/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(html);
  } else if (pathname === '/db-browser-harness.js') {
    response.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(script);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log(`IndexedDB browser test origin at http://127.0.0.1:${port}/db-browser-harness`);
});
