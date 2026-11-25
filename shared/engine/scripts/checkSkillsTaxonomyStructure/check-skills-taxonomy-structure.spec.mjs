import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { checkTaxonomy } from './check-skills-taxonomy-structure.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-skills-check-'));
  const write = (name, content) => {
    const file = path.join(root, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  };
  write('index.ts', "export { geometry } from './geometry';\n");
  write(
    'geometry/index.ts',
    [
      "import { defineSkillDomain } from '@svitlo/engine/build';",
      "import { angles } from './angles';",
      "export const geometry = defineSkillDomain({ slug: 'geometry', id: '11111111-1111-4111-8111-111111111111', title: {}, groups: { angles } });",
    ].join('\n'),
  );
  write(
    'geometry/angles/index.ts',
    [
      "import { defineSkillGroup } from '@svitlo/engine/build';",
      "import { rightAngle } from './rightAngle';",
      "export const angles = defineSkillGroup({ slug: 'angles', id: '22222222-2222-4222-8222-222222222222', name: {}, skills: { rightAngle } });",
    ].join('\n'),
  );
  write(
    'geometry/angles/rightAngle.ts',
    "import { defineSkill } from '@svitlo/engine/build';\nexport const rightAngle = defineSkill({ slug: 'rightAngle', id: '33333333-3333-4333-8333-333333333333', name: {} });\n",
  );
  return { root, write };
}
test('accepts canonical Domain/Group index.ts and direct Skill files', t => {
  const { root } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 1 });
});
test('allows a separate root review file, but rejects unknown root files', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  write('review.ts', 'export const skillsReview = {};\n');
  write('_review.ts', 'export const skillsReview = {};\n');
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 1 });
  write('unexpected.ts', 'export {};\n');
  assert.throws(() => checkTaxonomy(root), /Root index surface/);
});
test('rejects missing or stale child imports and orphan Skill files', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const file = path.join(root, 'geometry/index.ts');
  const original = fs.readFileSync(file, 'utf8');
  write('geometry/index.ts', original.replace("'./angles'", "'./other'"));
  assert.throws(() => checkTaxonomy(root), /Missing direct Group reference/);
  write('geometry/index.ts', original);
  write('geometry/angles/unused.ts', 'export const unused = true;\n');
  assert.throws(() => checkTaxonomy(root), /Group files|Skill files/);
});
test('rejects duplicate UUID identities without disallowing identical slugs in separate parents', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  write(
    'geometry/angles/rightAngle.ts',
    "export const rightAngle = defineSkill({ slug: 'rightAngle', id: '22222222-2222-4222-8222-222222222222', name: {} });\n",
  );
  assert.throws(() => checkTaxonomy(root), /Duplicate UUID/);
});
test('mixed Domain composes direct Skills and Groups; shorthand and exact named entries work', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  write(
    'geometry/rectangle.ts',
    "export const rectangle = defineSkill({ slug: 'rectangle', id: '44444444-4444-4444-8444-444444444444', name: {} });\n",
  );
  const file = path.join(root, 'geometry/index.ts');
  const original = fs.readFileSync(file, 'utf8');
  write(
    'geometry/index.ts',
    original
      .replace('import { angles }', "import { rectangle } from './rectangle';\nimport { angles }")
      .replace('groups: { angles }', 'groups: { angles }, skills: { rectangle }'),
  );
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 2 });
  const current = fs.readFileSync(file, 'utf8');
  write('geometry/index.ts', current.replace('skills: { rectangle }', 'skills: { rectangle: rectangle.id }'));
  assert.throws(() => checkTaxonomy(root), /Invalid child configurator entry/);
});
test('rejects old ordered collection format and mismatched child slugs', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const file = path.join(root, 'geometry/index.ts');
  const original = fs.readFileSync(file, 'utf8');
  write(
    'geometry/index.ts',
    original.replace('groups: { angles }', "groups: { items: { angles }, order: ['angles'] }"),
  );
  assert.throws(() => checkTaxonomy(root), /Invalid child configurator entry|Group membership/);
  write('geometry/index.ts', original.replace('groups: { angles }', 'groups: { wrong: angles }'));
  assert.throws(() => checkTaxonomy(root), /Child slug\/symbol mismatch/);
});
