import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadPublishedLesson } from '../dist/renderer.js';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const path = '/data/pages/lessons/c/' + id;
const kinds = ['config', 'flashcards', 'questions'];

function resources() {
  return {
    config: {
      base: {
        data: {
          id,
          slug: 'lesson',
          title: null,
          parameters: {
            languages: ['uk'],
            requireQuiz: false,
            sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
          },
          sections: [
            {
              id: 'section',
              slug: 'intro',
              type: 'theory',
              title: null,
              navigationLabel: null,
              content: [],
            },
          ],
        },
        localeSources: {},
      },
      uk: {
        data: {
          title: 'Світло',
          sections: { 0: { title: 'Вступ', navigationLabel: 'Початок' } },
        },
        localeSources: { title: { code: 'uk' } },
      },
    },
    flashcards: { base: { data: [], localeSources: {} }, uk: { data: {}, localeSources: {} } },
    questions: { base: { data: {}, localeSources: {} }, uk: { data: {}, localeSources: {} } },
  };
}

test('Electron resolves base and sparse locale resources before lesson assembly', async t => {
  const data = resources();
  const requested = [];
  t.mock.method(globalThis, 'fetch', async url => {
    requested.push(url);
    const match = new RegExp('^' + path + '/(config|flashcards|questions)/(base|uk)\\.json$').exec(url);
    if (!match) return { ok: false, status: 404 };
    return { ok: true, json: async () => data[match[1]][match[2]] };
  });
  const lesson = await loadPublishedLesson(id, 'uk');
  assert.equal(lesson.id, id);
  assert.equal(lesson.title, 'Світло');
  assert.equal(lesson.sections[0].title, 'Вступ');
  assert.equal(lesson.sections[0].navigationLabel, 'Початок');
  assert.equal(lesson.locale.code, 'uk');
  assert.deepEqual(
    requested.sort(),
    kinds.flatMap(kind => [path + '/' + kind + '/base.json', path + '/' + kind + '/uk.json']).sort(),
  );
});

test('Electron rejects missing locale patches rather than falling back silently', async t => {
  const data = resources();
  t.mock.method(globalThis, 'fetch', async url => {
    if (url.endsWith('/questions/uk.json')) return { ok: false, status: 404 };
    const match = /\/(config|flashcards|questions)\/(base|uk)\.json$/.exec(url);
    return { ok: true, json: async () => data[match[1]][match[2]] };
  });
  await assert.rejects(loadPublishedLesson(id, 'uk'), /Missing packaged textbook resource/);
});
