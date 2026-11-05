#!/usr/bin/env node
import * as esbuild from 'esbuild';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const mobileRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(mobileRoot, 'dist');
const serve = process.argv.includes('--serve');
const entry = join(mobileRoot, 'src/main.tsx');
if (!existsSync(join(mobileRoot, 'src/generated/textbook.ts'))) {
  throw new Error('Mobile textbook is not prepared. Run node scripts/prepare.mjs first.');
}
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(mobileRoot, 'public'), dist, { recursive: true });

const config = {
  absWorkingDir: mobileRoot,
  entryPoints: [entry],
  outdir: dist,
  entryNames: 'assets/[name]-[hash]',
  chunkNames: 'assets/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  format: 'esm',
  splitting: true,
  bundle: true,
  platform: 'browser',
  target: ['es2022', 'chrome100', 'safari15'],
  jsx: 'automatic',
  loader: {
    '.svg': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.webp': 'file',
    '.gif': 'file',
    '.woff2': 'file',
  },
  metafile: true,
  logLevel: 'info',
  minify: !serve,
  sourcemap: serve ? 'inline' : false,
};
function createHtml(result) {
  const entryOutput = Object.entries(result.metafile.outputs).find(([, meta]) =>
    meta.entryPoint?.endsWith('src/main.tsx'),
  );
  if (!entryOutput) throw new Error('esbuild did not emit the React entrypoint');
  const [js, meta] = entryOutput;
  const url = path => '/' + relative(dist, resolve(mobileRoot, path)).replaceAll('\\', '/');
  const css = meta.cssBundle ? '<link rel="stylesheet" href="' + url(meta.cssBundle) + '">' : '';
  const html =
    '<!doctype html><html><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    '<meta name="theme-color" content="#fff">' +
    '<title>Svitlo</title>' +
    css +
    '</head><body><div id="root"></div>' +
    '<script type="module" src="' +
    url(js) +
    '"></script></body></html>';
  writeFileSync(join(dist, 'index.html'), html);
  if (!existsSync(join(dist, 'data/lesson-index.json')))
    throw new Error('Offline lesson index missing from distribution');
}
if (serve) {
  const context = await esbuild.context(config);
  createHtml(await context.rebuild());
  await context.watch();
  const server = await context.serve({
    servedir: dist,
    host: '127.0.0.1',
    port: 5173,
    fallback: join(dist, 'index.html'),
  });
  console.log('Mobile browser preview: ' + server.host + ':' + server.port);
} else {
  createHtml(await esbuild.build(config));
  console.log('Capacitor WebView distribution: ' + dist);
}
