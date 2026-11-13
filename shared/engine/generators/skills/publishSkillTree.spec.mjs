import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { renderSkillTree, writeSkillFiles, checkSkillFiles } from './publishSkillTree.mjs';

const skill = (id, slug) => ({ id, slug, description: { methodological: slug } });

function publication() {
  return {
    base: {
      colors: {
        id: 'domain-id',
        slug: 'colors',
        description: { methodological: 'Color domain' },
        groups: [
          {
            id: 'group-id',
            slug: 'warm',
            skills: [skill('red-id', 'red'), skill('orange-id', 'orange')],
          },
        ],
      },
      shapes: { id: 'shapes-id', slug: 'shapes', skills: [skill('circle-id', 'circle')] },
    },
    locale: {
      uk: {
        colors: {
          locale: { title: 'Кольори' },
          groups: [
            {
              id: 'group-id',
              slug: 'warm',
              locale: { name: 'Теплі' },
              skills: [
                { ...skill('red-id', 'red'), locale: { name: 'Червоний' } },
                { ...skill('orange-id', 'orange'), locale: { name: 'Помаранчевий' } },
              ],
            },
          ],
        },
        shapes: { locale: { title: 'Фігури' } },
      },
      en: {
        colors: { locale: { title: 'Colors' } },
        shapes: { locale: { title: 'Shapes' } },
      },
    },
  };
}

test('one full base tree and one file per supplied locale, never per entity', () => {
  const ready = publication();
  const before = structuredClone(ready);
  const files = renderSkillTree(ready);
  assert.deepEqual([...files.keys()], ['base.json', 'uk.json', 'en.json']);
  assert.deepEqual(Object.keys(JSON.parse(files.get('base.json'))), ['colors', 'shapes']);
  assert.deepEqual(Object.keys(JSON.parse(files.get('uk.json'))), ['colors', 'shapes']);
  assert.equal(JSON.parse(files.get('base.json')).colors.groups[0].skills[1].slug, 'orange');
  assert.deepEqual(
    JSON.parse(files.get('uk.json')).colors.groups[0].skills[0].locale,
    { name: 'Червоний' },
  );
  assert.deepEqual(ready, before, 'Generator may not mutate completed publication data');
  assert.deepEqual(files, renderSkillTree(ready), 'Output must be deterministic');
});

test('preserves Props-shaped locale fragments and ordered children without adding wrappers', () => {
  const files = renderSkillTree(publication());
  const uk = JSON.parse(files.get('uk.json'));
  assert.deepEqual(Object.keys(uk.colors), ['locale', 'groups']);
  assert.equal(uk.colors.groups[0].skills[0].slug, 'red');
  assert.equal(uk.colors.groups[0].skills[1].slug, 'orange');
  assert.equal(uk.colors.groups[0].locale.name, 'Теплі');
  assert.equal(uk.colors.locale.title, 'Кольори');
  assert(!Object.hasOwn(uk, 'locale'), 'Do not wrap an already prepared locale body');
});

test('does not synthesize locale files for invariant-only publications', () => {
  const base = publication().base;
  assert.deepEqual([...renderSkillTree({ base }).keys()], ['base.json']);
  assert.deepEqual(
    [...renderSkillTree({ base, locale: { uk: undefined } }).keys()],
    ['base.json'],
  );
});

test('rejects malformed outputs and JSON-lossy or unsafe payloads', () => {
  const base = publication().base;
  assert.throws(() => renderSkillTree({ base: {} }), /nonempty/);
  assert.throws(() => renderSkillTree({ base, locale: { '../uk': {} } }), /Invalid Skill language/);
  assert.throws(() => renderSkillTree({ base, locale: { uk: {} } }), /Empty Skill translation/);
  assert.throws(() => renderSkillTree({ base: { colors: { value: undefined } } }), /Non-JSON value/);
  assert.throws(() => renderSkillTree({ base: { colors: { value: Number.NaN } } }), /Nonfinite value/);
  assert.throws(() => renderSkillTree({ base: { colors: { value: () => true } } }), /Non-JSON value/);
  const cycle = {};
  cycle.self = cycle;
  assert.throws(() => renderSkillTree({ base: { colors: cycle } }), /Circular reference/);
});

test('write/check owns only its output folder and removes stale nested legacy files', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-tree-'));
  try {
    const output = path.join(temp, 'data/skills');
    const sibling = path.join(temp, 'data/lessons/base.json');
    fs.mkdirSync(path.dirname(sibling), { recursive: true });
    fs.writeFileSync(sibling, '{"keep":true}\n');
    const files = renderSkillTree(publication());
    assert.equal(checkSkillFiles(output, files).missing.length, files.size);
    writeSkillFiles(output, files);
    assert.deepEqual(checkSkillFiles(output, files), { missing: [], changed: [], stale: [] });

    const stale = path.join(output, 'colors/warm/red/base.json');
    fs.mkdirSync(path.dirname(stale), { recursive: true });
    fs.writeFileSync(stale, '{}');
    fs.writeFileSync(path.join(output, 'uk.json'), 'stale');
    assert.deepEqual(checkSkillFiles(output, files).changed, ['uk.json']);
    assert.deepEqual(checkSkillFiles(output, files).stale, ['colors/warm/red/base.json']);
    writeSkillFiles(output, files);

    assert.deepEqual(fs.readdirSync(output).sort(), ['base.json', 'uk.json', 'en.json'].sort());
    assert.deepEqual(checkSkillFiles(output, files), { missing: [], changed: [], stale: [] });
    assert.equal(fs.readFileSync(sibling, 'utf8'), '{"keep":true}\n');
    assert.equal(fs.existsSync(path.join(output, 'colors')), false);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});

test('refuses traversal filenames and symlink output trees', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-tree-safe-'));
  try {
    const output = path.join(temp, 'skills');
    assert.throws(
      () => writeSkillFiles(output, new Map([['base.json', '{}'], ['../escape.json', '{}']])),
      /Invalid Skills output filename/,
    );
    fs.symlinkSync(temp, output, 'dir');
    assert.throws(() => writeSkillFiles(output, renderSkillTree(publication())), /Refusing to replace/);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
