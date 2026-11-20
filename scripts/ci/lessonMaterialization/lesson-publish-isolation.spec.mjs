import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Run an actual publisher process from a miniature checkout outside the repo.
 * The copied tree has no node_modules, Engine or schema files at any parent.
 */
test('Lesson publish loads and rejects invalid authorization without installed packages', () => {
  const root = fileURLToPath(new URL('../../..', import.meta.url));
  const isolated = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-standalone-publish-'));
  try {
    const files = [
      'scripts/ci/lessonMaterialization/lesson-materialization.mjs',
      'scripts/ci/lessonMaterialization/lesson-gate.mjs',
      'scripts/ci/courseMaterialization/course-gate.mjs',
    ];
    for (const filename of files) {
      const destination = path.join(isolated, filename);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(root, filename), destination);
    }
    const entry = path.join(isolated, files[0]);
    assert.equal(fs.existsSync(path.join(isolated, 'node_modules')), false);
    assert.equal(fs.existsSync(path.join(isolated, 'shared', 'engine')), false);
    const env = { PATH: process.env.PATH ?? '', GITHUB_REPOSITORY: 'KiT-Maverik/svitlo' };
    const imported = spawnSync(process.execPath, ['--input-type=module', '-e',
      'await import(' + JSON.stringify(pathToFileURL(entry).href) + ')'], { cwd: isolated, env, encoding: 'utf8' });
    assert.equal(imported.status, 0, imported.stderr);
    const result = spawnSync(process.execPath, [entry, 'publish'], { cwd: isolated, env, encoding: 'utf8' });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout + result.stderr, /Missing or invalid pinned Lesson authorization metadata/);
    assert.doesNotMatch(result.stdout + result.stderr, /ERR_MODULE_NOT_FOUND|Cannot find package|ajv|node_modules/);
  } finally {
    fs.rmSync(isolated, { recursive: true, force: true });
  }
});
