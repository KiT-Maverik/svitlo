#!/usr/bin/env node
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const dist = join(root, 'dist');
const index = JSON.parse(readFileSync(join(dist, 'data/lesson-index.json'), 'utf8'));
const publication = JSON.parse(readFileSync(join(dist, '.svitlo/publish-playground.json'), 'utf8'));
assert.equal(publication.textbook, 'playground');
assert.ok(publication.files.some(name => name.startsWith('data/lessons/')));
assert.ok(publication.files.includes('data/skills/base.json'));
assert.ok(index.lessons.length > 0, 'The offline textbook has no lessons');
for (const lesson of index.lessons) {
  const directory = join(dist, 'data/lessons', lesson.id.at(-1), lesson.id);
  const baseFile = join(directory, 'base.json');
  assert.ok(existsSync(baseFile), 'Missing bundled Lesson base: ' + baseFile);
  const base = JSON.parse(readFileSync(baseFile, 'utf8'));
  assert.equal(base.id, lesson.id);
  assert.equal(base.type, 'lesson');
  assert.deepEqual(base.params.languages, lesson.languages);
  assert.ok(Array.isArray(base.section));
  assert.ok(Array.isArray(base.flashcards));
  for (const language of lesson.languages) {
    const localeFile = join(directory, language + '.json');
    if (existsSync(localeFile)) JSON.parse(readFileSync(localeFile, 'utf8'));
  }
}
for (const language of ['base', 'uk']) {
  const filename = join(dist, 'data/skills', language + '.json');
  assert.ok(existsSync(filename), 'Missing compiled Skills resource: ' + filename);
  JSON.parse(readFileSync(filename, 'utf8'));
}
const locales = readdirSync(join(dist, 'data/uiKit/components')).filter(name => name.endsWith('.json'));
assert.ok(locales.length > 0, 'Missing UI Kit localizations');
for (const locale of locales) JSON.parse(readFileSync(join(dist, 'data/uiKit/components', locale), 'utf8'));
const methodsRoot = join(dist, 'data/uiKit/assessmentMethods');
const methodsBase = JSON.parse(readFileSync(join(methodsRoot, 'base.json'), 'utf8'));
const methods = Object.keys(methodsBase).sort();
assert.equal(existsSync(join(methodsRoot, 'meta.json')), false);
assert.equal(methods.length, 16);
for (const method of methods) {
  assert.equal(methodsBase[method].slug, method);
  assert.ok(methodsBase[method].id);
}
const methodLanguages = readdirSync(methodsRoot).filter(name => name !== 'base.json');
assert.equal(methodLanguages.length, 29);
assert.ok(methodLanguages.includes('uk.json'));
assert.ok(methodLanguages.includes('qm.json'));
for (const filename of methodLanguages) {
  assert.match(filename, /^[a-z]{2}\.json$/);
  const data = JSON.parse(readFileSync(join(methodsRoot, filename), 'utf8'));
  assert.deepEqual(Object.keys(data).sort(), methods);
  for (const method of methods) {
    assert.ok(data[method].title);
    assert.ok(data[method].description);
  }
}
for (const flag of ['ua.svg', 'qm.svg']) {
  assert.ok(existsSync(join(dist, 'flags', flag)), 'Missing UI Kit flag: ' + flag);
}
const html = readFileSync(join(dist, 'index.html'), 'utf8');
assert.match(html, /type="module"/);
assert.match(html, /rel="stylesheet"/, 'Compiled textbook Scene styles must be included');
const chunks = readdirSync(join(dist, 'assets')).filter(name => name.endsWith('.js'));
assert.ok(chunks.length > 1, 'Expected statically bundled Scene dynamic import chunks');
assert.ok(
  chunks.some(name => html.includes(name)),
  'HTML must reference a compiled entry chunk',
);
for (const name of chunks) assert.ok(readFileSync(join(dist, 'assets', name)).length > 0);
console.log(
  'Verified offline distribution: ' +
    index.lessons.length +
    ' lessons; ' +
    locales.length +
    ' UI locales; ' +
    chunks.length +
    ' JS chunks',
);
