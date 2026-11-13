import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { planSkillsMigration, runMigration } from './migrate-skills-configurators.mjs';

const fixture = {
  'artistic/artistic.data.ts': `import { buildSkillDomainConfig } from '@svitlo/engine';
import { seeing_SkillGroup_Data } from './seeing/seeing.data';
export const artistic_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'artistic', id: '013a7a2a-8e50-4424-9c32-32915b51cd45',
  name: { en: 'Art', uk: 'Мистецтво' },
  groups: { seeing: seeing_SkillGroup_Data },
  description: { methodological: 'Express meaning', frontend: { en: 'Art', uk: 'Мистецтво' } },
});
`,
  'artistic/seeing/seeing.data.ts': `import { buildSkillGroupConfig } from '@svitlo/engine';
import { look_Skill_Data } from './skills';
export const seeing_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'seeing', id: '7b4b3464-c383-4a38-b5a3-80942fa21937',
  name: { en: 'Seeing', uk: 'Бачити' },
  skills: { look: look_Skill_Data },
  description: { methodological: 'Perception', frontend: { en: 'Looking', uk: 'Погляд' } },
});
`,
  'artistic/seeing/skills/look.data.ts': `import { buildSkillConfig } from '@svitlo/engine';
export const look_Skill_Data = buildSkillConfig({
  slug: 'look', id: 'cb6e249e-37cc-4241-83a0-91760639c1a2',
  name: { en: 'Look', uk: 'Дивитися' },
  description: { methodological: 'Visual perception', frontend: { en: 'Look', uk: 'Дивитися' } },
});
`,
  'index.ts': `export { artistic_SkillDomain_Data } from './artistic/artistic.data';
`,
  'artistic/seeing/skills/index.ts': `export { look_Skill_Data } from './look.data';
`,
};
function writeTree(root, files) {
  for (const [name, value] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), value);
  }
}
function sandbox(fn) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-configurators-'));
  try {
    const root = path.join(tmp, 'skills');
    writeTree(root, fixture);
    return fn(root, tmp);
  } finally {
    fs.rmSync(tmp, { force: true, recursive: true });
  }
}
test('dry-run preserves original sources; isolated preview upgrades all three levels and is idempotent', () => {
  sandbox((root, dir) => {
    const old = new Map(Object.keys(fixture).map(p => [p, fs.readFileSync(path.join(root, p), 'utf8')]));
    const plan = planSkillsMigration(root);
    assert.equal(plan.files.length, 3);
    assert.equal(plan.changed, 3);
    const preview = path.join(dir, 'preview');
    runMigration({ root, preview });
    assert.equal(planSkillsMigration(preview).changed, 0);
    for (const [name, content] of old) assert.equal(fs.readFileSync(path.join(root, name), 'utf8'), content);
    assert.match(
      fs.readFileSync(path.join(preview, 'artistic/artistic.data.ts'), 'utf8'),
      /defineSkillDomain\(\{[\s\S]*title: \{ en: 'Art'/,
    );
    assert.match(
      fs.readFileSync(path.join(preview, 'artistic/artistic.data.ts'), 'utf8'),
      /groups: \[ seeing_SkillGroup_Data \]/,
    );
    assert.match(
      fs.readFileSync(path.join(preview, 'artistic/seeing/seeing.data.ts'), 'utf8'),
      /skills: \[ look_Skill_Data \]/,
    );
    for (const [name, content] of old)
      if (name.endsWith('index.ts')) assert.equal(fs.readFileSync(path.join(preview, name), 'utf8'), content);
  });
});
test('write only changes intended declarations and rerun makes zero changes', () => {
  sandbox(root => {
    runMigration({ root, write: true });
    assert.equal(planSkillsMigration(root).changed, 0);
    assert.match(fs.readFileSync(path.join(root, 'artistic/seeing/skills/look.data.ts'), 'utf8'), /defineSkill\(/);
  });
});
test('missing child refuses all writes', () => {
  sandbox(root => {
    fs.rmSync(path.join(root, 'artistic/seeing/skills/look.data.ts'));
    assert.throws(() => runMigration({ root, write: true }), /Missing referenced child/);
    assert.match(fs.readFileSync(path.join(root, 'artistic/artistic.data.ts'), 'utf8'), /buildSkillDomainConfig/);
  });
});
test('unknown field refuses destructive conversion', () => {
  sandbox(root => {
    const file = path.join(root, 'artistic/artistic.data.ts');
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('name: {', 'customField: true, name: {'));
    assert.throws(() => runMigration({ root, write: true }), /Unexpected config field/);
  });
});

const art = path.resolve(import.meta.dirname, '../../../../content/art/data/skills');
test(
  'real Art taxonomy: complete non-destructive preview retains entity identities and dictionaries',
  { skip: !fs.existsSync(art) },
  () => {
    const baseline = planSkillsMigration(art);
    assert(baseline.files.length > 300, 'Art unexpectedly lost Skills');
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-art-migration-'));
    try {
      const preview = path.join(temp, 'skills');
      runMigration({ root: art, preview });
      const result = planSkillsMigration(preview);
      assert.equal(result.changed, 0);
      assert.deepEqual(result.counts, baseline.counts);
      assert.deepEqual(
        new Map(baseline.files.map(item => [path.relative(art, item.file), item.id])),
        new Map(result.files.map(item => [path.relative(preview, item.file), item.id])),
      );
      // The only allowed source edits: configurator/import names, Domain name→title,
      // and replacement of keyed child maps by ordered configurator arrays.
      for (const item of baseline.files) {
        const next = fs.readFileSync(path.join(preview, path.relative(art, item.file)), 'utf8');
        assert.equal(next, item.result);
        assert.doesNotMatch(next, /\bbuildSkill(?:Domain|Group)?Config\b/);
      }
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  },
);
