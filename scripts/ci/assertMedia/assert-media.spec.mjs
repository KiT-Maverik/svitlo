import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { targetWorkspaces, assertPublishedResources } from './assert-media.mjs';

const lessonId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4';
const courseId = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb3';
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-assert-media-'));
  const workspace = 'content/math';
  fs.mkdirSync(path.join(root, workspace, 'dist/static'), { recursive: true });
  fs.writeFileSync(path.join(root, workspace, 'package.json'),
    JSON.stringify({ name: '@svitlo/math', scripts: { 'package:build': 'echo built' } }));
  return { root, workspace };
}
function publish(root, workspace, files) {
  const dist = path.join(root, workspace, 'dist');
  for (const filename of files) {
    const destination = path.join(dist, 'static', filename);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, '{"ok":true}\n');
  }
  fs.writeFileSync(path.join(dist, 'manifest.json'),
    JSON.stringify({ textbook: 'math', files }));
}
function cleanup(root, fn) {
  try { fn(); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('targets only changed content Lesson, Course and textbook physical media', () => {
  const targets = targetWorkspaces([
    'content/math/data/lessons/4/' + lessonId + '/index.ts',
    'content/math/data/lessons/4/' + lessonId + '/questions/index.ts',
    'content/math/assets/images/cccccccc-cccc-4ccc-8ccc-cccccccccccc.webp',
    'content/languages/uk/data/courses/3/' + courseId + '/index.ts',
    'content/math/data/skills/multiplication.data.ts',
    'studio/skills/lesson-workflow/README.md',
  ]);
  assert.deepEqual(targets.map(value => value.workspace), ['content/languages/uk', 'content/math']);
  assert.deepEqual([...targets[0].kinds], ['courses']);
  assert.deepEqual([...targets[1].kinds].sort(), ['assets', 'lessons']);
  assert.deepEqual([...targets[1].entities], ['lessons/' + lessonId]);
  assert.deepEqual([...targets[0].entities], ['courses/' + courseId]);
  assert.deepEqual(targetWorkspaces(['studio/README.md', 'content/math/data/skills/index.ts']), []);
});

test('accepts published Lesson/Course Props and actual staged files', () => {
  const { root, workspace } = fixture();
  cleanup(root, () => {
    const target = targetWorkspaces([
      workspace + '/data/lessons/4/' + lessonId + '/index.ts',
      workspace + '/data/courses/courseDemo.data.ts',
      workspace + '/assets/images/example.webp',
    ])[0];
    publish(root, workspace, [
      'data/lessons/4/' + lessonId + '/base.json',
      'data/courses/' + courseId + '/base.json',
      'textbooks/math/assets/images/example.webp',
    ]);
    const result = assertPublishedResources(root, target);
    assert.equal(result.packageName, '@svitlo/math');
    assert.equal(result.count, 3);
    assert.equal(result.entities, 1);
  });
});

test('rejects missing generated Props for the actual changed entity', () => {
  const { root, workspace } = fixture();
  cleanup(root, () => {
    const target = targetWorkspaces([workspace + '/data/lessons/4/' + lessonId + '/index.ts'])[0];
    publish(root, workspace, ['data/lessons/4/' + courseId + '/base.json']);
    assert.throws(() => assertPublishedResources(root, target), /changed lessons UUID has no generated base Props/i);
  });
});

test('rejects missing, empty, duplicate, or path-escaping published files', () => {
  const { root, workspace } = fixture();
  cleanup(root, () => {
    const target = targetWorkspaces([workspace + '/assets/images/something.webp'])[0];
    publish(root, workspace, ['textbooks/math/assets/images/example.webp']);
    assert.equal(assertPublishedResources(root, target).count, 1);
    fs.rmSync(path.join(root, workspace, 'dist/static/textbooks/math/assets/images/example.webp'));
    assert.throws(() => assertPublishedResources(root, target), /Missing\/empty\/non-file/);
    publish(root, workspace, ['textbooks/math/assets/images/example.webp']);
    fs.writeFileSync(path.join(root, workspace, 'dist/static/textbooks/math/assets/images/example.webp'), '');
    assert.throws(() => assertPublishedResources(root, target), /Missing\/empty\/non-file/);
    publish(root, workspace, ['textbooks/math/assets/images/example.webp']);
    fs.writeFileSync(path.join(root, workspace, 'dist/manifest.json'),
      JSON.stringify({ files: ['textbooks/math/assets/images/example.webp', 'textbooks/math/assets/images/example.webp'] }));
    assert.throws(() => assertPublishedResources(root, target), /Duplicate resource/);
    fs.writeFileSync(path.join(root, workspace, 'dist/manifest.json'),
      JSON.stringify({ files: ['textbooks/math/../../../../secrets.txt'] }));
    assert.throws(() => assertPublishedResources(root, target), /Unsafe or invalid/);
  });
});

test('GitHub label assertion reacts to Ready, later labeling, and pushed updates', () => {
  const workflow = fs.readFileSync(
    fileURLToPath(new URL('../../../.github/workflows/assert-media.yml', import.meta.url)), 'utf8');
  assert.match(workflow, /ready_for_review/);
  assert.match(workflow, /labeled/);
  assert.match(workflow, /synchronize/);
  assert.match(workflow, /'assert: media'/);
  assert.match(workflow, /!github\.event\.pull_request\.draft/);
  assert.match(workflow, /github\.event\.pull_request\.base\.ref == 'main'/);
});
