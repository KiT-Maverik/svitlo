import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import {
  languageCodes,
  loadSkillGraph,
  renderSkillFiles,
  writePublishedFiles,
  checkPublishedFiles,
} from './publish-skills-data.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const fixture = path.join(repo, 'content/playground/data/skills');

function resources() {
  const codes = languageCodes();
  const graph = loadSkillGraph(fixture, codes);
  return { codes, graph, files: renderSkillFiles(graph, codes) };
}

function deepMerge(base, localized) {
  if (!localized || typeof localized !== 'object' || Array.isArray(localized)) return localized;
  const merged = { ...base };
  for (const [key, value] of Object.entries(localized)) {
    merged[key] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? deepMerge(merged[key] ?? {}, value)
        : value;
  }
  return merged;
}

test('publishes one complete base tree and exactly one sparse tree per supported language', () => {
  const { codes, graph, files } = resources();
  assert.equal(graph.length, 3);
  assert.equal(graph.reduce((n, d) => n + (d.groups?.length ?? 0), 0), 5);
  assert.equal(graph.reduce((n, d) => n + (d.groups ?? []).reduce((m, g) => m + g.skills.length, 0), 0), 9);
  assert.equal(files.size, codes.length + 1);
  assert.deepEqual([...files.keys()], ['base.json', ...codes.map(code => code + '.json')]);

  const base = JSON.parse(files.get('base.json'));
  assert.deepEqual(Object.keys(base), ['testColors', 'testShapes', 'testLight']);
  const domain = base.testColors;
  assert.deepEqual(Object.keys(domain), ['id', 'collection', 'description', 'groups']);
  assert.equal(domain.collection, 'skillDomain');
  assert(domain.description.methodological.includes('Synthetic Playground'));
  assert.deepEqual(Object.keys(domain.groups), ['testWarmColors', 'testCoolColors']);

  const group = domain.groups.testWarmColors;
  assert.equal(group.collection, 'skillGroup');
  assert.deepEqual(Object.keys(group.skills), ['testRecognizeRed', 'testRecognizeOrange']);

  const skill = group.skills.testRecognizeRed;
  assert.equal(skill.collection, 'skill');
  assert.equal(typeof skill.description.methodological, 'string');
  assert.equal(typeof skill.id, 'string');
  assert(!Object.hasOwn(skill, 'slug'));
  assert(!Object.hasOwn(skill, 'name'));
  assert(!Object.hasOwn(skill.description, 'frontend'));

  for (const code of codes) {
    const copy = JSON.parse(files.get(code + '.json'));
    assert.deepEqual(Object.keys(copy), Object.keys(base));
    const domainCopy = copy.testColors;
    assert.deepEqual(Object.keys(domainCopy), ['title', 'description', 'groups']);
    assert.deepEqual(Object.keys(domainCopy.groups), Object.keys(domain.groups));
    const groupCopy = domainCopy.groups.testWarmColors;
    assert.deepEqual(Object.keys(groupCopy.skills), Object.keys(group.skills));
    const skillCopy = groupCopy.skills.testRecognizeRed;
    assert.deepEqual(Object.keys(skillCopy), ['name', 'description']);
    assert(skillCopy.name.includes('[TEST ' + code + ']'));
    assert(skillCopy.description.frontend.includes('[TEST ' + code + ']'));
    assert(!Object.hasOwn(skillCopy, 'id'));
    assert(!Object.hasOwn(skillCopy, 'collection'));
    assert(!Object.hasOwn(skillCopy.description, 'methodological'));
    assert(!JSON.stringify(copy).includes(skill.id), 'Locale must not duplicate immutable UUIDs');
  }
  assert.deepEqual(files, renderSkillFiles(graph, codes));
});

test('recursive merge restores a localized hierarchy while preserving IDs, metadata and order', () => {
  const { files } = resources();
  const base = JSON.parse(files.get('base.json'));
  const uk = JSON.parse(files.get('uk.json'));
  const merged = deepMerge(base, uk);
  const domain = merged.testColors;
  assert.deepEqual(Object.keys(merged), ['testColors', 'testShapes', 'testLight']);
  assert.deepEqual(Object.keys(domain.groups), ['testWarmColors', 'testCoolColors']);
  assert.deepEqual(Object.keys(domain.groups.testWarmColors.skills), ['testRecognizeRed', 'testRecognizeOrange']);
  assert.equal(domain.collection, 'skillDomain');
  assert.equal(domain.title, '[TEST uk] Color recognition');
  assert.equal(domain.description.methodological, base.testColors.description.methodological);
  const skill = domain.groups.testWarmColors.skills.testRecognizeRed;
  assert.equal(skill.id, base.testColors.groups.testWarmColors.skills.testRecognizeRed.id);
  assert.equal(skill.collection, 'skill');
  assert(skill.name.includes('[TEST uk]'));
  assert(skill.description.frontend.includes('[TEST uk]'));
  assert.equal(skill.description.methodological, base.testColors.groups.testWarmColors.skills.testRecognizeRed.description.methodological);
});

