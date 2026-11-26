import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, test } from 'node:test';
import { startBuiltMobileServer } from './serve-built.mjs';

const servers = [];
const directories = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map(server => new Promise(resolve => server.close(resolve))));
  await Promise.all(directories.splice(0).map(directory => rm(directory, { recursive: true, force: true })));
});

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'svitlo-mobile-built-'));
  directories.push(root);
  const dist = join(root, 'dist');
  await mkdir(join(dist, 'data'), { recursive: true });
  await mkdir(join(dist, 'assets'));
  await writeFile(join(dist, 'index.html'), '<!doctype html><title>Built Mobile</title>');
  await writeFile(join(dist, 'data', 'lesson-index.json'), '{"textbook":"playground"}');
  await writeFile(join(dist, 'assets', 'main.js'), 'export const prepared = true;');
  await writeFile(join(root, 'private.txt'), 'not an asset');
  return { dist, root };
}

async function listen(dist) {
  const server = await startBuiltMobileServer({ dist, port: 0 });
  servers.push(server);
  return 'http://127.0.0.1:' + server.address().port;
}

test('fail closed without a prebuilt production bundle', async () => {
  const { root, dist } = await fixture();
  await assert.rejects(startBuiltMobileServer({ dist: join(root, 'absent'), port: 0 }), /Run npm run app:build/);
  await rm(join(dist, 'index.html'));
  await assert.rejects(startBuiltMobileServer({ dist, port: 0 }), /Missing Mobile dist\/index.html/);
});

test('serves built scripts, JSON and client-side routes without rebuilding or rewriting dist', async () => {
  const { dist } = await fixture();
  const before = await stat(join(dist, 'index.html'));
  const url = await listen(dist);
  const home = await fetch(url + '/');
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type'), /text\/html/);
  assert.match(await home.text(), /Built Mobile/);
  const route = await fetch(url + '/uk/lesson/en/12345678-1234-1234-1234-123456789abc', {
    headers: { Accept: 'text/html' },
  });
  assert.equal(route.status, 200);
  assert.match(await route.text(), /Built Mobile/);
  const json = await fetch(url + '/data/lesson-index.json');
  assert.equal(json.status, 200);
  assert.match(json.headers.get('content-type'), /application\/json/);
  assert.deepEqual(await json.json(), { textbook: 'playground' });
  const javascript = await fetch(url + '/assets/main.js');
  assert.equal(javascript.status, 200);
  assert.match(javascript.headers.get('content-type'), /text\/javascript/);
  assert.match(await javascript.text(), /prepared = true/);
  const head = await fetch(url + '/assets/main.js', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  const after = await stat(join(dist, 'index.html'));
  assert.equal(after.mtimeMs, before.mtimeMs);
  assert.match(await readFile(join(dist, 'index.html'), 'utf8'), /Built Mobile/);
});

test('missing assets do not become HTML, and requests cannot escape dist', async () => {
  const { dist } = await fixture();
  const url = await listen(dist);
  assert.equal((await fetch(url + '/data/absent.json', { headers: { Accept: 'text/html' } })).status, 404);
  assert.equal((await fetch(url + '/%2e%2e%2fprivate.txt')).status, 403);
  assert.equal((await fetch(url + '/.svitlo/metadata.json')).status, 403);
  assert.equal((await fetch(url + '/data/lesson-index.json', { method: 'POST' })).status, 405);
});
