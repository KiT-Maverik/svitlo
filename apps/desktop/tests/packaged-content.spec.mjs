import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const renderer = join(root, 'dist-renderer');
const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const resources = join(renderer, 'data/lessons/c', id);

test('renderer has no Next.js server or external entrypoint', () => {
  const html = readFileSync(join(renderer, 'index.html'), 'utf8');
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /script-src/);
  assert.doesNotMatch(html, /https?:\/\/(?:localhost|127\.0\.0\.1)/);
  assert.ok(existsSync(join(root, 'dist-main/main.cjs')));
});
test('build bundles the complete Lesson Props base and sparse selected locale', () => {
  const baseFile = join(resources, 'base.json');
  assert.ok(existsSync(baseFile), baseFile);
  const lessonBase = JSON.parse(readFileSync(baseFile, 'utf8'));
  assert.equal(lessonBase.id, id);
  assert.equal(lessonBase.type, 'lesson');
  assert.ok(Array.isArray(lessonBase.section));
  assert.ok(Array.isArray(lessonBase.flashcards));
  assert.ok(lessonBase.params.languages.includes('uk'));
  const ukFile = join(resources, 'uk.json');
  if (existsSync(ukFile)) assert.ok(JSON.parse(readFileSync(ukFile, 'utf8')));
  assert.ok(existsSync(join(renderer, 'data/uiKit/components/uk.json')));
  const methodsRoot = join(renderer, 'data/uiKit/assessmentMethods');
  const base = JSON.parse(readFileSync(join(methodsRoot, 'base.json'), 'utf8'));
  const methods = Object.keys(base).sort();
  assert.equal(existsSync(join(methodsRoot, 'meta.json')), false);
  assert.equal(methods.length, 16);
  for (const method of methods) {
    assert.equal(base[method].slug, method);
    assert.ok(base[method].id);
  }
  const languages = readdirSync(methodsRoot).filter(name => name !== 'base.json');
  assert.equal(languages.length, 29);
  assert.ok(languages.includes('uk.json'));
  assert.ok(languages.includes('qm.json'));
  for (const filename of languages) {
    assert.match(filename, /^[a-z]{2}\.json$/);
    const data = JSON.parse(readFileSync(join(methodsRoot, filename), 'utf8'));
    assert.deepEqual(Object.keys(data).sort(), methods);
    for (const method of methods) {
      assert.ok(data[method].title);
      assert.ok(data[method].description);
    }
  }
  assert.ok(existsSync(join(renderer, 'data/skills/base.json')));
  assert.ok(existsSync(join(renderer, 'data/skills/uk.json')));
  assert.ok(existsSync(join(renderer, 'flags/ua.svg')));
  const published = JSON.parse(readFileSync(join(renderer, '.svitlo/publish-playground.json'), 'utf8'));
  assert.equal(published.textbook, 'playground');
  assert.ok(published.files.some(name => name.startsWith('data/lessons/')));
  assert.ok(published.files.includes('data/skills/base.json'));
  assert.ok(published.files.includes('data/skills/uk.json'));
});
test('statically registered Scene modules are emitted as local JavaScript chunks', () => {
  const assets = join(renderer, 'assets');
  const javascript = readdirSync(assets).filter(name => name.endsWith('.js'));
  assert.ok(javascript.length > 1, 'expected split Scene JavaScript chunks');
  const styles = readdirSync(assets).filter(name => name.endsWith('.css'));
  assert.ok(styles.length > 0, 'expected compiled textbook Scene styles');
  assert.ok(javascript.some(name => name.startsWith('2abe959c-0908-4779-afbb-b2da6c1aa4d4-')));
});
