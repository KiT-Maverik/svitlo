import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  languageCodes,
  loadSkillGraph,
  checkPublishedFiles,
  writePublishedFiles,
} from '../../data/publish-skills-data.mjs';
import { renderSkillAnalyticsFiles, measureSkillAnalyticsFiles } from './generate-skill-analytics.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const source = path.join(root, 'content/playground/data/skills');

test('one self-contained Skill Analytics page payload per supported language', () => {
  const codes = languageCodes();
  const graph = loadSkillGraph(source, codes);
  const files = renderSkillAnalyticsFiles(graph, codes);
  assert.equal(files.size, codes.length);
  assert.equal(files.has('index.json'), false);
  const uk = JSON.parse(files.get('uk.json'));
  assert.deepEqual(Object.keys(uk), ['domains']);
  assert.equal(uk.domains.length, 3);
  const light = uk.domains.find(domain => domain.slug === 'testLight');
  assert.equal(light.children.length, 1);
  assert.equal(light.children[0].children[0].slug, 'testExplainLightTravel');
  const domain = uk.domains.find(domain => domain.slug === 'testColors');
  assert.equal(domain.collection, 'skillDomain');
  assert.equal(domain.children.length, 2);
  const group = domain.children.find(child => child.slug === 'testWarmColors');
  assert.equal(group.collection, 'skillGroup');
  assert.equal(group.children.length, 2);
  const skill = group.children.find(child => child.slug === 'testRecognizeRed');
  assert.equal(skill.collection, 'skill');
  assert.equal(typeof skill.name, 'string');
  assert.equal(typeof skill.description, 'string');
  assert.equal(Object.hasOwn(uk, 'language'), false);
  assert.equal(Object.hasOwn(skill, 'methodological'), false);
  assert.equal(Object.hasOwn(skill, 'mastery'), false);
  const metrics = measureSkillAnalyticsFiles(files);
  assert.equal(metrics.count, codes.length);
  assert(metrics.total > metrics.gzip && metrics.gzip > 0);
});

test('output remains deterministic, isolated by locale and strictly validated', () => {
  const codes = languageCodes();
  const graph = loadSkillGraph(source, codes);
  const files = renderSkillAnalyticsFiles(graph, codes);
  assert.deepEqual(files, renderSkillAnalyticsFiles(graph, codes));
  const malformed = structuredClone(graph);
  delete malformed[0].groups[0].skills[0].description.uk;
  assert.throws(() => renderSkillAnalyticsFiles(malformed, codes), /Missing uk frontend description/);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-analytics-'));
  try {
    const dest = path.join(tmp, 'public/data/pages/skillAnalytics');
    writePublishedFiles(dest, files);
    assert.deepEqual(checkPublishedFiles(dest, files), { missing: [], changed: [], stale: [] });
    assert.deepEqual(fs.readdirSync(dest).sort(), codes.map(c => c + '.json').sort());
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
