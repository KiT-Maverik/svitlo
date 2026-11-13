import assert from 'node:assert/strict';
import { before, after, test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../../../..');
const fixture = fs.mkdtempSync(path.join(root, 'content', '.taxonomy-code-markdown-'));
const taxonomy = path.join(fixture, 'data/skills');
const generator = path.join(root, 'shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.mjs');
const languages = fs.readFileSync(path.join(root, 'shared/engine/schemas/languages.schemas.ts'), 'utf8');
const roster = languages.slice(
  languages.indexOf('export const DEFAULT_SUPPORTED_LANGUAGES'),
  languages.indexOf('] as const satisfies readonly LanguageDefinition[];'),
);
const locales = [...roster.matchAll(/language:\s*'([^']+)'/g)].map(x => x[1]);
assert.ok(locales.includes('uk') && locales.includes('en'));
const ids = {
  d: '10bbac60-7f3b-4d65-b926-875ee4473971',
  g: '10bbac60-7f3b-4d65-b926-875ee4473972',
  s: '10bbac60-7f3b-4d65-b926-875ee4473973',
  direct: '10bbac60-7f3b-4d65-b926-875ee4473974',
  t: '10bbac60-7f3b-4d65-b926-875ee4473975',
};
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
};
const dictionary = prefix =>
  '{' + locales.map(locale => JSON.stringify(locale) + ': ' + JSON.stringify(prefix + ' ' + locale)).join(', ') + '}';
function entity(kind, slug, name, membership, withFrontend = kind === 'Skill') {
  return (
    'export const ' +
    slug +
    '_' +
    kind +
    '_Data = define' +
    kind +
    '({' +
    'slug: ' +
    JSON.stringify(slug) +
    ', id: ' +
    JSON.stringify(ids[slug]) +
    ', ' +
    (kind === 'SkillDomain' ? 'title' : 'name') +
    ': ' +
    dictionary(name) +
    ', description: {methodological: ' +
    JSON.stringify('English explanation for ' + name) +
    (withFrontend ? ', frontend: ' + dictionary('Frontend ' + name) : '') +
    '}' +
    (membership ? ', ' + membership : '') +
    '});\n'
  );
}
const groupedSkill = path.join(taxonomy, 'd/g/skills/s.data.ts');
const directSkill = path.join(taxonomy, 'direct/skills/t.data.ts');
const output = locale => path.join(fixture, 'docs/generated/skills/taxonomy.' + locale + '.md');
const run = (locale = 'en', ...flags) =>
  spawnSync(process.execPath, [generator, '--package', path.relative(root, fixture), '--locale', locale, ...flags], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });

before(() => {
  write(
    path.join(taxonomy, 'index.ts'),
    "export { d_SkillDomain_Data } from './d/d.data';\n" +
      "export { direct_SkillDomain_Data } from './direct/direct.data';\n",
  );
  write(
    path.join(taxonomy, 'd/d.data.ts'),
    "import { g_SkillGroup_Data } from './g/g.data';\n" +
      entity('SkillDomain', 'd', 'Grouped Domain', 'groups: [g_SkillGroup_Data]'),
  );
  write(
    path.join(taxonomy, 'd/g/g.data.ts'),
    "import { s_Skill_Data } from './skills';\n" + entity('SkillGroup', 'g', 'Group', 'skills: [s_Skill_Data]'),
  );
  write(path.join(taxonomy, 'd/g/skills/index.ts'), "export { s_Skill_Data } from './s.data';\n");
  write(groupedSkill, entity('Skill', 's', 'Grouped Skill'));
  write(
    path.join(taxonomy, 'direct/direct.data.ts'),
    "import { t_Skill_Data } from './skills';\n" +
      entity('SkillDomain', 'direct', 'Direct Domain', 'groups: [], skills: [t_Skill_Data]', true),
  );
  write(path.join(taxonomy, 'direct/skills/index.ts'), "export { t_Skill_Data } from './t.data';\n");
  write(directSkill, entity('Skill', 't', 'Direct Skill'));
});
after(() => fs.rmSync(fixture, { recursive: true, force: true }));

