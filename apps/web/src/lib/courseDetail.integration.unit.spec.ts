import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
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
  await expect(loadCourseDetail(courseId, 'en')).resolves.toBeNull();
  writeFileSync(join(courses, courseId, 'base.json'), '{broken requested');
  await expect(loadCourseDetail(courseId, 'en')).rejects.toThrow('Invalid published JSON');
});
