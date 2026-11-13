import assert from 'node:assert/strict';
import test from 'node:test';

import { defineLesson } from '../../configurators/lessons/defineLesson/defineLesson';
import { renderLessonPropsFiles, type LessonPublicationEntry } from './generateLessonProps.utils';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const relative = 'c/' + id;

const makeLesson = (title: string | { en: string; uk: string } = { en: 'Light', uk: 'Світло' }) =>
  defineLesson({
    id,
    slug: 'lightLesson',
    type: 'lesson',
    skills: [],
    params: {
      requireQuiz: false,
      languages: ['en', 'uk'] as const,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title },
    section: { items: {}, order: [] },
    flashcards: { items: {}, order: [] },
  });

const entry = (source = 'content/playground/first.ts'): LessonPublicationEntry => ({
  source,
  publication: makeLesson().build.props({ languages: ['en', 'uk'] }),
});

test('emits one base and Props-shaped language fragments at canonical UUID paths', () => {
  const publication = makeLesson().build.props({ languages: ['en', 'uk'] });
  const files = renderLessonPropsFiles([{ source: 'lesson.ts', publication }]);
  assert.deepEqual([...files.keys()], [relative + '/base.json', relative + '/en.json', relative + '/uk.json']);
  const base = JSON.parse(files.get(relative + '/base.json')!);
  assert.equal(base.id, id);
  assert.equal(base.type, 'lesson');
  assert.deepEqual(base.params.languages, ['en', 'uk']);
  assert.equal(base.programId, undefined, 'Optional undefined metadata must be omitted');
  assert.deepEqual(JSON.parse(files.get(relative + '/uk.json')!), publication.locale?.uk);
  assert.equal(JSON.parse(files.get(relative + '/uk.json')!).locale.title, 'Світло');
  assert.equal(files.get(relative + '/base.json')?.endsWith('\n'), true);
});

test('does not generate locale files for invariant-only Lessons', () => {
  const built = makeLesson('Invariant').build.props({ languages: ['en', 'uk'] });
  assert.equal(built.locale, undefined);
  const files = renderLessonPropsFiles([{ source: 'lesson.ts', publication: built }]);
  assert.deepEqual([...files.keys()], [relative + '/base.json']);
  assert.equal(JSON.parse(files.get(relative + '/base.json')!).locale.title, 'Invariant');
});

test('skips empty and undefined locales without synthesizing translation data', () => {
  const files = renderLessonPropsFiles([
    {
      source: 'lesson.ts',
      publication: {
        base: { id, type: 'lesson' },
        locale: { uk: {}, en: undefined },
      },
    },
  ]);
  assert.deepEqual([...files.keys()], [relative + '/base.json']);
});

test('rejects duplicate IDs across sources rather than rejecting legitimate regeneration', () => {
  const first = entry();
  const second = entry('content/math/another.ts');
  assert.throws(() => renderLessonPropsFiles([first, second]), /Duplicate Lesson ID.*first\.ts.*another\.ts/);
  assert.deepEqual(
    [...renderLessonPropsFiles([first])],
    [...renderLessonPropsFiles([first])],
    'Rebuilding the same Lesson is deterministic and allowed',
  );
});

test('rejects malformed identities, malformed language keys, and broken locale bodies', () => {
  assert.throws(
    () => renderLessonPropsFiles([{ source: 'bad', publication: { base: { id: '../escape', type: 'lesson' } } }]),
    /canonical UUID/,
  );
  assert.throws(
    () => renderLessonPropsFiles([{ source: 'bad', publication: { base: { id, type: 'text' } } }]),
    /Expected built Lesson Props/,
  );
  assert.throws(
    () =>
      renderLessonPropsFiles([
        { source: 'bad', publication: { base: { id, type: 'lesson' }, locale: { '../uk': {} } } },
      ]),
    /Invalid Lesson language file name/,
  );
  assert.throws(
    () =>
      renderLessonPropsFiles([
        { source: 'bad', publication: { base: { id, type: 'lesson' }, locale: { uk: 'not props' } } },
      ]),
    /Invalid Lesson locale body/,
  );
  assert.throws(
    () =>
      renderLessonPropsFiles([
        { source: 'bad', publication: { base: { id, type: 'lesson', invalid: () => false } as never } },
      ]),
    /Non-JSON value/,
  );
});

test('renders deterministic, isolated publication snapshots with canonical relative paths', () => {
  const first = renderLessonPropsFiles([entry()]);
  const second = renderLessonPropsFiles([entry()]);

  assert.notStrictEqual(first, second, 'Each render owns its output map');
  assert.deepEqual([...first], [...second], 'Rebuilding the same Lesson produces identical bytes');
  assert.deepEqual([...second.keys()], [relative + '/base.json', relative + '/en.json', relative + '/uk.json']);

  for (const [filename, body] of second) {
    assert.match(filename, /^[0-9a-f]\\/[0-9a-f-]{36}\\/(?:base|[a-z]{2})\\.json$/);
    assert.equal(body.endsWith('\\n'), true, 'Publication JSON must end in a newline');
  }

  first.clear();
  assert.equal(second.size, 3, 'A previously returned map cannot mutate a later publication');
});
