import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyPendingCourseParent } from '../directMaterialization/reserved-parent-slot.mjs';

const id = 'a73572e7-bd85-4516-86e2-3de07d209e03';
const slug = 'review';
const stubSource =
  "import { defineAssessmentStub } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Coding Agent integrates after validating the completed Assessment.\n' +
  'export const review = defineAssessmentStub({ id: ' +
  JSON.stringify(id) +
  ', slug: "review" });\n';
const importLine = 'import { review } from "./review/stub";\n';
const validSource =
  "import { defineModule } from '@svitlo/engine/build';\n" +
  'import { before } from "./before";\n' +
  importLine +
  'const __placements = { before, review };\n' +
  'export const moduleOne = defineModule({ children: ["before", "review"], ...__placements });\n';
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
  assert.match(validSource, /children: \["before", "review"\]/);
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
    validSource.replace('import { review }', 'import { foreign }'),
    validSource.replace('review', 'review: before'),
    validSource.replace('["before", "review"]', '["review", "review"]'),
    validSource.replace('const __placements', 'const unexpected = 1;\nconst __placements'),
  ])
    assert.throws(() => verifyPendingCourseParent(edited, allocation));
});
