import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';

import { loadPublishedCourseLessonProps } from '../dist/publishedCourseLesson.js';

const lessonId = '663572e7-bd85-4516-86e2-3de07d209e03';
const courseId = '663572e7-bd85-4516-86e2-3de07d209e04';

const lesson = () => ({
  id: lessonId,
  slug: 'sampleLesson',
  type: 'lesson',
  skills: [],
  params: {
    requireQuiz: false,
    languages: ['uk', 'en'],
    sections: { allowNavigation: true, allowSkipping: true, showIndexes: false },
  },
  locale: { title: 'Lesson title' },
  section: [],
  flashcards: [],
});

const course = () => ({
  id: courseId,
  type: 'course',
  params: { languages: ['uk', 'en'] },
  content: {
    items: { sampleLesson: { id: lessonId, type: 'lesson', overrides: { locale: { title: 'Course invariant' } } } },
    order: ['sampleLesson'],
  },
});

async function setup(t, { withCourseLocale = true } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'svitlo-course-lesson-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const lessonsRoot = path.join(root, 'data', 'lessons');
  const coursesRoot = path.join(root, 'data', 'courses');
  const lessonDir = path.join(lessonsRoot, lessonId.slice(-1), lessonId);
  const courseDir = path.join(coursesRoot, courseId);
  await Promise.all([mkdir(lessonDir, { recursive: true }), mkdir(courseDir, { recursive: true })]);
  await Promise.all([
    writeFile(path.join(lessonDir, 'base.json'), JSON.stringify(lesson())),
    writeFile(path.join(lessonDir, 'uk.json'), JSON.stringify({ locale: { title: 'Назва уроку' } })),
    writeFile(path.join(courseDir, 'base.json'), JSON.stringify(course())),
  ]);
  if (withCourseLocale) {
    await writeFile(
      path.join(courseDir, 'uk.json'),
      JSON.stringify({
        content: { items: { sampleLesson: { overrides: { locale: { title: 'Назва програми' } } } } },
      }),
    );
  }
  return { lessonsRoot, coursesRoot, lessonDir, courseDir };
}

test('loads both publications and applies selected Course locale after Lesson locale', async t => {
  const roots = await setup(t);
  const result = await loadPublishedCourseLessonProps(courseId, lessonId, 'uk', roots);
  assert.equal(result.id, lessonId);
  assert.equal(result.locale.title, 'Назва програми');
  assert.equal(result.params.sections.allowNavigation, true);
});

test('missing Course locale applies the invariant override after the standalone locale', async t => {
  const roots = await setup(t, { withCourseLocale: false });
  const result = await loadPublishedCourseLessonProps(courseId, lessonId, 'uk', roots);
  assert.equal(result.locale.title, 'Course invariant');
});

test('Course with no overrides returns the localized standalone Lesson', async t => {
  const roots = await setup(t, { withCourseLocale: false });
  await writeFile(
    path.join(roots.courseDir, 'base.json'),
    JSON.stringify({
      ...course(),
      content: { items: { sampleLesson: { type: 'lesson', id: lessonId } }, order: ['sampleLesson'] },
    }),
  );
  const result = await loadPublishedCourseLessonProps(courseId, lessonId, 'uk', roots);
  assert.equal(result.locale.title, 'Назва уроку');
});

test('rejects missing and malformed Course JSON and mismatched publication IDs', async t => {
  const roots = await setup(t);
  await rm(path.join(roots.courseDir, 'base.json'));
  await assert.rejects(
    loadPublishedCourseLessonProps(courseId, lessonId, 'uk', roots),
    /Cannot read published resource/,
  );

  await writeFile(path.join(roots.courseDir, 'base.json'), '{not-json');
  await assert.rejects(loadPublishedCourseLessonProps(courseId, lessonId, 'uk', roots), /Invalid published JSON/);

  await writeFile(path.join(roots.courseDir, 'base.json'), JSON.stringify({ ...course(), id: lessonId }));
  await assert.rejects(
    loadPublishedCourseLessonProps(courseId, lessonId, 'uk', roots),
    /Course publication ID mismatch/,
  );
});

test('rejects invalid language and unsafe IDs before reading files', async t => {
  const roots = await setup(t);
  await assert.rejects(loadPublishedCourseLessonProps(courseId, lessonId, '../outside', roots));
  await assert.rejects(loadPublishedCourseLessonProps('../outside', lessonId, 'uk', roots));
  await assert.rejects(loadPublishedCourseLessonProps(courseId, '../outside', 'uk', roots));
});
