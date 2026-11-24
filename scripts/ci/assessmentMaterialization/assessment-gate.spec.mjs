import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverAssessmentDraft } from './assessment-gate.mjs';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const root = 'content/math/data/courses/3/' + id;
const draft = placement => ({ filename: root + '/' + placement + '/draft.ts', status: 'modified' });

test('Assessment owner is the exact Course, Module or Chapter at its nested source path', () => {
  const cases = [
    ['content/finalReview', root + '/index.ts'],
    ['content/moduleOne/content/moduleReview', root + '/content/moduleOne/index.ts'],
    ['content/chapterOne/content/chapterReview', root + '/content/chapterOne/index.ts'],
    ['content/moduleOne/chapterOne/content/chapterReview', root + '/content/moduleOne/chapterOne/index.ts'],
  ];
  for (const [placement, parentPath] of cases) {
    const got = discoverAssessmentDraft([draft(placement)]);
    assert.equal(got.placement, placement);
    assert.equal(got.parentPath, parentPath);
    assert.equal(got.courseRoot, root);
    assert.equal(got.courseId, id);
  }
});

test('rejects an invented/moved Assessment source and unrelated concurrent diff', () => {
  assert.throws(() => discoverAssessmentDraft([draft('content/moduleOne/review')]));
  assert.throws(() => discoverAssessmentDraft([draft('content/review'), draft('content/another')]));
  assert.throws(() => discoverAssessmentDraft([{ ...draft('content/review'), status: 'added' }]));
  assert.throws(() => discoverAssessmentDraft([draft('content/moduleOne/chapterOne/extra/content/review')]));
  assert.throws(() => discoverAssessmentDraft([draft('content/constructor')]));
  assert.throws(() => discoverAssessmentDraft([draft('content/lessonOne/questions')]));
});
