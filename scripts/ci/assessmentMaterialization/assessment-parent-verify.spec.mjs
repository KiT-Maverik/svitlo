import test from 'node:test';
import assert from 'node:assert/strict';

import { restoreAssessmentPlacement, verifyAssessmentParentPatch } from './assessment-parent-verify.mjs';

const id = 'a73572e7-bd85-4516-86e2-3de07d209e03';
const second = 'a73572e7-bd85-4516-86e2-3de07d209e04';
const stub = (slug, uuid) =>
  JSON.stringify(slug) +
  ': defineAssessmentStub({ id: ' +
  JSON.stringify(uuid) +
  ', slug: ' +
  JSON.stringify(slug) +
  ' })';
const parent = (items, order) =>
  "import { defineModule, defineAssessmentStub } from '@svitlo/engine/build';\n" +
  'const content = { items: { ' +
  items.join(', ') +
  ' }, order: ' +
  JSON.stringify(order) +
  ' };\n' +
  'export const moduleOne = defineModule({ content });\n';
const placement = (slug = 'review', uuid = id) => ({
  id: uuid,
  slug,
  placement: 'content/moduleOne/content/' + slug,
  exportName: slug,
});

test('restores only the exact Assessment stub, preserving all siblings and order', () => {
  const before = parent([stub('intro', second), stub('review', id)], ['intro', 'review']);
  const after = restoreAssessmentPlacement(before, placement());
  assert.match(after, /import \{ review as child_review \} from "\.\/content\/review"/);
  assert.match(after, /"review": child_review/);
  assert.match(after, /"intro": defineAssessmentStub/);
  assert.match(after, /"intro","review"/);
  assert.equal(verifyAssessmentParentPatch(before, after, placement()), true);
  const end = restoreAssessmentPlacement(after, placement('intro', second));
  assert.doesNotMatch(end, /defineAssessmentStub/);
  assert.match(end, /"review": child_review/);
  assert.match(end, /"intro": child_intro/);
  assert.match(end, /"intro","review"/);
});

test('rejects spoofed UUID, parent edits, missing stub, replay and reordered siblings', () => {
  const original = parent([stub('review', id)], ['review']);
  const updated = restoreAssessmentPlacement(original, placement());
  assert.throws(() => restoreAssessmentPlacement(original, placement('other')), /[Rr]eserved|identity/);
  assert.throws(() => restoreAssessmentPlacement(original, placement('review', second)), /UUID\/slug/);
  assert.throws(() => restoreAssessmentPlacement(updated, placement()), /imported draft-only|reserved/);
  assert.throws(
    () => verifyAssessmentParentPatch(original, updated + '// unauthorized\n', placement()),
    /exact authorized/,
  );
  assert.throws(
    () => restoreAssessmentPlacement(original.replace('const content', 'const changed'), placement()),
    /generated parent content/,
  );
  assert.throws(
    () => restoreAssessmentPlacement(original.replace('order: ["review"]', 'order: []'), placement()),
    /incomplete/,
  );
});
