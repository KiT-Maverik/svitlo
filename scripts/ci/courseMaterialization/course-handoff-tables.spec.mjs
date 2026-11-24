import test from 'node:test';
import assert from 'node:assert/strict';
import { reconcileCourseHandoffTables } from './course-handoff-tables.mjs';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const lesson = {
  type: 'lesson',
  id,
  placementPath: 'content/book/data/courses/3/' + id + '/content/module/lesson',
  orderPath: [0, 0],
  kind: 'new',
  sourcePath: 'content/book/data/lessons/3/' + id + '/draft.ts',
  status: 'pending-lesson-stage1',
};
const episode = {
  ...lesson,
  type: 'episode',
  placementPath: 'content/book/data/courses/3/' + id + '/content/episode',
  sourcePath: 'content/book/data/courses/3/' + id + '/content/episode/draft.ts',
  orderPath: [1],
  status: 'pending-episode-scenario',
};
const inventory = {
  lessons: [
    lesson,
    {
      ...lesson,
      placementPath: lesson.placementPath + 'Again',
      orderPath: [0, 1],
      kind: 'reused',
      status: 'verified-reference',
    },
  ],
  episodes: [episode],
};
test('separate ordered inventories are idempotent and preserve owner-authored text', () => {
  const body = '## Owner\n- [x] Methodology\nReview evidence';
  const result = reconcileCourseHandoffTables(body, inventory);
  assert.ok(result.startsWith(body + '\n\n'));
  assert.match(result, /### Lessons/);
  assert.match(result, /### Episodes/);
  assert.match(result, /1\.2 \| reused/);
  assert.equal(reconcileCourseHandoffTables(result, inventory), result);
});
test('manual status, child PR, next action and evidence stay attached to the exact placement', () => {
  const first = reconcileCourseHandoffTables('Owner', inventory);
  const edited = first.replace(
    'pending-lesson-stage1 | — | Authorize Lesson Stage 1 | —',
    'Stage 2 | #900 | Review | SHA abc',
  );
  const result = reconcileCourseHandoffTables(edited, { ...inventory, lessons: [...inventory.lessons].reverse() });
  assert.match(result, /1\.1 \| new \| .* \| Stage 2 \| #900 \| Review \| SHA abc/);
  assert.match(result, /1\.2 \| reused \| .* \| verified-reference \| —/);
});
test('rejects damaged blocks, duplicate placements, unsafe paths and dropped handoffs', () => {
  const first = reconcileCourseHandoffTables('Owner', inventory);
  assert.throws(() =>
    reconcileCourseHandoffTables(first.replace('<!-- svitlo-course-lessons:v1:end -->', ''), inventory),
  );
  assert.throws(() => reconcileCourseHandoffTables(first, { ...inventory, lessons: [] }));
  assert.throws(() => reconcileCourseHandoffTables('', { ...inventory, lessons: [lesson, lesson] }));
  assert.throws(() =>
    reconcileCourseHandoffTables('', { ...inventory, lessons: [{ ...lesson, sourcePath: '../outside.ts' }] }),
  );
});

const assessment = {
  ...lesson,
  type: 'assessment',
  id: 'a73572e7-bd85-4516-86e2-3de07d209e03',
  placementPath: 'content/book/data/courses/3/' + id + '/content/module/content/finalAssessment',
  sourcePath: 'content/book/data/courses/3/' + id + '/content/module/content/finalAssessment/draft.ts',
  orderPath: [0, 2],
  kind: 'new',
  status: 'pending-assessment-design',
  lessonDependencies: ['content/module/lesson', 'content/otherLesson'],
};
test('Assessment table includes nested placement, dependencies, status and preserved manual review', () => {
  const initial = reconcileCourseHandoffTables('## Workflow\n- [ ] 7. Design Assessments', {
    ...inventory,
    assessments: [assessment],
  });
  assert.match(initial, /### Assessments/);
  assert.match(initial, /Lesson dependencies/);
  assert.match(initial, /content\/module\/lesson, content\/otherLesson/);
  assert.match(initial, /Authorize Assessment Stage 1/);
  assert.match(initial, /- \[ \] 7\. Design Assessments/);
  const edited = initial.replace(
    'pending-assessment-design | — | Authorize Assessment Stage 1 | —',
    'Stage 2 reviewed | #901 | Materialize | SHA verified',
  );
  const again = reconcileCourseHandoffTables(edited, { ...inventory, assessments: [assessment] });
  assert.match(again, /Stage 2 reviewed \| #901 \| Materialize \| SHA verified/);
  assert.equal(reconcileCourseHandoffTables(again, { ...inventory, assessments: [assessment] }), again);
  assert.throws(() => reconcileCourseHandoffTables(again, { ...inventory, assessments: [] }), /missing/);
  assert.throws(
    () =>
      reconcileCourseHandoffTables('', {
        ...inventory,
        assessments: [{ ...assessment, lessonDependencies: ['../outside'] }],
      }),
    /Lesson dependency/,
  );
});
