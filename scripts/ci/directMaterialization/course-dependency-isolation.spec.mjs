import assert from 'node:assert/strict';
import test from 'node:test';
import { courseLessonReferences } from './course-dependency-isolation.mjs';

const id = '11111111-1111-4111-8111-111111111111';
const sha = 'a'.repeat(40);
const reuse = (sourceSha = sha) => ({
  config: { type: 'lesson', slug: 'first' },
  production: { kind: 'existing', existing: { id }, matching: { sourceSha }, sourceExportName: 'realLesson' },
});
test('Course default-branch Lesson dependency inventory is deterministic, de-duplicated and bounded', () => {
  const input = { config: { content: { items: { first: reuse(), second: reuse() }, order: ['first', 'second'] } } };
  assert.deepEqual(courseLessonReferences(input), [{ id, sourceSha: sha, exportName: 'realLesson' }]);
  assert.deepEqual(courseLessonReferences({ config: { content: { items: {}, order: [] } } }), []);
});
test('Course dependencies reject executable-path and source-SHA ambiguity before Docker', () => {
  for (const invalid of [
    reuse('x'.repeat(40)),
    { ...reuse(), production: { ...reuse().production, sourceExportName: '../evil' } },
    { ...reuse(), production: { ...reuse().production, existing: { id: '__proto__' } } },
  ]) assert.throws(() => courseLessonReferences(invalid), /Unsafe Course Lesson dependency/);
});
