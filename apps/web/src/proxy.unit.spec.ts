import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { isInvalidPublishedRoute } from './proxy';

const courseId = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';
const lessonId = 'f760e7b7-9f77-5027-89ce-4e40d9d031a1';
const otherId = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
const retiredEpisodeId = '9f417177-1d07-5a9d-ad74-0146c5637e84';
const dirs: string[] = [];

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-proxy-route-'));
  dirs.push(root);
  const lessonDir = path.join(root, 'data', 'lessons', '1', lessonId);
  const courseDir = path.join(root, 'data', 'courses', courseId);
  mkdirSync(lessonDir, { recursive: true });
  mkdirSync(courseDir, { recursive: true });
  writeFileSync(path.join(lessonDir, 'base.json'), JSON.stringify({
    id: lessonId, type: 'lesson', params: { languages: ['en', 'uk'] },
  }));
  writeFileSync(path.join(courseDir, 'base.json'), JSON.stringify({
    id: courseId, type: 'course', params: { languages: ['en', 'uk'] },
    content: { order: ['lab'], items: {
      lab: { id: 'module', type: 'module', content: {
        order: ['intro'], items: { intro: { id: lessonId, type: 'lesson' } },
      } },
    } },
  }));
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
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/lesson/en/' + lessonId, root)).toBe(false);
    expect(isInvalidPublishedRoute('/uk/courses', root)).toBe(false);
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
    ]) expect(isInvalidPublishedRoute(invalid, root), invalid).toBe(true);
  });

  it('rejects absent Course members and obsolete Episode URLs before streaming starts', () => {
    const root = fixture();
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/lesson/uk/' + otherId, root)).toBe(true);
    expect(isInvalidPublishedRoute('/uk/course/' + otherId + '/lesson/uk/' + lessonId, root)).toBe(true);
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/episode/' + retiredEpisodeId, root)).toBe(true);
  });

  it('treats corrupt or incomplete publications as unavailable, not as a successful route', () => {
    const root = fixture();
    writeFileSync(path.join(root, 'data', 'courses', courseId, 'base.json'), '{not json');
    expect(isInvalidPublishedRoute('/uk/course/' + courseId + '/lesson/uk/' + lessonId, root)).toBe(true);
    expect(isInvalidPublishedRoute('/uk/lesson/uk/' + lessonId, root)).toBe(false);
    writeFileSync(path.join(root, 'data', 'lessons', '1', lessonId, 'base.json'), JSON.stringify({
      id: lessonId, type: 'lesson', params: { languages: ['en'] },
    }));
    expect(isInvalidPublishedRoute('/uk/lesson/uk/' + lessonId, root)).toBe(true);
  });
});
