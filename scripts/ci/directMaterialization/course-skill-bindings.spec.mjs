import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { courseSkillReferences, resolveTrustedCourseSkills } from './course-skill-bindings.mjs';

const a = '00000000-0000-4000-8000-000000000015';
const b = '00000000-0000-4000-8000-000000000008';
const textbook = 'content/playground';
const input = (refs = [a, b]) => ({
  config: {
    type: 'course',
    params: { outcomes: { skills: refs }, prerequisites: { skills: [b] } },
    content: {
      items: {
        moduleOne: {
          config: { type: 'module', content: { items: {}, order: [] } },
          production: { outcomes: { skills: [a] }, prerequisites: { skills: [] } },
        },
      },
      order: ['moduleOne'],
    },
  },
});

test('Course dependency inventory is deterministic and bound to semantic target arrays', () => {
  assert.deepEqual(courseSkillReferences(input()), [a, b].sort());
  assert.deepEqual(courseSkillReferences(input([])), [a, b].sort());
  assert.throws(() => courseSkillReferences(input(['not-a-uuid'])), /invalid Skill UUID/);
  const nested = input();
  nested.config.content.items.moduleOne.config.content.items.chapterOne = {
    config: { type: 'chapter', params: { prerequisites: { skills: ['cccccccc-cccc-4ccc-8ccc-cccccccccccc'] } },
      content: { items: {}, order: [] } },
    production: { outcomes: { skills: [] }, prerequisites: { skills: [] } },
  };
  nested.config.content.items.moduleOne.config.content.order.push('chapterOne');
  assert.equal(courseSkillReferences(nested).length, 3);
});

test('real Playground Skill taxonomy resolves both canonical leaf exports without candidate code', () => {
  const root = fileURLToPath(new URL('../../../', import.meta.url));
  const bindings = resolveTrustedCourseSkills(input(), textbook, root, root);
  assert.equal(bindings.length, 2);
  assert.equal(bindings.find(x => x.id === a)?.exportName, 'testExplainLightTravel');
  assert.equal(bindings.find(x => x.id === b)?.exportName, 'testRecognizeCircle');
  assert(bindings.every(x => x.importPath.startsWith('#skillsData/')));
  assert(bindings.every(x => /^[a-f0-9]{40}$/.test(x.sourceSha)));
});

test('Skill resolution rejects candidate drift, missing IDs, and duplicate trusted UUIDs', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-skills-'));
  t.after(() => fs.rmSync(root, { force: true, recursive: true }));
  const trusted = path.join(root, 'trusted');
  const candidate = path.join(root, 'candidate');
  fs.mkdirSync(trusted);
  const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8' }).trim();
  git(trusted, 'init', '-q');
  git(trusted, 'config', 'user.name', 'Course Test');
  git(trusted, 'config', 'user.email', 'test@example.invalid');
  const folder = textbook + '/data/skills';
  const leaf = folder + '/test/domainSkill.ts';
  fs.mkdirSync(path.join(trusted, folder, 'test'), { recursive: true });
  fs.writeFileSync(path.join(trusted, folder, 'index.ts'), 'export const registry = true;\n');
  fs.writeFileSync(path.join(trusted, leaf),
    "import { defineSkill } from '@svitlo/engine/build';\n" +
    "export const domainSkill = defineSkill({ id: '" + a + "', slug: 'domainSkill' });\n");
  git(trusted, 'add', '.');
  git(trusted, 'commit', '-qm', 'Canonical Skills');
  git(root, 'clone', '-q', trusted, candidate);
  const refs = input([a]);
  refs.config.params.prerequisites.skills = [];
  refs.config.content.items.moduleOne.production.outcomes.skills = [];
  const entries = resolveTrustedCourseSkills(refs, textbook, candidate, trusted);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].importPath, '#skillsData/test/domainSkill');
  assert.throws(() => resolveTrustedCourseSkills(input([b]), textbook, candidate, trusted), /Unknown|stale|non-Skill/);
  fs.writeFileSync(path.join(candidate, leaf), 'export const forged = true;\n');
  git(candidate, 'add', '.');
  git(candidate, 'commit', '-qm', 'Spoof Skill');
  assert.throws(() => resolveTrustedCourseSkills(refs, textbook, candidate, trusted), /differs from the trusted/);
  fs.writeFileSync(path.join(trusted, folder, 'test/another.ts'),
    "import { defineSkill } from '@svitlo/engine/build';\n" +
    "export const another = defineSkill({ id: '" + a + "', slug: 'another' });\n");
  git(trusted, 'add', '.');
  git(trusted, 'commit', '-qm', 'Duplicate trusted Skill');
  assert.throws(() => resolveTrustedCourseSkills(refs, textbook, trusted, trusted), /duplicate trusted Skill UUID/);
});
