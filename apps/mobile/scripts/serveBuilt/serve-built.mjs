#!/usr/bin/env node
/**
 * @fileoverview Serve an existing Mobile production bundle for browser verification.
 * No content preparation, bundling or mutation of dist is allowed here.
 */
import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { realpath, stat } from 'node:fs/promises';
import { extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultDist = fileURLToPath(new URL('../../dist/', import.meta.url));
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function within(root, candidate) {
  const path = relative(root, candidate);
  return path !== '..' && !path.startsWith('..' + sep) && !isAbsolute(path);
}

/** Start a read-only preview. The caller owns server.close(). */
export async function startBuiltMobileServer({ dist = defaultDist, host = '127.0.0.1', port = 5174 } = {}) {
  const root = await realpath(dist).catch(() => {
    throw new Error('Missing Mobile dist. Run npm run app:build --workspace @svitlo/mobile first.');
  });
  const index = join(root, 'index.html');
  const indexStat = await stat(index).catch(() => null);
  if (!indexStat?.isFile()) {
    throw new Error('Missing Mobile dist/index.html. Run npm run app:build --workspace @svitlo/mobile first.');
  }

  const server = createServer((request, response) => {
    void (async () => {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, { Allow: 'GET, HEAD' }).end();
        return;
      }
      let pathname;
      try {
        pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      } catch {
        response.writeHead(400).end();
        return;
      }
      if (pathname.includes('\\') || pathname.includes('\0')) {
        response.writeHead(400).end();
        return;
      }
      const file = resolve(root, '.' + pathname);
      if (!within(root, file) || pathname.split('/').some(part => part.startsWith('.') && part !== '.')) {
        response.writeHead(403).end();
        return;
      }
      let selected = pathname === '/' ? index : file;
      let info = await stat(selected).catch(() => null);
      if (!info?.isFile() && !extname(pathname) && request.headers.accept?.includes('text/html')) {
        // React client-side lesson routes need index.html; asset fetches never do.
        selected = index;
        info = indexStat;
      }
      if (!info?.isFile()) {
        response.writeHead(404).end();
        return;
      }
      if (!within(root, await realpath(selected))) {
        response.writeHead(403).end();
        return;
      }
      response.writeHead(200, {
        'Content-Type': mimeTypes[extname(selected)] ?? 'application/octet-stream',
        'Content-Length': info.size,
        'Cache-Control': 'no-store',
      });
      if (request.method === 'HEAD') {
        response.end();
      } else {
        createReadStream(selected).on('error', () => response.destroy()).pipe(response);
      }
    })().catch(error => {
      console.error('Mobile bundle preview request failed:', error);
      if (!response.headersSent) response.writeHead(500).end();
      else response.destroy();
    });
  });
  try {
    await new Promise((resolveReady, reject) => {
      server.once('error', reject);
      server.listen(port, host, () => {
        server.off('error', reject);
        resolveReady();
      });
    });
  } catch (error) {
    server.close();
    throw error;
  }
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 5174);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('Invalid Mobile preview PORT: ' + process.env.PORT);
    process.exitCode = 1;
  } else {
    startBuiltMobileServer({ port })
      .then(() => console.log('Serving existing Mobile production bundle at http://127.0.0.1:' + port))
      .catch(error => {
        console.error(error.message);
        process.exitCode = 1;
      });
  }
}
