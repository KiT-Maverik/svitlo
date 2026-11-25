import test from 'node:test';
import assert from 'node:assert/strict';
import { discoverAssessmentDraft } from './assessment-gate.mjs';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const root = 'content/math/data/courses/3/' + id;
const draft = placement => ({ filename: root + '/' + placement + '/draft.ts', status: 'modified' });

test('Assessment owner is the exact Course, Module or Chapter at its nested source path', () => {
  const cases = [
    ['finalReview', root + '/index.ts'],
    ['moduleOne/moduleReview', root + '/moduleOne/index.ts'],
    ['chapterOne/chapterReview', root + '/chapterOne/index.ts'],
    ['moduleOne/chapterOne/chapterReview', root + '/moduleOne/chapterOne/index.ts'],
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
  assert.throws(() => discoverAssessmentDraft([draft('moduleOne/chapterOne/deep/review')]));
  assert.throws(() => discoverAssessmentDraft([draft('review'), draft('another')]));
  assert.throws(() => discoverAssessmentDraft([{ ...draft('review'), status: 'added' }]));
  assert.throws(() => discoverAssessmentDraft([draft('moduleOne/chapterOne/extra/review')]));
  assert.throws(() => discoverAssessmentDraft([draft('constructor')]));
  assert.throws(() => discoverAssessmentDraft([draft('lessonOne/questions/review/extra')]));
});
