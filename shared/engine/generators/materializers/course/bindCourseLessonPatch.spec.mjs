import assert from 'node:assert/strict';
import test from 'node:test';

import { bindCourseLessonPatch } from './bindCourseLessonPatch.mjs';

const lessonId = '1368c1c9-2fd8-4007-b2c8-6bbfd98d5111';
const sectionId = '263572e7-bd85-4516-86e2-3de07d209e21';
const sourceSha = 'a'.repeat(40);
const ref = () => ({
  $ref: 'lesson-section',
  lessonId,
  sectionId,
  sourceSha,
  exportName: 'practice',
});
const section = {
  id: sectionId,
  slug: 'practice',
  type: 'content',
  config: { base: { id: sectionId, slug: 'practice', type: 'content' } },
  build: { props: () => ({}), overrides: () => ({}) },
};
const patch = () => ({
  params: { sections: { allowSkipping: false } },
  section: {
    items: { intro: false },
    additionalItems: { practice: ref() },
    order: ['practice'],
  },
});
const resolveAddedSection = request => ({
  ...request,
  approved: true,
  configurator: section,
});

test('inert Section reference binds to approved Configurator without mutating reviewed patch', () => {
  const raw = patch();
  const result = bindCourseLessonPatch(raw, { resolveAddedSection, placementPath: 'content/chapter/practice' });
  assert.equal(result.patch.section.additionalItems.practice, section);
  assert.deepEqual(raw, patch());
  assert.deepEqual(result.patch.section.items, { intro: false });
  assert.deepEqual(result.patch.section.order, ['practice']);
  assert.match(result.patchSource, /"allowSkipping": false/);
  assert.match(result.patchSource, /"intro": false/);
  assert.match(result.patchSource, /"order": \["practice"\]/);
  assert.match(
    result.patchSource,
    /"additionalItems": \{"practice": added_section_content_chapter_practice_practice\}/,
  );
  assert.equal(result.imports.length, 1);
  assert.match(result.imports[0], /#lessonsData\/1\/1368c1c9-2fd8-4007-b2c8-6bbfd98d5111\/sections\/practice/);
  assert.equal(result.patchSource.includes('"$ref"'), false);
  assert.deepEqual(
    bindCourseLessonPatch(patch(), { resolveAddedSection, placementPath: 'content/chapter/practice' }),
    result,
  );
});

test('each Course placement has distinct aliases and independent patch bindings', () => {
  const first = bindCourseLessonPatch(patch(), { resolveAddedSection, placementPath: 'content/first' });
  const second = bindCourseLessonPatch(patch(), { resolveAddedSection, placementPath: 'content/second' });
  assert.notEqual(first.imports[0], second.imports[0]);
  assert.notEqual(first.patchSource, second.patchSource);
  assert.equal(first.patch.section.additionalItems.practice, second.patch.section.additionalItems.practice);
});

test('plain patches without additions need no Section dependency resolver', () => {
  const input = { section: { items: { intro: { locale: { title: { uk: 'Назва' } } } } } };
  const result = bindCourseLessonPatch(input, { placementPath: 'content/intro' });
  assert.deepEqual(result.patch, input);
  assert.deepEqual(result.imports, []);
  assert.match(result.patchSource, /Назва/);
});

test('reject untrusted, stale, missing or mismatched Section dependencies', () => {
  const context = { placementPath: 'content/practice' };
  assert.throws(() => bindCourseLessonPatch(patch(), context), /trusted additional Section resolver/);
  assert.throws(
    () =>
      bindCourseLessonPatch(patch(), {
        ...context,
        resolveAddedSection: () => ({ ...resolveAddedSection({}), approved: false }),
      }),
    /unapproved/,
  );
  assert.throws(
    () =>
      bindCourseLessonPatch(patch(), {
        ...context,
        resolveAddedSection: request => ({ ...resolveAddedSection(request), sourceSha: 'b'.repeat(40) }),
      }),
    /stale|mismatched/,
  );
  assert.throws(
    () =>
      bindCourseLessonPatch(patch(), {
        ...context,
        resolveAddedSection: request => ({
          ...resolveAddedSection(request),
          configurator: { ...section, id: lessonId },
        }),
      }),
    /invalid Configurator identity/,
  );
});

test('reject malformed additions, dangerous keys and executable payloads', () => {
  for (const bad of [
    { ...ref(), extra: true },
    { ...ref(), sourceSha: 'not-a-sha' },
    { ...ref(), lessonId: '../../../other' },
    { ...ref(), exportName: 'constructor' },
    { ...ref(), $ref: 'runtime-import' },
  ]) {
    const input = patch();
    input.section.additionalItems.practice = bad;
    assert.throws(
      () => bindCourseLessonPatch(input, { resolveAddedSection, placementPath: 'content/test' }),
      /invalid declarative Section reference/,
    );
  }
  const malicious = { section: { additionalItems: JSON.parse('{"__proto__":{}}') } };
  assert.throws(
    () => bindCourseLessonPatch(malicious, { resolveAddedSection, placementPath: 'content/test' }),
    /invalid declarative Section reference/,
  );
  assert.throws(
    () => bindCourseLessonPatch({ params: { unsafe: () => 123 } }, { placementPath: 'content/test' }),
    /unsafe Course Lesson patch serialization/,
  );
});