test('canonical lowercase data/skills renders grouped and direct Skill hierarchies', () => {
  for (const locale of ['en', 'uk']) {
    const a = run(locale, '--stdout'),
      b = run(locale, '--stdout');
    assert.equal(a.status, 0, a.stderr);
    assert.equal(b.status, 0, b.stderr);
    assert.equal(a.stdout, b.stdout, 'Output must be deterministic');
    assert.match(a.stdout, /^Domains: 2$/m);
    assert.match(a.stdout, /^Groups: 1$/m);
    assert.match(a.stdout, /^Skills: 2$/m);
    for (const [level, label] of [
      ['###', 'Grouped Domain'],
      ['####', 'Group'],
      ['#####', 'Grouped Skill'],
      ['###', 'Direct Domain'],
      ['####', 'Direct Skill'],
    ]) {
      assert.match(a.stdout, new RegExp('^' + level + ' ' + label + ' ' + locale + '$', 'm'));
    }
    assert.equal([...a.stdout.matchAll(/^\[([^\]]+\.data\.ts)\]\(([^)]+)\)$/gm)].length, 5);
    assert.match(a.stdout, new RegExp('Frontend Grouped Skill ' + locale));
    assert.doesNotMatch(a.stdout, /^(Slug|Action|Status):/m);
    assert.equal(fs.existsSync(output(locale)), false, '--stdout never writes files');
  }
});

test('generation is deterministic; --check detects stale output without rewriting it', () => {
  const first = run('en');
  assert.equal(first.status, 0, first.stderr);
  const snapshot = fs.readFileSync(output('en'), 'utf8');
  assert.equal(run('en', '--check').status, 0);
  assert.equal(run('en', '--stdout').stdout, snapshot);
  fs.writeFileSync(output('en'), snapshot + '\nSTALE');
  const checked = run('en', '--check');
  assert.notEqual(checked.status, 0);
  assert.match(checked.stderr, /missing or stale/);
  assert.equal(fs.readFileSync(output('en'), 'utf8'), snapshot + '\nSTALE');
  assert.equal(run('en').status, 0);
  assert.equal(fs.readFileSync(output('en'), 'utf8'), snapshot);
});

test('invalid or incomplete Skill localization fails closed without changing generated output', () => {
  const beforeText = fs.readFileSync(output('en'), 'utf8');
  write(groupedSkill, entity('Skill', 's', 'Grouped Skill', '', false));
  try {
    const result = run('en');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Missing required Skill description\.frontend/);
    assert.equal(fs.readFileSync(output('en'), 'utf8'), beforeText);
  } finally {
    write(groupedSkill, entity('Skill', 's', 'Grouped Skill'));
  }
  write(groupedSkill, entity('Skill', 's', 'Grouped Skill').replace(/"uk": "Frontend Grouped Skill uk",?/, ''));
  try {
    const result = run('en');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Missing required frontend locale uk/);
  } finally {
    write(groupedSkill, entity('Skill', 's', 'Grouped Skill'));
  }
});

test('duplicate UUID fails graph validation before generating a document', () => {
  const beforeText = fs.readFileSync(output('en'), 'utf8');
  write(directSkill, entity('Skill', 't', 'Direct Skill').replace(ids.t, ids.s));
  try {
    const result = run('en');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Duplicate UUID/);
    assert.equal(fs.readFileSync(output('en'), 'utf8'), beforeText);
  } finally {
    write(directSkill, entity('Skill', 't', 'Direct Skill'));
  }
});

test('legacy source-root argument and implicit fallbacks are rejected', () => {
  const result = run('en', '--source-root', 'src/data/skillsTaxonomy', '--stdout');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Usage:/);
});
