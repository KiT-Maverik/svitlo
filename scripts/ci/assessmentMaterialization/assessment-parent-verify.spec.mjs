import { assessmentDraftExpression } from '../../../shared/engine/generators/materializers/course/materializeAssessmentPlaceholder.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { restoreAssessmentPlacement, verifyAssessmentParentPatch } from './assessment-parent-verify.mjs';

const id = 'a73572e7-bd85-4516-86e2-3de07d209e03';
const second = 'a73572e7-bd85-4516-86e2-3de07d209e04';
const placeholder = assessmentDraftExpression;
const intro =
  "import { defineAssessmentDraft, defineContentSection, defineText } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Not implemented — Assessment has no reviewed Questions or Quiz. Do not publish.\n';
const item = (slug, uuid) => JSON.stringify(slug) + ': ' + placeholder(uuid, slug);
const parent = (items, order) =>
  intro +
  'const content = { items: { ' +
  items.join(', ') +
  ' }, order: ' +
  JSON.stringify(order) +
  ' };\n' +
  'export const module = defineModule({ content });\n';
const placement = (slug = 'review', uuid = id) => ({
  id: uuid,
  slug,
  placement: 'content/moduleOne/content/' + slug,
  exportName: slug,
});

test('restores only the exact Assessment slot at a nested parent, preserving order', () => {
  const before = parent([item('intro', second), item('review', id)], ['intro', 'review']);
  const after = restoreAssessmentPlacement(before, placement());
  assert.match(after, /import \{ review as child_review \} from "\.\/content\/review"/);
  assert.match(after, /"review": child_review/);
  assert.match(after, /"intro": defineAssessment/);
  assert.match(after, /"intro","review"/);
  assert.match(after, /TODO \(BLOCKER\): Not implemented/);
  assert.equal(verifyAssessmentParentPatch(before, after, placement()), true);
  const end = restoreAssessmentPlacement(after, placement('intro', second));
  assert.doesNotMatch(end, /TODO \(BLOCKER\): Not implemented/);
  assert.doesNotMatch(end, /import \{ defineAssessment \}/);
  assert.match(end, /"review": child_review/);
  assert.match(end, /"intro": child_intro/);
});

test('rejects invented identity, parent edits, duplicate aliases and missing slot', () => {
  const original = parent([item('review', id)], ['review']);
  const updated = restoreAssessmentPlacement(original, placement());
  assert.throws(() => restoreAssessmentPlacement(original, placement('other')), /reviewed placeholder/);
  assert.throws(() => restoreAssessmentPlacement(updated, placement()), /reviewed placeholder/);
  assert.throws(() => verifyAssessmentParentPatch(original, updated + '// malicious\n', placement()), /differs/);
  assert.throws(
    () => restoreAssessmentPlacement(original.replace('const content', 'const changed'), placement()),
    /reviewed placeholder/,
  );
});
