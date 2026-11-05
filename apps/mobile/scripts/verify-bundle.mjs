#!/usr/bin/env node
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const index = JSON.parse(readFileSync(join(dist, 'data/lesson-index.json'), 'utf8'));
assert.ok(index.lessons.length > 0, 'The offline textbook has no lessons');
for (const lesson of index.lessons) {
  const base = join(dist, 'data/pages/lessons', lesson.id.at(-1), lesson.id);
  for (const language of lesson.languages) {
    for (const kind of ['config', 'questions', 'flashcards']) {
      const filename = join(base, kind, language + '.json');
      assert.ok(existsSync(filename), 'Missing bundled lesson resource: ' + filename);
      JSON.parse(readFileSync(filename, 'utf8'));
    }
  }
}
const locales = readdirSync(join(dist, 'data/ui-kit')).filter(name => name.endsWith('.json'));
assert.ok(locales.length > 0, 'Missing UI Kit localizations');
for (const locale of locales) JSON.parse(readFileSync(join(dist, 'data/ui-kit', locale), 'utf8'));
for (const flag of ['ua.svg', 'qm.svg']) {
  assert.ok(existsSync(join(dist, 'flags', flag)), 'Missing UI Kit flag: ' + flag);
}
const html = readFileSync(join(dist, 'index.html'), 'utf8');
assert.match(html, /type="module"/);
const chunks = readdirSync(join(dist, 'assets')).filter(name => name.endsWith('.js'));
assert.ok(chunks.length > 1, 'Expected statically bundled Scene dynamic import chunks');
assert.ok(chunks.some(name => html.includes(name)), 'HTML must reference a compiled entry chunk');
for (const name of chunks) assert.ok(readFileSync(join(dist, 'assets', name)).length > 0);
console.log('Verified offline distribution: ' + index.lessons.length + ' lessons; ' + locales.length + ' UI locales; ' + chunks.length + ' JS chunks');
