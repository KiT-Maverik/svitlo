import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const script = path.join(root, 'shared/engine/scripts/implementSkillsTaxonomy/implement-skills-taxonomy.mjs');
const roster = fs.readFileSync(path.join(root, 'shared/engine/schemas/languages.schemas.ts'), 'utf8');
const languages = roster.slice(
  roster.indexOf('export const DEFAULT_SUPPORTED_LANGUAGES'),
  roster.indexOf('] as const satisfies readonly LanguageDefinition[];'),
);
const locales = [...languages.matchAll(/language:\s*'([^']+)'/g)].map(x => x[1]);
assert.ok(locales.includes('en') && locales.includes('uk'));
const friendly = 'Explore this topic.';
function section(level, title, slug, action = 'create', status = 'pending', children = '') {
  const prefix =
    level === 3
      ? 'Groups: ' + (children === 'group' ? 1 : 0) + ' · Skills: 1\n\n'
      : level === 4 && children === 'skill'
        ? 'Skills: 1\n\n'
        : '';
  return (
    '#'.repeat(level) +
    ' ' +
    title +
    '\n\nSlug: ' +
    slug +
    '\nAction: ' +
    action +
    '\nStatus: ' +
    status +
    '\n\n' +
    prefix +
    '[Not implemented](#)\n\n' +
    'Methodological description: Definition of ' +
    title +
    '.\n' +
    'User-friendly description: ' +
    friendly +
    '\n\n'
  );
}
const header = '# Test Taxonomy\n\n## SUMMARY\n\nDomains: 2\nGroups: 1\nSkills: 2\n\n## DOMAINS\n\n';
const original =
  header +
  section(3, 'Geometry', 'geometry', 'create', 'pending', 'group') +
  section(4, 'Angles', 'angles', 'create', 'pending', 'skill') +
  section(5, 'Compare Angles', 'compareAngles') +
  section(3, 'Music', 'music', 'create', 'pending', 'direct') +
  section(4, 'Hear Rhythm', 'hearRhythm');
function fixture() {
  const pkg = fs.mkdtempSync(path.join(root, 'content', '.direct-skill-code-'));
  const md = path.join(pkg, 'docs/skills/taxonomy.md');
  fs.mkdirSync(path.dirname(md), { recursive: true });
  fs.writeFileSync(path.join(pkg, 'package.json'), '{"name":"fixture","private":true}');
  fs.writeFileSync(md, original);
  const defs = [
    ['geometry', 'Geometry'],
    ['geometry/angles', 'Angles'],
    ['geometry/angles/compareAngles', 'Compare Angles'],
    ['music', 'Music'],
    ['music/hearRhythm', 'Hear Rhythm'],
  ];
  const translations = Object.fromEntries(
    defs.map(([key, title]) => [
      key,
      {
        name: Object.fromEntries(locales.map(l => [l, l === 'en' ? title : 'Translated ' + title + ' ' + l])),
        frontend: Object.fromEntries(locales.map(l => [l, l === 'en' ? friendly : 'Frontend ' + title + ' ' + l])),
      },
    ]),
  );
  const tFile = path.join(pkg, 'locales.json');
  fs.writeFileSync(tFile, JSON.stringify(translations));
  const run = (...flags) =>
    spawnSync(
      process.execPath,
      [script, '--package', path.relative(root, pkg), '--translations', path.relative(root, tFile), ...flags],
      { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
    );
  const runEnglishOnly = (...flags) =>
    spawnSync(process.execPath, [script, '--package', path.relative(root, pkg), ...flags], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    });
  const edit = fn => fs.writeFileSync(md, fn(fs.readFileSync(md, 'utf8')));
  return { pkg, md, tFile, run, runEnglishOnly, edit };
}
function withFixture(fn) {
  const f = fixture();
  try {
    fn(f);
  } finally {
    fs.rmSync(f.pkg, { force: true, recursive: true });
  }
}
const data = f => path.join(f.pkg, 'data/skills');
const source = (f, p) => fs.readFileSync(path.join(data(f), p), 'utf8');
const uuid = body => body.match(/\bid: "([0-9a-f-]{36})"/)?.[1];

test('dry-run is default and leaves code and Markdown untouched', () =>
  withFixture(f => {
    const before = fs.readFileSync(f.md, 'utf8');
    const r = f.run();
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /"mode":"dry-run"/);
    assert.equal(fs.existsSync(data(f)), false);
    assert.equal(fs.readFileSync(f.md, 'utf8'), before);
  }));

