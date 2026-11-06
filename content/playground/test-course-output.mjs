import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const base = join(process.cwd(), 'dist/static/data/pages/courses');
const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const episodeId = '9f417177-1d07-5a9d-ad74-0146c5637e84';
const files = JSON.parse(readFileSync('dist/manifest.json', 'utf8')).files;
const json = (...segments) => JSON.parse(readFileSync(join(base, courseId, ...segments), 'utf8'));

test('Playground Course generates independent localized TOC, sparse override and Episode resources', () => {
  const toc = json('toc', 'uk.json');
  const patch = json('overrides', lessonId, 'uk.json');
  const episode = json('episodes', episodeId, 'uk.json');

  assert.equal(toc.type, 'course');
  assert.equal(toc.id, courseId);
  assert.equal(toc.children[0].type, 'module');
  assert.equal(toc.children[0].children[0].type, 'chapter');
  assert.equal(toc.children[0].children[0].children[1].type, 'episode');
  assert.equal(patch.lessonId, lessonId);
  assert.deepEqual(patch.overrides.sections.order, ['practice', 'storyBridge', 'theory', 'quiz']);
  assert.deepEqual(patch.overrides.sections.added.map(item => item.source.type), ['course']);
  assert.deepEqual(patch.overrides.parameters.sections, { allowSkipping: false });
  assert.equal(Object.hasOwn(patch.overrides, 'questions'), false);
  assert.equal(Object.hasOwn(patch.overrides, 'flashcards'), false);
  assert.equal(episode.sections[0].type, 'scenario');
  assert.match(episode.sections[0].content[0].locales, /Lorem ipsum/);
  for (const resource of [
    'toc/uk.json',
    'overrides/' + lessonId + '/uk.json',
    'episodes/' + episodeId + '/uk.json',
  ]) {
    assert(files.includes('data/pages/courses/' + courseId + '/' + resource));
  }
});

test('The original standalone Lesson data retains its own Section order', () => {
  const lessonBase = JSON.parse(readFileSync(
    'dist/static/data/pages/lessons/c/' + lessonId + '/config/base.json', 'utf8',
  ));
  assert.deepEqual(lessonBase.data.sections.map(section => section.slug), ['theory', 'practice', 'quiz']);
});

test('Course generator emits matching resource groups for every supported locale', () => {
  const prefix = 'data/pages/courses/' + courseId + '/';
  const paths = files.filter(name => name.startsWith(prefix));
  const locales = paths.filter(name => name.includes('/toc/'))
    .map(name => name.slice(name.lastIndexOf('/') + 1).replace(/\.json$/, ''));
  assert(locales.length > 1);
  for (const locale of locales) {
    for (const relative of [
      'toc/' + locale + '.json',
      'overrides/' + lessonId + '/' + locale + '.json',
      'episodes/' + episodeId + '/' + locale + '.json',
    ]) {
      assert(paths.includes(prefix + relative));
    }
  }
  assert.equal(paths.length, 3 * locales.length);
});
