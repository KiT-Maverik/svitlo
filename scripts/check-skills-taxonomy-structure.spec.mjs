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
  write('index.ts', "export { geometry_SkillDomain_Data } from './geometry/geometry.data';\n");
  write(
    'geometry/geometry.data.ts',
    [
      "import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';",
      "import { angles_SkillGroup_Data } from './angles/angles.data';",
      "export const geometry_SkillDomain_Data = buildSkillDomainConfig({ slug: 'geometry', id: '11111111-1111-4111-8111-111111111111', name: {}, groups: { angles: angles_SkillGroup_Data } });",
    ].join('\n'),
  );
  write(
    'geometry/angles/angles.data.ts',
    [
      "import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';",
      "import { rightAngle_Skill_Data } from './skills';",
      "export const angles_SkillGroup_Data = buildSkillGroupConfig({ slug: 'angles', id: '22222222-2222-4222-8222-222222222222', name: {}, skills: { rightAngle: rightAngle_Skill_Data } });",
    ].join('\n'),
  );
  write('geometry/angles/skills/index.ts', "export { rightAngle_Skill_Data } from './rightAngle.data';\n");
  write(
    'geometry/angles/skills/rightAngle.data.ts',
    "import { buildSkillConfig } from '@svitlo/engine/taxonomy';\nexport const rightAngle_Skill_Data = buildSkillConfig({ slug: 'rightAngle', id: '33333333-3333-4333-8333-333333333333', name: {} });\n",
  );
  return { root, write };
}
test('valid direct composition with full child entities', t => {
  const { root } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 1 });
});
test('allows a separate root review file while rejecting other root files', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  write('review.ts', 'export const skillsReview = {};\n');
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 1 });
  write('_review.ts', 'export const skillsReview = {};\n');
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 1 });
  write('unexpected.ts', 'export {};\n');
  assert.throws(() => checkTaxonomy(root), /Root index surface/);
});
test('reject removed Domain barrel imports', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const file = path.join(root, 'geometry/geometry.data.ts');
  write('geometry/geometry.data.ts', fs.readFileSync(file, 'utf8').replace("'./angles/angles.data'", "'./index'"));
  assert.throws(() => checkTaxonomy(root), /Missing direct Group reference/);
});
test('reject missing Skills in barrel and duplicate UUID literals', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  write('geometry/angles/skills/index.ts', "export { unrelated_Skill_Data } from './unrelated.data';\n");
  assert.throws(() => checkTaxonomy(root), /Skill barrel/);
  write('geometry/angles/skills/index.ts', "export { rightAngle_Skill_Data } from './rightAngle.data';\n");
  const file = path.join(root, 'geometry/angles/skills/rightAngle.data.ts');
  write(
    'geometry/angles/skills/rightAngle.data.ts',
    fs
      .readFileSync(file, 'utf8')
      .replace('33333333-3333-4333-8333-333333333333', '22222222-2222-4222-8222-222222222222'),
  );
  assert.throws(() => checkTaxonomy(root), /Duplicate UUID/);
});
test('mixed Domain with Groups and direct Skills is structurally valid', t => {
  const { root, write } = fixture();
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  write('geometry/skills/index.ts', "export { rectangle_Skill_Data } from './rectangle.data';\n");
  write(
    'geometry/skills/rectangle.data.ts',
    "import { buildSkillConfig } from '@svitlo/engine/taxonomy';\n" +
      "export const rectangle_Skill_Data = buildSkillConfig({ slug: 'rectangle', id: '44444444-4444-4444-8444-444444444444', name: {} });\n",
  );
  const file = path.join(root, 'geometry/geometry.data.ts');
  write(
    'geometry/geometry.data.ts',
    fs
      .readFileSync(file, 'utf8')
      .replace(
        'import { angles_SkillGroup_Data }',
        "import { rectangle_Skill_Data } from './skills';\nimport { angles_SkillGroup_Data }",
      )
      .replace(
        'groups: { angles: angles_SkillGroup_Data }',
        'groups: { angles: angles_SkillGroup_Data }, skills: { rectangle: rectangle_Skill_Data }',
      ),
  );
  assert.deepEqual(checkTaxonomy(root), { domains: 1, groups: 1, skills: 2 });
  const source = fs.readFileSync(file, 'utf8');
  write(
    'geometry/geometry.data.ts',
    source.replace('rectangle: rectangle_Skill_Data', 'rectangle: rectangle_Skill_Data.id'),
  );
  assert.throws(() => checkTaxonomy(root), /Invalid child entity reference/);
});