test('English-only create needs no reviewed translations and keeps locales visibly incomplete', () =>
  withFixture(f => {
    const dry = f.runEnglishOnly();
    assert.equal(dry.status, 0, dry.stderr);
    assert.match(dry.stdout, /"success":5/);
    assert.equal(fs.existsSync(data(f)), false);
    const applied = f.runEnglishOnly('--apply');
    assert.equal(applied.status, 0, applied.stderr);
    assert.match(applied.stdout, /"success":5/);
    const skill = source(f, 'geometry/angles/compareAngles.ts');
    const domain = source(f, 'geometry/index.ts');
    const group = source(f, 'geometry/angles/index.ts');
    const directDomain = source(f, 'music/index.ts');
    assert.match(
      domain,
      /^import \{ defineSkillDomain \} from '@svitlo\/engine\/build';\n\nimport \{ angles \} from '\.\/angles';/,
    );
    assert.match(
      group,
      /^import \{ defineSkillGroup \} from '@svitlo\/engine\/build';\n\nimport \{ compareAngles \} from '\.\/compareAngles';/,
    );
    assert.match(
      directDomain,
      /^import \{ defineSkillDomain \} from '@svitlo\/engine\/build';\n\nimport \{ hearRhythm \} from '\.\/hearRhythm';/,
    );
    assert.match(skill, /^  slug: "compareAngles",$/m);
    assert.match(group, /^  slug: "angles",$/m);
    assert.match(domain, /^  slug: "geometry",$/m);
    assert.match(directDomain, /^  slug: "music",$/m);
    assert.match(skill, /en: "Compare Angles"/);
    assert.match(skill, /en: "Explore this topic\."/);
    assert.match(skill, /name: \{\s*en: /);
    assert.match(skill, /frontend: \{\s*en: /);
    assert.match(skill, /^  name: \{\n    en: "Compare Angles",\n  \},$/m);
    assert.match(skill, /^    frontend: \{\n      en: "Explore this topic\.",\n    \},$/m);
    assert.match(skill, /^import \{ defineSkill \} from '@svitlo\/engine\/build';\n\nexport const compareAngles/m);
    assert.doesNotMatch(skill, /["'](?:en|uk)["']\s*:/);
    assert.match(skill, /methodological: "Definition of Compare Angles\."/);
    assert.match(domain, /en: "Geometry"/);
    assert.doesNotMatch(skill, /uk:|\bas\s+Record\b|\bas\s+any\b/);
    assert.doesNotMatch(domain, /uk:/);
    assert.equal(f.runEnglishOnly('--apply').status, 0, 'Second application should be idempotent');
  }));

test('mixed Domain contains both full SkillGroup and direct Skill entities', () =>
  withFixture(f => {
    f.edit(s =>
      s
        .replace('### Music\n\n', section(4, 'Recognize Shapes', 'recognizeShapes') + '### Music\n\n')
        .replace('Groups: 1 · Skills: 1', 'Groups: 1 · Skills: 2'),
    );
    const r = f.runEnglishOnly('--apply');
    assert.equal(r.status, 0, r.stderr);
    const domain = source(f, 'geometry/index.ts');
    assert.match(domain, /groups: \{/);
    assert.match(domain, /^\s+angles,$/m);
    assert.match(domain, /skills: \{/);
    assert.match(domain, /^\s+recognizeShapes,$/m);
    assert.doesNotMatch(domain, /groupIds|skillIds|_Data\.id/);
    assert.match(source(f, 'geometry/index.ts'), /recognizeShapes/);
    assert.ok(fs.existsSync(path.join(data(f), 'geometry/recognizeShapes.ts')));
  }));

test('English Markdown updates preserve existing non-English translations without a JSON file', () =>
  withFixture(f => {
    assert.equal(f.run('--apply').status, 0);
    const p = 'music/hearRhythm.ts';
    const id = uuid(source(f, p));
    const before = source(f, p);
    f.edit(s =>
      s
        .replace('#### Hear Rhythm\n\nSlug: hearRhythm', '#### Hear Rhythms\n\nSlug: hearRhythm')
        .replace('Slug: hearRhythm\nAction: create', 'Slug: hearRhythm\nAction: update')
        .replace(
          'Methodological description: Definition of Hear Rhythm.\nUser-friendly description: Explore this topic.',
          'Methodological description: Definition of Hear Rhythm.\nUser-friendly description: Explore rhythms together.',
        ),
    );
    const r = f.runEnglishOnly('--apply');
    assert.equal(r.status, 0, r.stderr);
    const after = source(f, p);
    assert.equal(uuid(after), id);
    assert.match(after, /en: "Hear Rhythms"/);
    assert.match(after, /uk: "Translated Hear Rhythm uk"/);
    assert.match(after, /uk: "Frontend Hear Rhythm uk"/);
    assert.match(after, /^    frontend: \{\n      en: "Explore rhythms together\.",\n      zh: /m);
    assert.match(after, /^      uk: "Frontend Hear Rhythm uk",$/m);
    assert.match(after, /^    \},$/m);
    assert.notEqual(after, before);
  }));

test('optional partial reviewed translations only populate the supplied locales', () =>
  withFixture(f => {
    const additions = {
      'geometry/angles/compareAngles': {
        name: { uk: 'Порівнювати кути' },
        frontend: { uk: 'Досліджуй кути.' },
      },
    };
    fs.writeFileSync(f.tFile, JSON.stringify(additions));
    const r = f.run('--apply');
    assert.equal(r.status, 0, r.stderr);
    const translated = source(f, 'geometry/angles/compareAngles.ts');
    assert.match(translated, /en: "Compare Angles"/);
    assert.match(translated, /uk: "Порівнювати кути"/);
    assert.match(translated, /uk: "Досліджуй кути\."/);
    const unreviewed = source(f, 'music/hearRhythm.ts');
    assert.match(unreviewed, /en: "Hear Rhythm"/);
    assert.doesNotMatch(unreviewed, /uk:/);
  }));

test('create emits entity-owned IDs, direct imports and only allowed indexes', () =>
  withFixture(f => {
    const r = f.run('--apply');
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /"success":5/);
    const paths = [
      'geometry/index.ts',
      'geometry/angles/index.ts',
      'geometry/angles/compareAngles.ts',
      'music/index.ts',
      'music/hearRhythm.ts',
    ];
    const ids = new Set();
    for (const p of paths) {
      const content = source(f, p);
      assert.match(content, /defineSkill(Domain|Group)?/);
      const id = uuid(content);
      assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
      ids.add(id);
      assert.match(content, /\bslug\s*:/);
    }
    assert.equal(ids.size, 5);
    assert.match(source(f, 'geometry/index.ts'), /\bangles,/);
    assert.match(source(f, 'geometry/angles/index.ts'), /\bcompareAngles,/);
    assert.doesNotMatch(source(f, 'music/index.ts'), /groups:\s*\{/);
    assert.match(source(f, 'music/index.ts'), /\bhearRhythm,/);
    assert.match(source(f, 'index.ts'), /geometry/);
    assert.match(source(f, 'geometry/angles/index.ts'), /compareAngles/);
    assert.match(source(f, 'music/index.ts'), /hearRhythm/);
    assert.equal(fs.existsSync(path.join(data(f), 'index.ids.ts')), false);
    assert.equal(fs.existsSync(path.join(data(f), 'index.ts')), true);
    assert.equal(fs.readdirSync(f.pkg).includes('Data'), false);
    assert.equal(fs.existsSync(path.join(data(f), 'geometry/index.ts')), true);
    assert.equal(fs.existsSync(path.join(data(f), 'geometry/angles/index.ts')), true);
    assert.match(fs.readFileSync(f.md, 'utf8'), /Status: implemented/);
    assert.match(fs.readFileSync(f.md, 'utf8'), /\[compareAngles.ts\]\(/);
    const before = source(f, 'music/hearRhythm.ts');
    const second = f.run('--apply');
    assert.equal(second.status, 0, second.stderr);
    assert.equal(source(f, 'music/hearRhythm.ts'), before);
  }));

test('update preserves entity UUID, existing locales and unrelated source', () =>
  withFixture(f => {
    assert.equal(f.run('--apply').status, 0);
    const p = 'music/hearRhythm.ts',
      id = uuid(source(f, p));
    const geometry = source(f, 'geometry/index.ts');
    const sourceBefore = source(f, p);
    f.edit(s =>
      s
        .replace(
          'Action: create\nStatus: implemented\n\n[hearRhythm.ts]',
          'Action: update\nStatus: implemented\n\n[hearRhythm.ts]',
        )
        .replace('Definition of Hear Rhythm.', 'Revised concept of Hear Rhythm.'),
    );
    const translations = JSON.parse(fs.readFileSync(f.tFile, 'utf8'));
    delete translations['music/hearRhythm'];
    fs.writeFileSync(f.tFile, JSON.stringify(translations));
    const r = f.run('--apply');
    assert.equal(r.status, 0, r.stderr);
    assert.equal(uuid(source(f, p)), id);
    assert.match(source(f, p), /Revised concept of Hear Rhythm/);
    assert.equal(
      source(f, p).replace('Revised concept of Hear Rhythm.', 'Definition of Hear Rhythm.'),
      sourceBefore,
      'Updating a stable Skill changes only the approved text, not its layout',
    );
    assert.equal(source(f, 'geometry/index.ts'), geometry);
  }));

test('a Skill update does not force unchanged ancestor Data to be regenerated', () =>
  withFixture(f => {
    assert.equal(f.run('--apply').status, 0);
    const beforeDomain = source(f, 'geometry/index.ts');
    const beforeGroup = source(f, 'geometry/angles/index.ts');
    const leaf = 'geometry/angles/compareAngles.ts';
    const beforeId = uuid(source(f, leaf));
    f.edit(s =>
      s
        .replace('Slug: geometry\nAction: create', 'Slug: geometry\nAction: skip')
        .replace('Slug: angles\nAction: create', 'Slug: angles\nAction: skip')
        .replace('Slug: compareAngles\nAction: create', 'Slug: compareAngles\nAction: update')
        .replace('Definition of Compare Angles.', 'Updated angle comparison description.'),
    );
    const r = f.run('--apply');
    assert.equal(r.status, 0, r.stderr);
    assert.equal(source(f, 'geometry/index.ts'), beforeDomain);
    assert.equal(source(f, 'geometry/angles/index.ts'), beforeGroup);
    assert.equal(uuid(source(f, leaf)), beforeId);
    assert.match(source(f, leaf), /Updated angle comparison description/);
  }));

test('invalid supplied translations block only the affected Domain', () =>
  withFixture(f => {
    const loc = JSON.parse(fs.readFileSync(f.tFile, 'utf8'));
    loc['geometry/angles/compareAngles'].frontend.uk = '  ';
    fs.writeFileSync(f.tFile, JSON.stringify(loc));
    const r = f.run('--apply');
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Invalid locales/);
    assert.equal(fs.existsSync(path.join(data(f), 'geometry')), false);
    assert.ok(fs.existsSync(path.join(data(f), 'music/hearRhythm.ts')));
  }));

test('duplicate sibling slug among Domains fails before write', () =>
  withFixture(f => {
    f.edit(s => s.replace('Slug: music', 'Slug: geometry'));
    const r = f.run('--apply');
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Duplicate sibling slug/);
    assert.equal(fs.existsSync(data(f)), false);
  }));

test('implemented source links must resolve to the canonical entity file', () =>
  withFixture(f => {
    assert.equal(f.run('--apply').status, 0);
    const before = source(f, 'music/hearRhythm.ts');
    f.edit(s => s.replace('[hearRhythm.ts]', '[wrong.ts]'));
    const r = f.run('--apply');
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Code link differs from canonical source path/);
    assert.equal(source(f, 'music/hearRhythm.ts'), before);
  }));

test('Action: delete is manual-only; Code/Status are unchanged and independent Domains can update', () =>
  withFixture(f => {
    assert.equal(f.run('--apply').status, 0);
    const music = source(f, 'music/index.ts');
    const musicSkill = source(f, 'music/hearRhythm.ts');
    const geometrySkill = 'geometry/angles/compareAngles.ts';
    const id = uuid(source(f, geometrySkill));
    f.edit(s =>
      s
        .replace('Slug: music\nAction: create\nStatus: implemented', 'Slug: music\nAction: delete\nStatus: implemented')
        .replace(
          'Slug: compareAngles\nAction: create\nStatus: implemented',
          'Slug: compareAngles\nAction: update\nStatus: implemented',
        )
        .replace('Definition of Compare Angles.', 'Updated concept of Compare Angles.'),
    );
    const r = f.run('--apply');
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Manual deletion required/);
    assert.equal(source(f, 'music/index.ts'), music);
    assert.equal(source(f, 'music/hearRhythm.ts'), musicSkill);
    assert.match(fs.readFileSync(f.md, 'utf8'), /Slug: music\nAction: delete\nStatus: implemented/);
    assert.equal(uuid(source(f, geometrySkill)), id);
    assert.match(source(f, geometrySkill), /Updated concept of Compare Angles/);
  }));

test('unsupported --allow-delete is rejected without writing or changing status', () =>
  withFixture(f => {
    const originalMarkdown = fs.readFileSync(f.md, 'utf8');
    const r = f.run('--apply', '--allow-delete');
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Unknown argument: --allow-delete/);
    assert.equal(fs.existsSync(data(f)), false);
    assert.equal(fs.readFileSync(f.md, 'utf8'), originalMarkdown);
  }));

test('invalid update never allocates an identity, and another Domain can succeed', () =>
  withFixture(f => {
    f.edit(s =>
      s.replace(
        'Action: create\nStatus: pending\n\n[Not implemented](#)\n\nMethodological description: Definition of Compare Angles.',
        'Action: update\nStatus: pending\n\n[Not implemented](#)\n\nMethodological description: Definition of Compare Angles.',
      ),
    );
    const r = f.run('--apply');
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /Update requires existing verified entity/);
    assert.ok(fs.existsSync(path.join(data(f), 'music/hearRhythm.ts')));
    assert.equal(fs.existsSync(path.join(data(f), 'geometry')), false);
  }));
