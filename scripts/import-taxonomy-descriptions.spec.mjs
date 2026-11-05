import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const fixture = fs.mkdtempSync(path.join(root, 'content', '.taxonomy-import-fixture-'));
const docs = path.join(fixture, 'docs/skills/taxonomy.md');
const entity = path.join(fixture, 'src/data/skillsTaxonomy/a/a.data.ts');
const put = (p, value) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, value);
};
const source =
  'export const fixture = buildSkillDomainConfig({\n  id: "4e36cc11-d273-44a4-aa6d-a153c4e53701",\n  name: { en: "Example" },\n});\n';
const md = (label = 'Methodological description: Conceptual domain scope in English.') =>
  '# Test\n\n## DOMAINS\n\n### Example\n\nGroups: 0 · Skills: 1\n\n' +
  '[a.data.ts](../../src/data/skillsTaxonomy/a/a.data.ts)\n\n' +
  label +
  '\nUser-friendly description: Human-facing working-language draft.\n';

const run = (write = false) =>
  spawnSync(
    process.execPath,
    [
      path.join(root, 'scripts/import-taxonomy-descriptions.mjs'),
      '--package',
      path.relative(root, fixture),
      ...(write ? ['--write'] : []),
    ],
    { cwd: root, encoding: 'utf8' },
  );

before(() => {
  put(entity, source);
  put(docs, md());
});
after(() => fs.rmSync(fixture, { recursive: true, force: true }));

test('dry-run leaves source unchanged and write inserts only methodological text', () => {
  const dry = run();
  assert.equal(dry.status, 0, dry.stderr);
  assert.equal(fs.readFileSync(entity, 'utf8'), source);
  const done = run(true);
  assert.equal(done.status, 0, done.stderr);
  const updated = fs.readFileSync(entity, 'utf8');
  assert.match(updated, /description: \{ methodological: "Conceptual domain scope in English\." \}/);
  assert.doesNotMatch(updated, /frontend:/);
  assert.match(updated, /id: "4e36cc11-d273-44a4-aa6d-a153c4e53701"/);
  const again = run(true);
  assert.equal(again.status, 0, again.stderr);
  assert.match(again.stdout, /Updated 0\/1/);
});
test('rejects obsolete unlabeled metadata without modifying Code', () => {
  const beforeValue = fs.readFileSync(entity, 'utf8');
  put(docs, md().replace('Methodological description: Conceptual domain scope in English.', 'Unlabeled description.'));
  const failed = run(true);
  assert.notEqual(failed.status, 0);
  assert.match(failed.stderr, /expected exactly one Methodological description/);
  assert.equal(fs.readFileSync(entity, 'utf8'), beforeValue);
});
