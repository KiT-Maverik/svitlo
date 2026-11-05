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
  return {
    codes,
    graph: loadSkillGraph(fixture, codes),
    files: renderSkillFiles(loadSkillGraph(fixture, codes), codes),
  };
}

test('publishes one immutable meta and one localization per entity, without index.json', () => {
  const { codes, graph, files } = resources();
  assert.equal(graph.length, 2);
  assert.equal(
    graph.reduce((sum, domain) => sum + domain.groups.length, 0),
    4,
  );
  assert.equal(
    graph.reduce((sum, domain) => sum + domain.groups.reduce((total, group) => total + group.skills.length, 0), 0),
    8,
  );
  assert.equal(files.size, 14 * (codes.length + 1));
  assert.equal(files.has('index.json'), false);

  const domainMeta = JSON.parse(files.get('testColors/meta.json'));
  assert.deepEqual(Object.keys(domainMeta).sort(), ['collection', 'groups', 'id']);
  assert.equal(domainMeta.collection, 'skillDomain');
  assert.deepEqual(domainMeta.groups, ['testCoolColors', 'testWarmColors']);
  const groupMeta = JSON.parse(files.get('testColors/testWarmColors/meta.json'));
  assert.equal(groupMeta.collection, 'skillGroup');
  assert.deepEqual(groupMeta.skills, ['testRecognizeOrange', 'testRecognizeRed']);
  const skillMeta = JSON.parse(files.get('testColors/testWarmColors/testRecognizeRed/meta.json'));
  assert.deepEqual(Object.keys(skillMeta).sort(), ['collection', 'id']);
  assert.equal(skillMeta.collection, 'skill');

  const locale = JSON.parse(files.get('testColors/testWarmColors/testRecognizeRed/uk.json'));
  assert.deepEqual(Object.keys(locale).sort(), ['description', 'name']);
  assert(locale.name.includes('[TEST uk]'));
  assert(locale.description.includes('[TEST uk]'));
  for (const code of codes) {
    const filename = 'testShapes/testPolygonShapes/testRecognizeTriangle/' + code + '.json';
    const copy = JSON.parse(files.get(filename));
    assert.equal(typeof copy.name, 'string');
    assert.equal(typeof copy.description, 'string');
    assert.equal(Object.hasOwn(copy, 'id'), false);
    assert.equal(Object.hasOwn(copy, 'language'), false);
    assert.equal(Object.hasOwn(copy, 'slug'), false);
    assert.equal(Object.hasOwn(copy, 'collection'), false);
  }
  assert(![...files.values()].some(value => value.includes('"methodological"') || value.includes('"frontend"')));
  assert(codes.includes('en') && codes.includes('uk'));
});

test('strictly rejects missing translations, authored slugs and frontend descriptions', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-publishing-'));
  try {
    const copied = path.join(temp, 'skills');
    fs.cpSync(fixture, copied, { recursive: true });
    const target = path.join(copied, 'testColors/testWarmColors/skills/testRecognizeRed.data.ts');
    const original = fs.readFileSync(target, 'utf8');
    function fails(replacement, pattern) {
      assert.notEqual(replacement, original, 'The test mutation must alter input');
      fs.writeFileSync(target, replacement);
      assert.throws(() => loadSkillGraph(copied, languageCodes()), pattern);
    }
    fails(original.replace('    en: "[TEST en] Recognize red",\n', ''), /missing \[en\]/);
    fails(original.replace("  slug: 'testRecognizeRed',\n", ''), /slug/);
    fails(original.replace('    frontend: {', '    fe: {'), /frontend|Unexpected/);
    fails(
      original.replace('      uk: "[TEST uk] Recognize the color red in a simple visual example.",\n', ''),
      /missing \[uk\]/,
    );
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});

test('writes atomically, detects stale/changed files and deletes only the generated tree', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-public-'));
  try {
    const output = path.join(temp, 'public/data/skills');
    const { files } = resources();
    assert.equal(checkPublishedFiles(output, files).missing.length, files.size);
    writePublishedFiles(output, files);
    assert.deepEqual(checkPublishedFiles(output, files), { missing: [], changed: [], stale: [] });
    fs.writeFileSync(path.join(output, 'obsolete.json'), '{}');
    assert.deepEqual(checkPublishedFiles(output, files).stale, ['obsolete.json']);
    fs.writeFileSync(path.join(output, 'testColors/meta.json'), 'broken');
    assert.deepEqual(checkPublishedFiles(output, files).changed, ['testColors/meta.json']);
    writePublishedFiles(output, files);
    assert.deepEqual(checkPublishedFiles(output, files), { missing: [], changed: [], stale: [] });
    assert.equal(fs.existsSync(path.join(output, 'obsolete.json')), false);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
