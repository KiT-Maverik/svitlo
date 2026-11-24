import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { materializeSkillDomain } from './materialize.mjs';
import { materializeSkill } from '../skill/materialize.mjs';
import { materializeSkillGroup } from '../skillGroup/materialize.mjs';
const ts = createRequire(import.meta.url)('typescript');
const ID = 'e69e5a56-0d62-4282-aeb0-4d1ca353a0ea';
const SID = '9b646e88-7307-413b-9e52-73027616a323';
const GID = '8795927b-f5b9-492e-9f4e-d96b9a128fac';
const skill = slug => ({
  id: SID,
  slug,
  name: { uk: 'Уміння', en: 'Skill' },
  description: { methodological: 'Skill method', frontend: { uk: 'Опис', en: 'Description' } },
});
const config = () => ({
  id: ID,
  slug: 'firstDomain',
  title: { uk: 'Домен' },
  description: { methodological: 'Domain' },
  skills: { firstSkill: skill('firstSkill') },
  groups: {
    firstGroup: {
      id: GID,
      slug: 'firstGroup',
      name: { uk: 'Група' },
      description: { methodological: 'Group' },
      skills: { secondSkill: { ...skill('secondSkill'), id: 'ae6d76ed-13a2-4c3e-9754-8e9b91cebc4d' } },
    },
  },
});
const render = () =>
  materializeSkillDomain(
    { config: config(), production: { plannedLanguages: ['uk', 'en'] } },
    {
      sourceLanguage: 'uk',
      materializeSkill,
      materializeSkillGroup,
    },
  );
test('delegates nested source and emits parseable TypeScript with concrete child imports', () => {
  const result = render();
  const paths = result.files.map(file => file.path);
  assert.ok(paths.includes('firstSkill.ts'));
  assert.ok(paths.includes('firstGroup/secondSkill.ts'));
  assert(!paths.some(path => path.startsWith('skills/') || path.startsWith('groups/')));
  assert.ok(paths.includes('firstGroup/index.ts'));
  const code = result.files.find(file => file.path === 'index.ts').content;
  assert.match(code, /defineSkillDomain</);
  assert.match(code, /from "\.\/firstGroup"/);
  assert.match(code, /from "\.\/firstSkill"/);
  assert.match(code, /TODO \(BLOCKER\)/);
  assert.equal(
    ts.createSourceFile('index.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).parseDiagnostics.length,
    0,
  );
  assert.deepEqual(render(), result);
});
test('invalid child slug and unresolved dependency fail explicitly', () => {
  const raw = config();
  raw.skills.firstSkill.slug = 'badSlug';
  assert.throws(
    () => materializeSkillDomain(raw, { sourceLanguage: 'uk', materializeSkill, materializeSkillGroup }),
    /slug mismatch/,
  );
  assert.throws(() => materializeSkillDomain(config(), { sourceLanguage: 'uk' }), /missing .* renderer/);
});

test('SkillDomain refuses direct Skill name conflicting with the owner entrypoint', () => {
  const input = config();
  input.skills = { index: skill('index') };
  assert.throws(() => materializeSkillDomain(input, {
    sourceLanguage: 'uk',
    materializeSkill,
    materializeSkillGroup,
  }), /reserved source filename/);
});
test('skillDomain rejects escaped destination directories', () => {
  assert.throws(
    () => materializeSkillDomain(config(), { sourceLanguage: 'uk', directory: '../unsafe' }),
    /unsafe generated directory/,
  );
});

test('missing direct Skill identity is allocated through delegated deterministic ID', () => {
  const v = config();
  delete v.skills.firstSkill.id;
  delete v.skills.firstSkill.slug;
  const result = materializeSkillDomain(v, {
    sourceLanguage: 'uk',
    materializeSkill,
    materializeSkillGroup,
    deriveId: (kind, location) => (kind === 'skill' ? SID : ID),
  });
  assert.ok(result.files.some(file => file.path === 'firstSkill.ts'));
});

test('SkillDomain rejects escaped files from delegated Group materializer', () => {
  const maliciousGroup = () => ({
    id: GID,
    exportName: 'firstGroup',
    files: [
      { path: 'firstGroup/index.ts', kind: 'typescript', content: 'export const firstGroup = 1;\n' },
      { path: 'escaped.txt', kind: 'markdown', content: 'bad\n' },
    ],
  });
  assert.throws(() => materializeSkillDomain(config(), {
    sourceLanguage: 'uk',
    materializeSkill,
    materializeSkillGroup: maliciousGroup,
  }), /escaped its source owner/);
});
