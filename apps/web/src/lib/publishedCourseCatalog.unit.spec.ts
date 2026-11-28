import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { loadPublishedCourseCatalog } from './publishedCourseCatalog';

const resources = vi.hoisted(() => ({ tree: vi.fn() }));
vi.mock('server-only', () => ({}));
vi.mock('./courseResources', () => ({ loadCourseTree: resources.tree }));

const selectedId = '11111111-1111-4111-8111-000000000113';
const orphanId = '11111111-1111-4111-8111-000000000114';
let temporary: string;
let coursesRoot: string;

function directory(id: string) {
  const path = join(coursesRoot, id);
  mkdirSync(path, { recursive: true });
  return path;
}
function base(id: string, languages: string[] = ['en', 'uk']) {
  writeFileSync(join(directory(id), 'base.json'), JSON.stringify({ id, type: 'course', params: { languages } }));
}
function legacyManifest(id: string) {
  const root = join(temporary, 'public/.svitlo');
  mkdirSync(root, { recursive: true });
  writeFileSync(
    join(root, 'publish-web-fixture-alpha.json'),
    JSON.stringify({ version: 1, textbook: 'web-fixture-alpha', files: ['data/courses/' + id + '/base.json'] }),
  );
}

beforeEach(() => {
  temporary = mkdtempSync(join(tmpdir(), 'svitlo-catalog-'));
  coursesRoot = join(temporary, 'public/data/courses');
  vi.spyOn(process, 'cwd').mockReturnValue(temporary);
  resources.tree.mockImplementation(async (id: string) => ({
    id,
    type: 'course',
    params: { languages: ['en', 'uk'] },
    locale: { title: 'Published ' + id },
    children: [],
  }));
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  rmSync(temporary, { recursive: true, force: true });
});

it('ignores genuinely empty UUID directories and enumerates valid published Courses', async () => {
  directory(orphanId);
  base(selectedId);
  const catalog = await loadPublishedCourseCatalog('en');
  expect(catalog).toHaveLength(1);
  expect(catalog[0]).toMatchObject({ id: selectedId, title: 'Published ' + selectedId });
  expect(resources.tree).toHaveBeenCalledTimes(1);
  expect(resources.tree).toHaveBeenCalledWith(selectedId, 'en');
});

it('respects language filtering without assembling a Course in a non-declared locale', async () => {
  base(selectedId, ['uk']);
  directory(orphanId);
  expect(await loadPublishedCourseCatalog('en')).toEqual([]);
  expect(resources.tree).not.toHaveBeenCalled();
  expect(await loadPublishedCourseCatalog('uk')).toHaveLength(1);
});

it('rejects malformed published bases and incomplete localized publications', async () => {
  base(selectedId);
  writeFileSync(join(directory(orphanId), 'base.json'), '{not-json');
  await expect(loadPublishedCourseCatalog('en')).rejects.toThrow();
  rmSync(join(directory(orphanId), 'base.json'));
  writeFileSync(join(directory(orphanId), 'en.json'), '{}');
  await expect(loadPublishedCourseCatalog('en')).rejects.toThrow('Missing Course publication base');
});

it('surfaces incomplete nonempty directories even without a base resource', async () => {
  directory(selectedId);
  writeFileSync(join(directory(selectedId), 'unowned.txt'), 'not empty');
  await expect(loadPublishedCourseCatalog('en')).rejects.toThrow('Missing Course publication base');
});

it('rejects invalid Course identity and structurally invalid published language lists', async () => {
  directory(selectedId);
  writeFileSync(join(directory(selectedId), 'base.json'), JSON.stringify({ id: orphanId, type: 'course' }));
  await expect(loadPublishedCourseCatalog('en')).rejects.toThrow('Invalid Course publication identity');
  writeFileSync(
    join(directory(selectedId), 'base.json'),
    JSON.stringify({ id: selectedId, type: 'course', params: {} }),
  );
  await expect(loadPublishedCourseCatalog('en')).rejects.toThrow('Invalid Course publication languages');
});

it('returns an empty catalog when the Course publication directory does not exist', async () => {
  expect(await loadPublishedCourseCatalog('en')).toEqual([]);
});

it('never reads build-time ownership manifests at runtime', async () => {
  base(selectedId);
  legacyManifest(orphanId);
  expect((await loadPublishedCourseCatalog('en')).map(course => course.id)).toEqual([selectedId]);
  // Deliberately malformed manifest must have no effect on the runtime catalog.
  writeFileSync(join(temporary, 'public/.svitlo/publish-web-fixture-alpha.json'), '{not json');
  expect((await loadPublishedCourseCatalog('en')).map(course => course.id)).toEqual([selectedId]);
});

it('surfaces stale-but-present malformed Course files without an ownership registry', async () => {
  base(selectedId);
  writeFileSync(join(directory(orphanId), 'base.json'), '{old broken publication');
  legacyManifest(selectedId);
  await expect(loadPublishedCourseCatalog('en')).rejects.toThrow();
});
