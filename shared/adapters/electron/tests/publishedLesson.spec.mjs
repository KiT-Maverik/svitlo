import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadPublishedLesson } from '../dist/renderer.js';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const sectionId = '663572e7-bd85-4516-86e2-3de07d209e02';
const path = '/data/lessons/c/' + id;

function resources() {
  const section = {
    id: sectionId,
    slug: 'intro',
    type: 'content',
    params: {},
    locale: { title: 'Introduction', navigationLabel: '1' },
    content: [],
  };
  return {
    base: {
      id,
      slug: 'lesson',
      type: 'lesson',
      skills: [],
      locale: { title: 'Shared title' },
      params: {
        languages: ['en', 'uk'],
        requireQuiz: false,
        sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
      },
      section: [section],
      flashcards: [],
    },
    uk: {
      locale: { title: 'Світло' },
      section: [{ ...section, locale: { title: 'Вступ', navigationLabel: 'Початок' } }],
    },
  };
}

test('Electron resolves new Lesson Props base and sparse locale without legacy response projection', async t => {
  const data = resources();
  const requested = [];
  t.mock.method(globalThis, 'fetch', async url => {
    requested.push(url);
    const key = url === path + '/base.json' ? 'base' : url === path + '/uk.json' ? 'uk' : null;
    return key ? { ok: true, status: 200, json: async () => data[key] } : { ok: false, status: 404 };
  });
  const lesson = await loadPublishedLesson(id, 'uk');
  assert.equal(lesson.id, id);
  assert.equal(lesson.locale.title, 'Світло');
  assert.equal(lesson.section[0].locale.title, 'Вступ');
  assert.equal(lesson.section[0].locale.navigationLabel, 'Початок');
  assert.deepEqual(requested.sort(), [path + '/base.json', path + '/uk.json'].sort());
});

test('Electron accepts missing locale file only when invariant Lesson Props are complete', async t => {
  const data = resources();
  t.mock.method(globalThis, 'fetch', async url =>
    url === path + '/base.json'
      ? { ok: true, status: 200, json: async () => data.base }
      : { ok: false, status: 404 },
  );
  const lesson = await loadPublishedLesson(id, 'en');
  assert.equal(lesson.locale.title, 'Shared title');
  assert.equal(lesson.section[0].locale.title, 'Introduction');
});

test('Electron rejects missing base, invalid locale payload and unsupported languages', async t => {
  const data = resources();
  t.mock.method(globalThis, 'fetch', async url =>
    url === path + '/base.json'
      ? { ok: true, status: 200, json: async () => data.base }
      : { ok: false, status: 404 },
  );
  await assert.rejects(loadPublishedLesson(id, 'pl'), /does not support requested language/);
  t.mock.restoreAll();
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 404 }));
  await assert.rejects(loadPublishedLesson(id, 'uk'), /Missing packaged textbook resource/);
  t.mock.restoreAll();
  t.mock.method(globalThis, 'fetch', async url => ({
    ok: true,
    status: 200,
    json: async () => url.endsWith('/base.json') ? data.base : { locale: { title: 42 } },
  }));
  await assert.rejects(loadPublishedLesson(id, 'uk'), /Invalid assembled Lesson Props/);
});
