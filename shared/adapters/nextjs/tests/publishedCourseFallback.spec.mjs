import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  CourseLanguageUnavailableError,
  PublishedResourceError,
  loadPublishedCourseTree,
  loadPublishedCourseTreeWithFallback,
} from '../dist/publishedCourseLesson.js';

const id = '11111111-1111-4111-8111-000000000113';
async function setup(t, languages = ['uk', 'qm']) {
  const root = await mkdtemp(path.join(tmpdir(), 'svitlo-course-fallback-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const course = path.join(root, id);
  await mkdir(course, { recursive: true });
  await writeFile(path.join(course, 'base.json'), JSON.stringify({
    id,
    type: 'course',
    params: { languages },
    locale: { title: 'Base title' },
    content: { order: [], items: {} },
  }));
  return { root, course };
}

test('deterministically selects an actually published Course locale, without assuming English', async t => {
  const { root, course } = await setup(t, ['qm', 'uk']);
  await writeFile(path.join(course, 'uk.json'), JSON.stringify({ locale: { title: 'Українська назва' } }));
  const result = await loadPublishedCourseTreeWithFallback(id, 'pl', root);
  assert.equal(result.contentLanguage, 'uk');
  assert.equal(result.course.locale.title, 'Українська назва');
  assert.equal(result.course.id, id);
});

test('falls back to the first declared language when all published locales use invariant base-only Props', async t => {
  const { root } = await setup(t, ['qm']);
  const result = await loadPublishedCourseTreeWithFallback(id, 'pl', root);
  assert.equal(result.contentLanguage, 'qm');
  assert.equal(result.course.locale.title, 'Base title');
});

test('does not fallback when the requested language is declared but its translation is invalid', async t => {
  const { root, course } = await setup(t, ['uk', 'qm']);
  await writeFile(path.join(course, 'uk.json'), '{invalid translation');
  await writeFile(path.join(course, 'qm.json'), JSON.stringify({ locale: { title: 'Other locale' } }));
  await assert.rejects(loadPublishedCourseTreeWithFallback(id, 'uk', root), error =>
    error instanceof PublishedResourceError && error.code === 'invalid-json' && error.resourcePath.endsWith('uk.json'),
  );
});

test('reports missing base and read errors with structured adapter codes', async t => {
  const { root, course } = await setup(t);
  await rm(path.join(course, 'base.json'));
  await assert.rejects(loadPublishedCourseTreeWithFallback(id, 'pl', root), error =>
    error instanceof PublishedResourceError && error.code === 'missing' && error.resourcePath.endsWith('base.json'),
  );
});

test('explicit activity language loader reports unsupported Course locale through a typed error', async t => {
  const { root } = await setup(t, ['uk', 'qm']);
  await assert.rejects(loadPublishedCourseTree(id, 'pl', root), error =>
    error instanceof CourseLanguageUnavailableError && error.code === 'course-language-unavailable',
  );
});

test('does not mask a corrupt Course identity as an unavailable content locale', async t => {
  const { root, course } = await setup(t, ['uk']);
  await writeFile(path.join(course, 'base.json'), JSON.stringify({
    id: '11111111-1111-4111-8111-000000000114',
    type: 'course',
    params: { languages: ['uk'] },
    locale: { title: 'Corrupt' },
    content: { order: [], items: {} },
  }));
  await assert.rejects(loadPublishedCourseTree(id, 'pl', root), /Published Course identity mismatch/);
  await assert.rejects(loadPublishedCourseTreeWithFallback(id, 'pl', root), /Published Course identity mismatch/);
});
