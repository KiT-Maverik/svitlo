import test from 'node:test';
import assert from 'node:assert/strict';
import { bindVerifiedSkills } from './bindVerifiedSkills.mjs';

const first = '00000000-0000-4000-8000-000000000015';
const second = '00000000-0000-4000-8000-000000000008';
const sha = 'a'.repeat(40);
const names = new Map([
  [first, 'testExplainLightTravel'],
  [second, 'testRecognizeCircle'],
]);
const paths = new Map([
  [first, 'testLight/testLightPropagation/testExplainLightTravel'],
  [second, 'testShapes/testRoundShapes/testRecognizeCircle'],
]);
const approve = ({ id }) => ({
  approved: true,
  id,
  slug: names.get(id),
  exportName: names.get(id),
  importPath: '#skillsData/' + paths.get(id),
  sourcePath: 'content/playground/data/skills/' + paths.get(id) + '.ts',
  sourceSha: sha,
  configurator: {
    id,
    slug: names.get(id),
    type: 'skill',
    config: { base: { id, slug: names.get(id) } },
    build: { data() {} },
  },
});
const ctx = { resolveSkill: approve, textbookRoot: 'content/playground', directory: 'content/test' };

test('binds actual Skill IDs while retaining exact target order and unrelated taxonomy UUID literals', () => {
  const params = {
    age: { min: 6, max: 10 },
    outcomes: { skills: [first, second], skillGroups: ['00000000-0000-4000-8000-000000000016'] },
    prerequisites: {
      skills: [second],
      skillDomains: ['00000000-0000-4000-8000-000000000014'],
      courses: ['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'],
    },
  };
  const result = bindVerifiedSkills(params, { ...ctx, includeLanguages: true });
  const a = 'testExplainLightTravel.id';
  const b = 'testRecognizeCircle.id';
  assert(result.source.indexOf(a) < result.source.indexOf(b));
  assert(result.source.includes('"skills": [' + a + ', ' + b + ']'));
  assert(result.source.includes('"skills": [' + b + ']'));
  assert.match(result.source, /"skillGroups": \["00000000-0000-4000-8000-000000000016"\]/);
  assert.match(result.source, /"courses": \["aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa"\]/);
  assert.match(result.source, /languages/);
  assert.equal(result.imports.length, 2, 'reuse a Skill binding across Course outcome and prerequisite arrays');
  assert(result.imports.some(i => i.includes('#skillsData/testLight/testLightPropagation/testExplainLightTravel')));
  assert(result.imports.some(i => i.includes('#skillsData/testShapes/testRoundShapes/testRecognizeCircle')));
});

test('preserves Skill source export names even when they collide; TypeScript owns diagnostics', () => {
  const source = bindVerifiedSkills(
    { outcomes: { skills: [first, second] } },
    {
      ...ctx,
      resolveSkill: request =>
        request.id === second ? { ...approve(request), exportName: 'testExplainLightTravel' } : approve(request),
    },
  );
  assert.match(source.source, /testExplainLightTravel\.id/);
  assert.doesNotMatch(source.source, /testExplainLightTravel_[23]\.id/);
  assert.equal(source.imports.length, 2);
  assert(source.imports.every(line => line.includes('import { testExplainLightTravel } from ')));
  assert(source.imports.every(line => !line.includes(' as ')));
  const again = bindVerifiedSkills(
    { outcomes: { skills: [first, second] } },
    {
      ...ctx,
      resolveSkill: request =>
        request.id === second ? { ...approve(request), exportName: 'testExplainLightTravel' } : approve(request),
    },
  );
  assert.deepEqual(again, source);
});

test('fails closed for unknown, unapproved, stale, spoofed or wrong-type Skill dependencies', () => {
  const params = { outcomes: { skills: [first] } };
  assert.throws(() => bindVerifiedSkills(params, { ...ctx, resolveSkill: undefined }), /resolver required/);
  for (const alter of [
    x => ({ ...x, approved: false }),
    x => ({ ...x, id: second }),
    x => ({ ...x, sourceSha: 'stale' }),
    x => ({ ...x, importPath: '#skillsData/../outside' }),
    x => ({ ...x, exportName: '../evil' }),
    x => ({ ...x, configurator: { ...x.configurator, type: 'skillGroup' } }),
    x => ({ ...x, configurator: { ...x.configurator, id: second } }),
    x => ({ ...x, sourcePath: 'content/math/data/skills/testSkill.ts' }),
  ]) {
    assert.throws(
      () =>
        bindVerifiedSkills(params, {
          ...ctx,
          resolveSkill: request => alter(approve(request)),
        }),
      /unapproved|mismatched/,
    );
  }
  assert.throws(() => bindVerifiedSkills({ outcomes: { skills: ['not-a-uuid'] } }, ctx), /invalid Skill UUID/);
});
