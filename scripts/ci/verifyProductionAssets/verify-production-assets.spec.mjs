import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { affectedEntities, affectedProductionScopes, verifyChangedEntities, changedPaths } from './verify-production-assets.mjs';

const lesson = 'content/math/data/lessons/4/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4';
const course = 'content/math/data/courses/3/bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3';
const file = (root, name, content) => {
  const dest = path.join(root, name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
};

test('deduplicates touched UUID roots and ignores assets/unrelated drafts', () => {
  assert.deepEqual(
    affectedEntities([
      lesson + '/sections/intro/index.ts',
      lesson + '/questions/index.ts',
      course + '/episode/index.ts',
      'content/math/assets/images/something.webp',
      'studio/skills/lesson-workflow/create-lesson-flow.skill.md',
    ]),
    [course, lesson],
  );
  assert.deepEqual(affectedEntities(['content/math/data/skills/index.ts']), []);
});

test('final readiness refuses incomplete Lesson media, bank sidecars and missing sources', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-production-assets-'));
  try {
    file(root, lesson + '/lesson.yaml', 'config:\n  type: lesson\n');
    let findings = verifyChangedEntities(root, [lesson + '/lesson.yaml']);
    assert(findings.some(item => item.includes('missing authored Lesson TypeScript entrypoint')));
    assert(findings.some(item => item.includes('unfinished temporary authoring YAML')));
    file(root, lesson + '/index.ts', 'export const authored = true;\n');
    file(root, lesson + '/flashcards/index.ts',
      '// TODO(asset): incomplete flashcard\n' +
      'const src = "00000000-0000-0000-0000-000000000000.webp";\n');
    file(root, lesson + '/questions.yaml', 'items: {}\n');
    findings = verifyChangedEntities(root, [lesson + '/flashcards/index.ts']);
    assert(findings.some(item => item.includes('flashcards/index.ts:1')));
    assert(findings.some(item => item.includes('flashcards/index.ts:2')));
    assert(!findings.some(item => item.includes('questions.yaml')), 'sibling bank may still be a Draft');
    assert(!findings.some(item => item.includes('lesson.yaml')), 'parent Lesson may still be a Draft');
    findings = verifyChangedEntities(root, [lesson + '/index.ts']);
    assert(findings.some(item => item.includes('questions.yaml')), 'full Lesson release requires all bank sidecars resolved');
    assert(findings.some(item => item.includes('lesson.yaml')));
    fs.rmSync(path.join(root, lesson, 'flashcards'), { recursive: true });
    fs.rmSync(path.join(root, lesson, 'lesson.yaml'));
    fs.rmSync(path.join(root, lesson, 'questions.yaml'));
    assert.deepEqual(verifyChangedEntities(root, [lesson + '/index.ts']), []);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('bank child PR checks its own generated resources and changed Section modules', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-bank-readiness-'));
  try {
    file(root, lesson + '/lesson.yaml', 'config: pending\\n');
    file(root, lesson + '/sections/quiz/index.ts', '// TODO(asset): unresolved quiz figure\\n');
    file(root, lesson + '/questions/index.ts', 'export const questions = {};\\n');
    file(root, lesson + '/flashcards/index.ts', '// TODO(asset): sibling bank draft\\n');
    const changed = [lesson + '/questions/index.ts', lesson + '/sections/quiz/index.ts'];
    assert.equal(affectedProductionScopes(changed)[0].mode, 'banks');
    const findings = verifyChangedEntities(root, changed);
    assert.equal(findings.length, 1);
    assert(findings[0].includes('sections/quiz/index.ts'), 'only changed Quiz source is blocked');
    file(root, lesson + '/sections/quiz/index.ts', 'export const quiz = true;\\n');
    assert.deepEqual(verifyChangedEntities(root, changed), []);
    fs.rmSync(path.join(root, lesson, 'questions', 'index.ts'));
    assert(verifyChangedEntities(root, changed).some(item => item.includes('missing authored questions bank entrypoint')));
    assert.equal(affectedProductionScopes([lesson + '/lesson.yaml', ...changed])[0].mode, 'whole');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Episode Course source media TODOs block release but not unrelated Lessons', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-episode-assets-'));
  try {
    file(root, course + '/index.ts', 'defineEpisode({ locale: { fileName: "00000000-0000-0000-0000-000000000000.mp4" } });\n');
    file(root, lesson + '/index.ts', '// TODO(asset): unrelated draft\n');
    const findings = verifyChangedEntities(root, [course + '/index.ts']);
    assert.equal(findings.length, 1);
    assert(findings[0].includes(course));
    file(root, course + '/index.ts', 'defineEpisode({ locale: { fileName: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa.mp4" } });\n');
    assert.deepEqual(verifyChangedEntities(root, [course + '/index.ts']), []);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('Git comparison requires full SHAs', () => {
  assert.throws(() => changedPaths('main', 'HEAD', '/tmp'), /full Git commit SHAs/);
});
