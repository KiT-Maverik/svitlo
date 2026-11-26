import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

test('Forge Vite owns development and uses only the adapter-approved local endpoint', () => {
  const scripts = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).scripts;
  const renderer = readFileSync(resolve(root, 'vite.renderer.config.ts'), 'utf8');
  const main = readFileSync(resolve(root, 'electron/main.ts'), 'utf8');
  assert.equal(scripts['app:start:dev'], 'electron-forge start');
  assert.equal(scripts['preapp:start:dev'], 'npm run app:prepare:content');
  assert.match(renderer, /host: '127\.0\.0\.1', port: 5173, strictPort: true/);
  assert.match(main, /MAIN_WINDOW_VITE_DEV_SERVER_URL/);
  assert.doesNotMatch(main, /SVITLO_DESKTOP_DEV_URL/);
  assert.equal(scripts['app:build:main'], undefined);
});
