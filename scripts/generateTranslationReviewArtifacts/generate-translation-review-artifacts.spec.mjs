import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseArguments } from './generate-translation-review-artifacts.mjs';

test('requires an explicit reference family and never defaults to whole-repository generation', () => {
  assert.throws(() => parseArguments([]), /explicit supported --kind/);
  assert.throws(() => parseArguments(['--kind', 'all']), /explicit supported --kind/);
  assert.throws(() => parseArguments(['--kind', 'skills']), /require --package/);
  assert.throws(() => parseArguments(['--kind', 'lessons']), /require --package/);
});

test('scopes Skills and Lessons to the named textbook and optional locale', () => {
  assert.deepEqual(parseArguments(['--kind', 'skills', '--package', 'content/astronomy', '--locale', 'it']),
    { kind: 'skills', package: 'content/astronomy', locale: 'it' });
  assert.deepEqual(parseArguments(['--kind', 'skills', '--package', 'content/astronomy']),
    { kind: 'skills', package: 'content/astronomy' });
  assert.deepEqual(parseArguments(['--kind', 'lessons', '--package', 'content/math', '--locale', 'uk']),
    { kind: 'lessons', package: 'content/math', locale: 'uk' });
  assert.deepEqual(parseArguments(['--kind', 'lessons', '--package', 'content/math']),
    { kind: 'lessons', package: 'content/math' });
});

test('rejects unsafe paths, invalid combinations and duplicate options before writing anything', () => {
  for (const args of [
    ['--kind', 'skills', '--package', '../outside'],
    ['--kind', 'skills', '--package', 'content/../art'],
    ['--kind', 'skills', '--package', 'content/art', '--component', 'audio'],
    ['--kind', 'lessons', '--package', 'content/art', '--lesson', 'fake'],
    ['--kind', 'ui-kit', '--package', 'content/art'],
    ['--kind', 'geography-home-copy', '--package', 'content/geography'],
    ['--kind', 'assessment-methods', '--locale', 'it', '--locale', 'en'],
    ['--kind', 'ui-kit', '--component', '../audio'],
    ['--kind', 'skills', '--package', 'content/art', '--locale', 'it-IT'],
  ]) {
    assert.throws(() => parseArguments(args), 'Accepted unsafe request: ' + args.join(' '));
  }
});

test('allows only explicitly selected standalone reference families and optional UI Kit component', () => {
  assert.deepEqual(parseArguments(['--kind', 'assessment-methods', '--locale', 'it']),
    { kind: 'assessment-methods', locale: 'it' });
  assert.deepEqual(parseArguments(['--kind', 'ui-kit', '--component', 'audio', '--locale', 'uk']),
    { kind: 'ui-kit', component: 'audio', locale: 'uk' });
  assert.deepEqual(parseArguments(['--kind', 'geography-home-copy']),
    { kind: 'geography-home-copy' });
});
