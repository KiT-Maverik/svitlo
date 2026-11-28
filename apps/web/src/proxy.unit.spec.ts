import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { isInvalidPublishedRoute } from './proxy';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const otherId = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
const episodeId = '11111111-1111-4111-8111-000000000141';
const retiredEpisodeId = '9f417177-1d07-5a9d-ad74-0146c5637e84';
const dirs: string[] = [];

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-proxy-route-'));
  dirs.push(root);
  const lessonDir = path.join(root, 'data', 'lessons', '1', lessonId);
  const courseDir = path.join(root, 'data', 'courses', courseId);
  mkdirSync(lessonDir, { recursive: true });
  mkdirSync(courseDir, { recursive: true });
  writeFileSync(
    path.join(lessonDir, 'base.json'),
    JSON.stringify({
      id: lessonId,
      type: 'lesson',
      params: { languages: ['en', 'uk'] },
    }),
  );
  writeFileSync(
    path.join(courseDir, 'base.json'),
    JSON.stringify({
      id: courseId,
      type: 'course',
      params: { languages: ['en', 'uk'] },
      children: ['lab'],
      lab: {
        id: '11111111-1111-4111-8111-000000000142',
        type: 'module',
        slug: 'lab',
        children: ['intro', 'story'],
        intro: { id: lessonId, type: 'lesson' },
        story: { id: episodeId, type: 'episode', params: { languages: ['uk'] } },
      },
    }),
  );
  return root;
}

afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe('HTTP status preflight for streamed educational routes', () => {
  it('preserves existing standalone, legacy redirect, and Course lesson routes', () => {
    const root = fixture();
    expect(isInvalidPublishedRoute('/uk/lesson/uk/' + lessonId, root)).toBe(false);
    expect(isInvalidPublishedRoute('/en/lesson/uk/' + lessonId, root)).toBe(false);
    expect(isInvalidPublishedRoute('/uk/lesson/' + lessonId, root)).toBe(false);
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/lesson/en/lab/intro', root)).toBe(false);
    expect(isInvalidPublishedRoute('/uk/courses', root)).toBe(false);
    expect(isInvalidPublishedRoute('/uk/course/' + courseId, root)).toBe(false);
  });

  it('returns a real 404 for unsupported language codes and unknown Lessons', () => {
    const root = fixture();
    for (const invalid of [
      '/xx/lesson/uk/' + lessonId,
      '/uk/lesson/xx/' + lessonId,
      '/xx/lesson/' + lessonId,
      '/uk/lesson/uk/' + otherId,
      '/uk/lesson/' + otherId,
      '/uk/lesson/not-a-uuid',
      '/topics/light',
      '/topics/demo',
      '/lesson/' + lessonId,
    ])
      expect(isInvalidPublishedRoute(invalid, root), invalid).toBe(true);
  });

  it('rejects absent Course members and obsolete Episode URLs before streaming starts', () => {
    const root = fixture();
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/lesson/uk/lab/missing', root)).toBe(true);
    expect(isInvalidPublishedRoute('/uk/course/' + otherId + '/lesson/uk/lab/intro', root)).toBe(true);
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/episode/' + retiredEpisodeId, root)).toBe(true);
  });

  it('treats corrupt or incomplete publications as unavailable, not as a successful route', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'data', 'courses', courseId, 'base.json'), '{not json');
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/lesson/uk/lab/intro', root)).toBe(true);
    expect(isInvalidPublishedRoute('/uk/lesson/uk/' + lessonId, root)).toBe(false);
    writeFileSync(
      path.join(root, 'data', 'lessons', '1', lessonId, 'base.json'),
      JSON.stringify({
        id: lessonId,
        type: 'lesson',
        params: { languages: ['en'] },
      }),
    );
    expect(isInvalidPublishedRoute('/uk/lesson/uk/' + lessonId, root)).toBe(true);
  });
});

it('admits only canonical localized Episode routes for actual Course members', () => {
  const root = fixture();
  expect(isInvalidPublishedRoute('/en/course/' + courseId + '/episode/uk/lab/story', root)).toBe(false);
  for (const route of [
    '/uk/course/' + courseId + '/episode/en/lab/story',
    '/uk/course/' + courseId + '/episode/uk/lab/missing',
    '/uk/course/' + otherId + '/episode/uk/lab/story',
    '/xx/course/' + courseId + '/episode/uk/lab/story',
    '/uk/course/' + courseId + '/episode/xx/lab/story',
    '/uk/course/' + courseId + '/episode/lab/story',
  ])
    expect(isInvalidPublishedRoute(route, root), route).toBe(true);
});

it('rejects unsafe, unordered, misplaced and wrong-kind Course paths without scanning siblings', () => {
  const root = fixture();
  const prefix = '/uk/course/' + courseId;
  for (const route of [
    prefix + '/lesson/uk/intro',
    prefix + '/lesson/uk/lab/story',
    prefix + '/episode/uk/lab/intro',
    prefix + '/lesson/uk/lab/intro/extra',
    prefix + '/lesson/uk/lab/constructor',
    prefix + '/lesson/uk/lab/%2e%2e',
    prefix + '/lesson/uk/lab',
    prefix + '/episode/uk/lab/missing',
  ])
    expect(isInvalidPublishedRoute(route, root), route).toBe(true);
});

it('preflights direct Course URLs without reading unrelated or corrupt Course content', () => {
  const root = fixture();
  const orphan = path.join(root, 'data', 'courses', otherId);
  mkdirSync(orphan, { recursive: true });
  expect(isInvalidPublishedRoute('/uk/course/' + courseId, root)).toBe(false);
  writeFileSync(path.join(orphan, 'base.json'), '{malformed unrelated publication');
  expect(isInvalidPublishedRoute('/uk/course/' + courseId, root)).toBe(false);

  // Malformed requested JSON must be handled by the Course loader, not masked as a 404.
  writeFileSync(path.join(root, 'data', 'courses', courseId, 'base.json'), '{malformed requested publication');
  expect(isInvalidPublishedRoute('/uk/course/' + courseId, root)).toBe(false);
});

it('rejects invalid or missing Course details with an HTTP 404 before streaming', () => {
  const root = fixture();
  for (const invalid of ['/uk/course/not-a-uuid', '/xx/course/' + courseId, '/uk/course/' + otherId])
    expect(isInvalidPublishedRoute(invalid, root), invalid).toBe(true);
  rmSync(path.join(root, 'data', 'courses', courseId, 'base.json'));
  expect(isInvalidPublishedRoute('/uk/course/' + courseId, root)).toBe(true);
});

it('allows a supported interface language whose Course content locale is not declared', () => {
  const root = fixture();
  expect(isInvalidPublishedRoute('/pl/course/' + courseId, root)).toBe(false);
  expect(isInvalidPublishedRoute('/ar/course/' + courseId, root)).toBe(false);
});
