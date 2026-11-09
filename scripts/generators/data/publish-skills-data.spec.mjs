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

test('publishes sparse base and per-language files for every Skill entity', () => {
  const { codes, graph, files } = resources();
  assert.equal(graph.length, 3);
  assert.equal(graph.reduce((n, d) => n + d.groups.length, 0), 5);
  assert.equal(graph.reduce((n, d) => n + d.groups.reduce((m, g) => m + g.skills.length, 0), 0), 9);
  assert.equal(files.size, 17 * (codes.length + 1));
  assert.equal(files.has('index.json'), false);
  assert.equal(files.has('testColors/meta.json'), false);

  const domain = JSON.parse(files.get('testColors/base.json'));
  assert.deepEqual(Object.keys(domain).sort(), ['collection', 'description', 'groups', 'id', 'slug']);
  assert.equal(domain.collection, 'skillDomain');
  assert.equal(domain.description.methodological.includes('Synthetic Playground'), true);
  assert.deepEqual(domain.groups, ['testWarmColors', 'testCoolColors']);

  const group = JSON.parse(files.get('testColors/testWarmColors/base.json'));
  assert.equal(group.collection, 'skillGroup');
  assert.deepEqual(group.skills, ['testRecognizeRed', 'testRecognizeOrange']);

  const skill = JSON.parse(files.get('testColors/testWarmColors/testRecognizeRed/base.json'));
  assert.equal(skill.collection, 'skill');
  assert.equal(typeof skill.description.methodological, 'string');
  assert.equal(typeof skill.id, 'string');

  for (const code of codes) {
    const filename = 'testShapes/testPolygonShapes/testRecognizeTriangle/' + code + '.json';
    const copy = JSON.parse(files.get(filename));
    assert.deepEqual(Object.keys(copy).sort(), ['description', 'name']);
    assert(copy.name.includes('[TEST ' + code + ']'));
    assert(copy.description.frontend.includes('[TEST ' + code + ']'));
    assert.equal(Object.hasOwn(copy, 'id'), false);
    assert.equal(Object.hasOwn(copy, 'slug'), false);
    assert.equal(Object.hasOwn(copy, 'collection'), false);
    assert.equal(Object.hasOwn(copy.description, 'methodological'), false);
    const domainCopy = JSON.parse(files.get('testColors/' + code + '.json'));
    assert.deepEqual(Object.keys(domainCopy).sort(), ['description', 'title']);
  }
  assert.deepEqual(files, renderSkillFiles(graph, codes));
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

test('write/check is deterministic, isolated and removes stale generated files', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-public-'));
  try {
    const output = path.join(temp, 'public/data/skills');
    const { files } = resources();
    assert.equal(checkPublishedFiles(output, files).missing.length, files.size);
    writePublishedFiles(output, files);
    assert.deepEqual(checkPublishedFiles(output, files), { missing: [], changed: [], stale: [] });
    fs.writeFileSync(path.join(output, 'obsolete.json'), '{}');
    assert.deepEqual(checkPublishedFiles(output, files).stale, ['obsolete.json']);
    fs.writeFileSync(path.join(output, 'testColors/base.json'), 'broken');
    assert.deepEqual(checkPublishedFiles(output, files).changed, ['testColors/base.json']);
    writePublishedFiles(output, files);
    assert.deepEqual(checkPublishedFiles(output, files), { missing: [], changed: [], stale: [] });
    assert.equal(fs.existsSync(path.join(output, 'obsolete.json')), false);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
