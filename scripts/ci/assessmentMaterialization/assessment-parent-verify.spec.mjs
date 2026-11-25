import test from 'node:test';
import assert from 'node:assert/strict';

import { restoreAssessmentPlacement, verifyAssessmentParentPatch } from './assessment-parent-verify.mjs';

const id = 'a73572e7-bd85-4516-86e2-3de07d209e03';
const second = 'a73572e7-bd85-4516-86e2-3de07d209e04';
const stubSource = (slug, uuid) =>
  "import { defineAssessmentStub } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Complete the Assessment then atomically delete this stub.\n' +
  'export const stub = defineAssessmentStub({ id: ' +
  JSON.stringify(uuid) +
  ', slug: ' +
  JSON.stringify(slug) +
  ' });\n';
const stubImport = slug => 'import { stub as child_' + slug + ' } from "./content/' + slug + '/stub";\n';
const slot = slug => JSON.stringify(slug) + ': child_' + slug;
const parent = (slugs, order) =>
  "import { defineModule } from '@svitlo/engine/build';\n" +
  slugs.map(stubImport).join('') +
  'const content = { items: { ' +
  slugs.map(slot).join(', ') +
  ' }, order: ' +
  JSON.stringify(order) +
  ' };\n' +
  'export const moduleOne = defineModule({ content });\n';
const placement = (slug = 'review', uuid = id) => ({
  id: uuid,
  slug,
  placement: 'content/moduleOne/content/' + slug,
  exportName: slug,
  stubSource: stubSource(slug, uuid),
});

test('restores exactly one owned Assessment, preserving sibling imported stubs and order', () => {
  const before = parent(['intro', 'review'], ['intro', 'review']);
  const after = restoreAssessmentPlacement(before, placement());
  assert.match(after, /import \{ review as child_review \} from "\.\/content\/review"/);
  assert.match(after, /"review": child_review/);
  assert.match(after, /import \{ stub as child_intro \} from "\.\/content\/intro\/stub"/);
  assert.match(after, /"intro": child_intro/);
  assert.match(after, /"intro","review"/);
  assert.equal(verifyAssessmentParentPatch(before, after, placement()), true);
  const end = restoreAssessmentPlacement(after, placement('intro', second));
  assert.doesNotMatch(end, /\/stub"/);
  assert.match(end, /"review": child_review/);
  assert.match(end, /"intro": child_intro/);
  assert.match(end, /"intro","review"/);
});

test('rejects swapped identity, malformed stub, spoofed parent and replay', () => {
  const original = parent(['review'], ['review']);
  const updated = restoreAssessmentPlacement(original, placement());
  assert.throws(
    () => restoreAssessmentPlacement(original, placement('other')),
    /Reserved child stub missing from actual parent order\/items/,
  );
  assert.throws(
    () =>
      restoreAssessmentPlacement(original, {
        ...placement(),
        id: second,
      }),
    /UUID\/slug/,
  );
  assert.throws(() => restoreAssessmentPlacement(updated, placement()), /stub import/);
  assert.throws(
    () => restoreAssessmentPlacement(original, { ...placement(), stubSource: stubSource('review', second) }),
    /UUID\/slug/,
  );
  assert.throws(
    () => verifyAssessmentParentPatch(original, updated + '// unauthorized\n', placement()),
    /exact authorized/,
  );
  assert.throws(
    () => restoreAssessmentPlacement(original.replace('const content', 'const changed'), placement()),
    /parent content/,
  );
  assert.throws(
    () => restoreAssessmentPlacement(original.replace('order: ["review"]', 'order: []'), placement()),
    /incomplete/,
  );
});
