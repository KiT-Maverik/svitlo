import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { mergeLessonResources } from '@svitlo/engine';

const base = join(process.cwd(), 'dist/static/data/pages/courses');
const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'd3048d21-8690-5255-b62c-984c69ac272c';
const episodeId = '9f417177-1d07-5a9d-ad74-0146c5637e84';
const files = JSON.parse(readFileSync('dist/manifest.json', 'utf8')).files;
const json = (...segments) => JSON.parse(readFileSync(join(base, courseId, ...segments), 'utf8'));
const assembled = (...segments) => mergeLessonResources(json(...segments.slice(0, -1), 'base.json'), json(...segments));

test('Playground Course generates independent localized TOC, sparse override and Episode resources', () => {
  const toc = assembled('toc', 'uk.json');
  const patch = assembled('overrides', lessonId, 'uk.json');
  const episode = assembled('episodes', episodeId, 'uk.json');

  assert.equal(Object.hasOwn(json('toc', 'uk.json'), 'type'), false);
  assert.equal(Object.hasOwn(json('episodes', episodeId, 'uk.json'), 'sections'), false);
  assert.equal(Object.hasOwn(json('overrides', lessonId, 'uk.json'), 'lessonId'), false);
  assert.equal(toc.type, 'course');
  assert.equal(toc.id, courseId);
  assert.equal(toc.children[0].type, 'module');
  assert.equal(toc.children[0].children[0].type, 'chapter');
  assert.equal(toc.children[0].children[0].children[1].type, 'episode');
  assert.equal(patch.lessonId, lessonId);
  assert.deepEqual(patch.overrides.sections.order, [
    'practice',
    'storyBridge',
    'theory',
    'contentBlockGallery',
    'quiz',
  ]);
  assert.deepEqual(
    patch.overrides.sections.added.map(item => item.source.type),
    ['course', 'course'],
  );
  assert.deepEqual(patch.overrides.parameters.sections, { allowSkipping: false });
  assert.equal(Object.hasOwn(patch.overrides, 'questions'), false);
  assert.equal(Object.hasOwn(patch.overrides, 'flashcards'), false);
  assert.equal(episode.sections[0].type, 'scenario');
  assert.match(episode.sections[0].content[0].locales, /Lorem ipsum/);
  for (const resource of ['toc/uk.json', 'overrides/' + lessonId + '/uk.json', 'episodes/' + episodeId + '/uk.json']) {
    assert(files.includes('data/pages/courses/' + courseId + '/' + resource));
  }
});

test('the Course-only gallery contains all supported renderable blocks and publishes its local media', () => {
  const patch = assembled('overrides', lessonId, 'uk.json');
  const gallery = patch.overrides.sections.added.find(entry => entry.section.slug === 'contentBlockGallery')?.section;
  assert(gallery, 'Missing content block gallery Section');
  assert.equal(gallery.type, 'learningFlow');
  assert.deepEqual(
    gallery.content.map(block => block.type),
    ['text', 'markdown', 'code', 'image', 'carousel', 'video', 'audio', 'youtube', 'scene', 'checkpoint'],
  );
  assert.equal(gallery.content.find(block => block.type === 'image').src, '/textbooks/playground/whale.png');
  const carousel = gallery.content.find(block => block.type === 'carousel');
  assert(carousel, 'Missing carousel block in published Course gallery');
  assert.equal(carousel.transition, 'slide');
  assert.equal(carousel.loop, true);
  assert.equal(carousel.allowFullscreen, true);
  assert.deepEqual(
    carousel.slides.map(slide => slide.src),
    [
      '/textbooks/playground/whale.png',
      '/textbooks/playground/carousel-light.svg',
      '/textbooks/playground/carousel-prism.svg',
    ],
  );
  assert(carousel.slides.every(slide => typeof slide.alt === 'string' && slide.alt.trim()));
  assert.equal(
    gallery.content.find(block => block.type === 'video').fileLocation,
    '/textbooks/playground/barabaka.mp4',
  );
  assert.equal(
    gallery.content.find(block => block.type === 'audio').fileLocation,
    '/textbooks/playground/demo-tone.wav',
  );
  assert.equal(gallery.content.find(block => block.type === 'scene').id, '72d22bea-d787-4c6d-9a83-144830c6d325');
  assert.equal('rendererKey' in gallery.content.find(block => block.type === 'scene'), false);
  assert.equal(gallery.content.find(block => block.type === 'checkpoint').items[0].answer[0].type, 'text');
  for (const file of ['whale.png', 'carousel-light.svg', 'carousel-prism.svg', 'barabaka.mp4', 'demo-tone.wav']) {
    assert(files.includes('textbooks/playground/' + file), 'Missing published media ' + file);
  }
});

test('The original standalone Lesson data retains its own Section order', () => {
  const lessonBase = JSON.parse(
    readFileSync('dist/static/data/pages/lessons/c/' + lessonId + '/config/base.json', 'utf8'),
  );
  assert.deepEqual(
    lessonBase.data.sections.map(section => section.slug),
    ['theory', 'practice', 'quiz'],
  );
});

test('Course generator emits matching resource groups for every supported locale', () => {
  const prefix = 'data/pages/courses/' + courseId + '/';
  const paths = files.filter(name => name.startsWith(prefix));
  const locales = paths
    .filter(name => name.includes('/toc/') && !name.endsWith('/base.json'))
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
  assert.equal(paths.length, 3 * (locales.length + 1));
  for (const resource of [
    'toc/base.json',
    'overrides/' + lessonId + '/base.json',
    'episodes/' + episodeId + '/base.json',
  ]) {
    assert(paths.includes(prefix + resource));
  }
});
