import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { defineLesson } from '../../configurators/lessons/defineLesson/defineLesson';
import { writeLessonFiles } from '../../utils/generators/lessons/generateLessons.utils';
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

test('writes a complete publication atomically and clears stale files', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-props-lessons-'));
  const output = path.join(root, 'generated', 'lessons');
  try {
    const files = renderLessonPropsFiles([entry()]);
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(output, 'stale.json'), '{}');
    writeLessonFiles(output, files);
    assert.equal(fs.existsSync(path.join(output, 'stale.json')), false);
    assert.equal(fs.readFileSync(path.join(output, relative, 'uk.json'), 'utf8'), files.get(relative + '/uk.json'));
    writeLessonFiles(output, files);
    assert.equal(fs.readFileSync(path.join(output, relative, 'base.json'), 'utf8'), files.get(relative + '/base.json'));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
