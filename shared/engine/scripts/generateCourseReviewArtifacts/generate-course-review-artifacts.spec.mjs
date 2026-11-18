import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import {
  discoverCourses, generateCourseReviewArtifacts, mergeCourseReview, renderCourseMarkdown,
} from './generate-course-review-artifacts.mjs';

const id = {
  course: '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67',
  module: 'b0fdbf9c-56d5-57ad-a1b4-19b8707e1481',
  chapter: 'a6435356-6632-51d9-84f3-d88c29e42ac8',
  episode: '7f88144d-3c6f-49fd-8e42-b0ab0b9be7bd',
  lesson: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1',
};
const lesson = {
  type: 'lesson', id: id.lesson, slug: 'standalone',
  locale: { title: 'SECRET LESSON TITLE' },
  section: [{ content: 'SECRET LESSON CONTENT' }],
  questions: ['SECRET QUESTION'], flashcards: ['SECRET FLASHCARD'],
};
const sample = () => ({
  type: 'course', id: id.course, slug: 'course',
  locale: { title: 'English course', description: 'A localized course' },
  content: [{
    type: 'module', id: id.module, slug: 'foundations',
    locale: { title: 'English module' }, content: [{
      type: 'chapter', id: id.chapter, slug: 'dayNight',
      locale: { title: 'English chapter' }, content: [
        lesson,
        { type: 'episode', id: id.episode, slug: 'story',
          locale: { title: 'English episode', description: 'Own story' },
          section: [{ type: 'content', locale: { title: 'English scene' },
            content: [{ type: 'markdown', locale: { value: 'Course-owned narrative' } }] }],
        },
      ],
    }],
  }],
});
test('merges locale objects and replaces nested arrays atomically', () => {
  const source = sample();
  const selected = mergeCourseReview(source, { locale: { title: 'Курс' },
    content: [{ ...source.content[0], locale: { title: 'Модуль' },
      content: [{ ...source.content[0].content[0], locale: { title: 'Розділ' },
        content: [lesson, { ...source.content[0].content[0].content[1],
          locale: { title: 'Епізод' } }] }] }] });
  assert.equal(selected.locale.title, 'Курс');
  assert.equal(selected.content[0].content[0].content[1].locale.title, 'Епізод');
  assert.equal(selected.content[0].content[0].locale.title, 'Розділ');
});
test('renders only Course-owned hierarchy/locale and Episode Sections, not standalone Lesson contents', () => {
  const markdown = renderCourseMarkdown({
    course: sample(), locale: 'en', packageName: 'content/math', sourceRef: 'a'.repeat(40),
  });
  for (const expected of ['English course', 'English module', 'English chapter',
    'English episode', 'English scene', 'Course-owned narrative', id.lesson]) {
    assert(markdown.includes(expected), expected);
  }
  for (const forbidden of ['SECRET LESSON TITLE', 'SECRET LESSON CONTENT',
    'SECRET QUESTION', 'SECRET FLASHCARD']) assert(!markdown.includes(forbidden), forbidden);
  const duplicated = sample();
  duplicated.content.push(sample().content[0]);
  assert.throws(() => renderCourseMarkdown({
    course: duplicated, locale: 'en', packageName: 'content/math', sourceRef: 'a'.repeat(40),
  }), /Duplicate Course-owned/);
});
test('generates exactly one localized Course artifact for selected UUID, preserving outside scopes', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-review-'));
  const owned = path.join(root, 'content/math/data/courses', id.course.slice(-1), id.course);
  const output = path.join(root, '.agent-ci-artifacts');
  const manifest = { sourceCommit: 'a'.repeat(40), generated: [], failures: [] };
  try {
    fs.mkdirSync(owned, { recursive: true });
    fs.mkdirSync(output);
    fs.writeFileSync(path.join(owned, 'index.ts'), "export const c = { id: '" + id.course + "' };\n");
    assert.equal(discoverCourses(root, 'content/math').length, 1);
    const fake = {
      id: id.course, type: 'course', config: { base: { params: { languages: ['en', 'uk'] } } },
      build: { props({ languages }) {
        return { base: sample(),
          locale: languages[0] === 'uk' ? { uk: { locale: { title: 'Український курс' } } } : {} };
      } },
    };
    const options = { root, output, manifest, saveManifest() {},
      packageName: 'content/math', courseId: id.course,
      supportedLanguages: ['uk', 'en', 'pl'], loader: async () => fake };
    const result = await generateCourseReviewArtifacts({ ...options, languages: ['uk'] });
    assert.equal(result.generated, 1);
    assert.deepEqual(manifest.generated.map(item => item.locale), ['uk']);
    assert.equal(manifest.generated[0].course, id.course.slice(-1) + '/' + id.course);
    const file = path.join(output, 'courses/math', id.course.slice(-1), id.course, 'uk.md');
    assert(fs.readFileSync(file, 'utf8').includes('Український курс'));
    assert(!fs.readFileSync(file, 'utf8').includes('SECRET LESSON CONTENT'));
    assert.equal(fs.readdirSync(path.dirname(file)).length, 1);
    assert.equal(fs.existsSync(path.join(output, 'lessons')), false);
    await generateCourseReviewArtifacts({ ...options, languages: ['pl'] });
    assert.equal(manifest.failures.at(-1).locale, 'pl');
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test('rejects symlinked Course catalog', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-review-safety-'));
  try {
    const dir = path.join(root, 'content/math/data/courses');
    fs.mkdirSync(dir, { recursive: true });
    fs.symlinkSync(os.tmpdir(), path.join(dir, 'shadow'));
    assert.throws(() => discoverCourses(root, 'content/math'), /Symlink/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
