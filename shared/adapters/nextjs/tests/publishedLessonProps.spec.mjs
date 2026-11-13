import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';

import { loadPublishedLessonProps } from '../dist/publishedLessonProps.js';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const otherId = '663572e7-bd85-4516-86e2-3de07d209e04';

function baseLesson(lessonId = id) {
  return {
    id: lessonId,
    slug: 'sampleLesson',
    type: 'lesson',
    skills: [],
    params: {
      requireQuiz: false,
      languages: ['en', 'uk'],
      sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
    },
    locale: { title: 'Invariant lesson' },
    section: [],
    flashcards: [],
  };
}

async function fixture(t, lesson = baseLesson(), locale = { locale: { title: 'Урок' } }) {
  const rootDirectory = await mkdtemp(path.join(tmpdir(), 'svitlo-lessons-'));
  t.after(() => rm(rootDirectory, { recursive: true, force: true }));
  const directory = path.join(rootDirectory, id.slice(-1), id);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'base.json'), JSON.stringify(lesson));
  if (locale !== null) await writeFile(path.join(directory, 'uk.json'), JSON.stringify(locale));
  return { rootDirectory, directory };
}

test('loads one UUID-bucketed base and the selected locale from an explicit root', async t => {
  const { rootDirectory } = await fixture(t);
  const data = await loadPublishedLessonProps({ rootDirectory, id, language: 'uk' });
  assert.equal(data.id, id);
  assert.equal(data.locale.title, 'Урок');
  assert.deepEqual(data.section, []);
});

test('allows a missing sparse locale file when invariant Props are complete', async t => {
  const { rootDirectory } = await fixture(t, baseLesson(), null);
  const data = await loadPublishedLessonProps({ rootDirectory, id, language: 'uk' });
  assert.equal(data.locale.title, 'Invariant lesson');
});

test('rejects missing base, malformed JSON and mismatched Lesson IDs', async t => {
  const { rootDirectory, directory } = await fixture(t);
  await rm(path.join(directory, 'base.json'));
  await assert.rejects(loadPublishedLessonProps({ rootDirectory, id, language: 'uk' }), /Unable to read/);

  await writeFile(path.join(directory, 'base.json'), JSON.stringify(baseLesson()));
  await writeFile(path.join(directory, 'uk.json'), '{bad-json');
  await assert.rejects(
    loadPublishedLessonProps({ rootDirectory, id, language: 'uk' }),
    /Malformed published Lesson JSON/,
  );

  await writeFile(path.join(directory, 'uk.json'), JSON.stringify({ locale: { title: 'Урок' } }));
  await writeFile(path.join(directory, 'base.json'), JSON.stringify(baseLesson(otherId)));
  await assert.rejects(loadPublishedLessonProps({ rootDirectory, id, language: 'uk' }), /ID does not match/);
});

test('rejects unsafe IDs and unsupported language requests', async t => {
  const { rootDirectory } = await fixture(t);
  await assert.rejects(loadPublishedLessonProps({ rootDirectory, id: '../outside', language: 'uk' }), /canonical UUID/);
  await assert.rejects(loadPublishedLessonProps({ rootDirectory, id, language: '../unsafe' }));
  await assert.rejects(
    loadPublishedLessonProps({ rootDirectory, id, language: 'pl' }),
    /does not support requested language/,
  );
});
