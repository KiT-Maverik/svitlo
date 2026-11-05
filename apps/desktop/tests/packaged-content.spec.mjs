import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const renderer = join(root, 'dist-renderer');
const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const resources = join(renderer, 'data/pages/lessons/c', id);

test('renderer has no Next.js server or external entrypoint', () => {
  const html = readFileSync(join(renderer, 'index.html'), 'utf8');
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /script-src/);
  assert.doesNotMatch(html, /https?:\/\/(?:localhost|127\.0\.0\.1)/);
  assert.ok(existsSync(join(root, 'dist-main/main.cjs')));
});
test('build bundles the real lesson and localized config, flashcards and questions', () => {
  for (const kind of ['config', 'flashcards', 'questions']) {
    const filename = join(resources, kind, 'uk.json');
    assert.ok(existsSync(filename), filename);
    assert.ok(JSON.parse(readFileSync(filename, 'utf8')).data !== undefined);
  }
  assert.ok(existsSync(join(renderer, 'data/ui-kit/uk-UA.json')));
  assert.ok(existsSync(join(renderer, 'data/pages/skillAnalytics/uk.json')));
  assert.ok(existsSync(join(renderer, 'flags/ua.svg')));
});
test('statically registered Scene modules are emitted as local JavaScript chunks', () => {
  const assets = join(renderer, 'assets');
  const javascript = readdirSync(assets).filter(name => name.endsWith('.js'));
  assert.ok(javascript.length > 1, 'expected split Scene JavaScript chunks');
  const styles = readdirSync(assets).filter(name => name.endsWith('.css'));
  assert.ok(styles.length > 0, 'expected compiled textbook Scene styles');
  const content = javascript.map(name => readFileSync(join(assets, name), 'utf8')).join('\n');
  assert.match(content, /how-light-moves-scene/);
});