test('preserves source order from root exports and nested configurator arrays, not alphabetical paths', () => {
  const { graph, files } = resources();
  assert.deepEqual(graph.map(domain => domain.slug), ['testColors', 'testShapes', 'testLight']);
  const colors = graph[0];
  assert.deepEqual(colors.groups.map(group => group.slug), ['testWarmColors', 'testCoolColors']);
  assert.deepEqual(colors.groups[0].skills.map(skill => skill.slug), ['testRecognizeRed', 'testRecognizeOrange']);
  const base = JSON.parse(files.get('base.json'));
  assert.deepEqual(Object.keys(base), graph.map(domain => domain.slug));
  assert.deepEqual(Object.keys(base.testColors.groups), colors.groups.map(group => group.slug));
  assert.deepEqual(Object.keys(base.testColors.groups.testWarmColors.skills), colors.groups[0].skills.map(skill => skill.slug));
});

test('supports Domains with both direct Skills and Groups without duplicating the children', () => {
  const { codes, graph } = resources();
  const mixed = structuredClone(graph);
  const direct = structuredClone(mixed[0].groups[0].skills[0]);
  direct.slug = 'testDirect';
  direct.id = '00000000-0000-4000-8000-000000000099';
  mixed[0].skills = [direct];
  const files = renderSkillFiles(mixed, codes);
  const base = JSON.parse(files.get('base.json'));
  const uk = JSON.parse(files.get('uk.json'));
  assert.equal(base.testColors.skills.testDirect.id, direct.id);
  assert.equal(base.testColors.skills.testDirect.collection, 'skill');
  assert(!Object.hasOwn(base.testColors.skills.testDirect, 'slug'));
  assert.equal(uk.testColors.skills.testDirect.name, direct.name.uk);
  assert.equal(uk.testColors.skills.testDirect.description.frontend, direct.description.uk);
  assert.equal(files.size, codes.length + 1);
});

test('strictly rejects missing translations, slugs and frontend descriptions', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-publishing-'));
  try {
    const copied = path.join(temp, 'skills');
    fs.cpSync(fixture, copied, { recursive: true });
    const target = path.join(copied, 'testColors/testWarmColors/skills/testRecognizeRed.data.ts');
    const original = fs.readFileSync(target, 'utf8');
    function fails(replacement, pattern) {
      assert.notEqual(replacement, original);
      fs.writeFileSync(target, replacement);
      assert.throws(() => loadSkillGraph(copied, languageCodes()), pattern);
    }
    fails(original.replace(/\s+en: '\[TEST en\] Recognize red',/, ''), /missing \[en\]/);
    fails(original.replace(/\s+slug: 'testRecognizeRed',/, ''), /slug/);
    fails(original.replace('frontend: {', 'fe: {'), /frontend|Unexpected/);
    fails(
      original.replace(/\s+uk: '\[TEST uk\] Recognize the color red in a simple visual example\.',/, ''),
      /missing \[uk\]/,
    );
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});

test('write/check publishes 30 flat files and removes obsolete per-entity directories', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-public-'));
  try {
    const output = path.join(temp, 'public/data/skills');
    const { codes, files } = resources();
    assert.equal(checkPublishedFiles(output, files).missing.length, files.size);
    writePublishedFiles(output, files);
    assert.deepEqual(checkPublishedFiles(output, files), { missing: [], changed: [], stale: [] });
    assert.deepEqual(fs.readdirSync(output).sort(), ['base.json', ...codes.map(code => code + '.json')].sort());

    const legacy = path.join(output, 'testColors/testWarmColors/testRecognizeRed/base.json');
    fs.mkdirSync(path.dirname(legacy), { recursive: true });
    fs.writeFileSync(legacy, '{}');
    assert.deepEqual(checkPublishedFiles(output, files).stale, ['testColors/testWarmColors/testRecognizeRed/base.json']);
    fs.writeFileSync(path.join(output, 'base.json'), 'broken');
    assert.deepEqual(checkPublishedFiles(output, files).changed, ['base.json']);
    writePublishedFiles(output, files);
    assert.deepEqual(checkPublishedFiles(output, files), { missing: [], changed: [], stale: [] });
    assert.equal(fs.existsSync(path.join(output, 'testColors')), false);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
