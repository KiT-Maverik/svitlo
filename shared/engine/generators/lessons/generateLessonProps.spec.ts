import assert from 'node:assert/strict';
import test from 'node:test';

import { defineLessonStub } from '../../configurators/courses/defineCourseChildStubs';
import { defineLesson } from '../../configurators/lessons/defineLesson/defineLesson';
import { renderLessonDataFiles, type LessonPublicationEntry } from './generateLessonProps.utils';

const id = 'd3048d21-8690-5255-b62c-984c69ac272c';
const relative = 'c/' + id;

const makeLesson = (title: string | { en: string; uk: string } = { en: 'Light', uk: 'Світло' }) =>
  defineLesson({
    id,
    slug: 'lightLesson',
    type: 'lesson',
    skills: [],
    params: {
      quizRequiredForCompletion: false,
      languages: ['en', 'uk'] as const,
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title },
    section: { items: {}, order: [] },
  });

const entry = (source = 'content/playground/first.ts'): LessonPublicationEntry => ({
  source,
  publication: makeLesson().build.data({ languages: ['en', 'uk'] }),
});

test('emits one base and Props-shaped language fragments at canonical UUID paths', () => {
  const publication = makeLesson().build.data({ languages: ['en', 'uk'] });
  const files = renderLessonDataFiles([{ source: 'lesson.ts', publication }]);
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
  const built = makeLesson('Invariant').build.data({ languages: ['en', 'uk'] });
  assert.equal(built.locale, undefined);
  const files = renderLessonDataFiles([{ source: 'lesson.ts', publication: built }]);
  assert.deepEqual([...files.keys()], [relative + '/base.json']);
  assert.equal(JSON.parse(files.get(relative + '/base.json')!).locale.title, 'Invariant');
});

test('skips empty and undefined locales without synthesizing translation data', () => {
  const files = renderLessonDataFiles([
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
  assert.throws(() => renderLessonDataFiles([first, second]), /Duplicate Lesson ID.*first\.ts.*another\.ts/);
  assert.deepEqual(
    [...renderLessonDataFiles([first])],
    [...renderLessonDataFiles([first])],
    'Rebuilding the same Lesson is deterministic and allowed',
  );
});

test('rejects malformed identities, malformed language keys, and broken locale bodies', () => {
  assert.throws(
    () => renderLessonDataFiles([{ source: 'bad', publication: { base: { id: '../escape', type: 'lesson' } } }]),
    /canonical UUID/,
  );
  assert.throws(
    () => renderLessonDataFiles([{ source: 'bad', publication: { base: { id, type: 'text' } } }]),
    /Expected built Lesson Props/,
  );
  assert.throws(
    () =>
      renderLessonDataFiles([
        { source: 'bad', publication: { base: { id, type: 'lesson' }, locale: { '../uk': {} } } },
      ]),
    /Invalid Lesson language file name/,
  );
  assert.throws(
    () =>
      renderLessonDataFiles([
        { source: 'bad', publication: { base: { id, type: 'lesson' }, locale: { uk: 'not props' } } },
      ]),
    /Invalid Lesson locale body/,
  );
  assert.throws(
    () =>
      renderLessonDataFiles([
        { source: 'bad', publication: { base: { id, type: 'lesson', invalid: () => false } as never } },
      ]),
    /Non-JSON value/,
  );
});

test('renders deterministic, isolated publication snapshots with canonical relative paths', () => {
  const first = renderLessonDataFiles([entry()]);
  const second = renderLessonDataFiles([entry()]);

  assert.notStrictEqual(first, second, 'Each render owns its output map');
  assert.deepEqual([...first], [...second], 'Rebuilding the same Lesson produces identical bytes');
  assert.deepEqual([...second.keys()], [relative + '/base.json', relative + '/en.json', relative + '/uk.json']);

  for (const [filename, body] of second) {
    assert.match(filename, /^[0-9a-f]\/[0-9a-f-]{36}\/(?:base|[a-z]{2})\.json$/);
    assert.equal(body.endsWith('\n'), true, 'Publication JSON must end in a newline');
  }

  first.clear();
  assert.equal(second.size, 3, 'A previously returned map cannot mutate a later publication');
});

test('rejects deeply non-JSON Lesson publication values instead of silently dropping data', () => {
  const bad = (nested: unknown) =>
    [
      {
        source: 'lesson.ts',
        publication: { base: { id, type: 'lesson', extra: nested } },
      },
    ] as never;
  assert.throws(() => renderLessonDataFiles(bad({ retained: true, dropped: undefined })), /Non-JSON value/);
  assert.throws(() => renderLessonDataFiles(bad({ count: Number.POSITIVE_INFINITY })), /Non-JSON value/);
  assert.throws(() => renderLessonDataFiles(bad([, 'value'])), /Sparse Lesson array/);
  assert.throws(() => renderLessonDataFiles(bad({ nested: () => null })), /Non-JSON value/);
});

test('rejects an authored Lesson stub preview at the strict publication boundary', () => {
  const draft = defineLessonStub({ id, slug: 'lightLesson' });
  assert.equal(draft.build.data({ languages: ['en'] }).base.draft, true);
  assert.throws(
    () => renderLessonDataFiles([{ source: 'stub.ts', publication: draft.build.data({ languages: ['en'] }) }]),
    /Draft Lesson stub cannot be published/,
  );
});
