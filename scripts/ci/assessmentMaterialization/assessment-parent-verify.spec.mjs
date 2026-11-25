import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyPendingCourseParent } from '../directMaterialization/reserved-parent-slot.mjs';

const id = 'a73572e7-bd85-4516-86e2-3de07d209e03';
const slug = 'review';
const stubSource =
  "import { defineAssessmentStub } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Coding Agent integrates after validating the completed Assessment.\n' +
  'export const stub = defineAssessmentStub({ id: ' +
  JSON.stringify(id) +
  ', slug: "review" });\n';
const importLine = 'import { stub as child_review } from "./review/stub";\n';
const source =
  "import { defineModule } from '@svitlo/engine/build';\n" +
  importLine +
  'const content = { items: { "before": child_before, "review": child_review }, order: ["before", "review"] };\n' +
  'export const moduleOne = defineModule({ content });\n';
const validSource = source.replace(
  'const content',
  'import { before as child_before } from "./before";\nconst content',
);
const allocation = {
  kind: 'assessment',
  id,
  slug,
  placement: 'moduleOne/review',
  stubSource,
};

test('Assessment preserves an exact pending Course slot without mutating parent', () => {
  assert.equal(verifyPendingCourseParent(validSource, allocation), true);
  assert.ok(validSource.includes(importLine));
  assert.match(validSource, /order: \["before", "review"\]/);
});

test('Assessment read-only validation rejects foreign parent/UUID/stub and malformed content', () => {
  assert.throws(() =>
    verifyPendingCourseParent(validSource, { ...allocation, id: 'a73572e7-bd85-4516-86e2-3de07d209e04' }),
  );
  assert.throws(() =>
    verifyPendingCourseParent(validSource, { ...allocation, placement: 'content/moduleOne/content/other' }),
  );
  assert.throws(() =>
    verifyPendingCourseParent(validSource, {
      ...allocation,
      stubSource: stubSource.replace(JSON.stringify(id), JSON.stringify('a73572e7-bd85-4516-86e2-3de07d209e04')),
    }),
  );
  for (const edited of [
    validSource.replace('stub as child_review', 'stub as child_foreign'),
    validSource.replace('"review": child_review', '"review": child_before'),
    validSource.replace('["before", "review"]', '["review", "review"]'),
    validSource.replace('const content', 'const unexpected = 1;\nconst content'),
  ])
    assert.throws(() => verifyPendingCourseParent(edited, allocation));
});
