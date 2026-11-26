import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { loadCourseDetail } from './courseDetail';

vi.mock('server-only', () => ({}));

const courseId = '11111111-1111-4111-8111-000000000113';
const unrelatedId = '11111111-1111-4111-8111-000000000114';
let root: string;
let courses: string;

function published(id: string, source: unknown) {
  const directory = join(courses, id);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, 'base.json'), JSON.stringify(source));
  if (id === courseId) {
    const record = source as ReturnType<typeof fixture>;
    const tocDir = join(directory, 'toc');
    mkdirSync(tocDir, { recursive: true });
    writeFileSync(join(tocDir, 'base.json'), JSON.stringify({
      id, type: 'course', languages: record.params.languages, label: record.locale.title,
      content: { items: {}, order: [] },
    }));
  }
}
function fixture(languages: string[] = ['en']) {
  return {
    id: courseId,
    type: 'course',
    params: { languages },
    locale: { title: 'Selected Course' },
    content: { items: {}, order: [] },
  };
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'svitlo-direct-course-'));
  courses = join(root, 'public/data/courses');
  vi.spyOn(process, 'cwd').mockReturnValue(root);
});
afterEach(() => {
  vi.restoreAllMocks();
  rmSync(root, { recursive: true, force: true });
});

it('loads a real requested publication despite unrelated empty and malformed UUID directories', async () => {
  published(courseId, fixture());
  mkdirSync(join(courses, unrelatedId), { recursive: true });
  await expect(loadCourseDetail(courseId, 'en')).resolves.toMatchObject({
    course: { id: courseId, title: 'Selected Course' },
    outline: [],
  });
  writeFileSync(join(courses, unrelatedId, 'base.json'), '{broken sibling');
  await expect(loadCourseDetail(courseId, 'en')).resolves.toMatchObject({
    course: { id: courseId, title: 'Selected Course' },
  });
});

it('distinguishes missing, unsupported-locale, and corrupt requested Course resources', async () => {
  await expect(loadCourseDetail(courseId, 'en')).resolves.toBeNull();
  published(courseId, fixture(['uk']));
  await expect(loadCourseDetail(courseId, 'en')).resolves.toMatchObject({
    course: { id: courseId, title: 'Selected Course' },
    contentLanguage: 'uk',
    interfaceLanguage: 'en',
  });
  writeFileSync(join(courses, courseId, 'base.json'), '{broken requested');
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Invalid published JSON');
});

it('does not use an alternate Course locale when the declared requested translation is corrupt', async () => {
  published(courseId, fixture(['en', 'uk']));
  writeFileSync(join(courses, courseId, 'en.json'), '{broken requested translation');
  writeFileSync(join(courses, courseId, 'uk.json'), JSON.stringify({ locale: { title: 'Valid alternative' } }));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Invalid published JSON');
});

it('uses the selected content language for the TOC and UI-language activity links', async () => {
  const lessonId = '11111111-1111-4111-8111-00000000011c';
  const data = {
    ...fixture(['uk']),
    content: { order: ['first'], items: { first: { type: 'lesson', id: lessonId } } },
  };
  published(courseId, data);
  const toc = join(courses, courseId, 'toc');
  writeFileSync(join(toc, 'base.json'), JSON.stringify({
    id: courseId, type: 'course', languages: ['uk'], label: 'Invariant title',
    content: { order: ['first'], items: { first: { type: 'lesson', id: lessonId, label: 'Invariant Lesson' } } },
  }));
  writeFileSync(join(toc, 'uk.json'), JSON.stringify({
    label: 'Український курс',
    content: { items: { first: { label: 'Контрольний урок' } } },
  }));
  const detail = await loadCourseDetail(courseId, 'en');
  expect(detail?.contentLanguage).toBe('uk');
  expect(detail?.interfaceLanguage).toBe('en');
  expect(detail?.outline).toMatchObject([
    { title: 'Контрольний урок', href: '/en/course/' + courseId + '/lesson/uk/' + lessonId },
  ]);
});

it('reports missing and malformed requested TOC as publication errors, never as a 404', async () => {
  published(courseId, fixture());
  const file = join(courses, courseId, 'toc/base.json');
  rmSync(file);
  await expect(loadCourseDetail(courseId, 'en')).rejects.toMatchObject({ code: 'missing', resourcePath: file });
  writeFileSync(file, '{broken');
  await expect(loadCourseDetail(courseId, 'en')).rejects.toMatchObject({ code: 'invalid-json', resourcePath: file });
});

it('rejects a TOC published for a different Course UUID or a missing selected language', async () => {
  published(courseId, fixture(['en']));
  const file = join(courses, courseId, 'toc/base.json');
  writeFileSync(file, JSON.stringify({
    id: unrelatedId, type: 'course', languages: ['en'], label: 'Wrong Course',
    content: { items: {}, order: [] },
  }));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow(/TOC ID or requested language mismatch/);
  writeFileSync(file, JSON.stringify({
    id: courseId, type: 'course', languages: ['uk'], label: 'Wrong languages',
    content: { items: {}, order: [] },
  }));
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow(/TOC ID or requested language mismatch/);
});
