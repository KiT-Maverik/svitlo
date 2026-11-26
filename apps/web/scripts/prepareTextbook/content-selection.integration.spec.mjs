import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, rmdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { webRoot } from './resolve-selected-textbook.mjs';

const prepare = join(webRoot, 'scripts/prepareTextbook/prepare-textbook.mjs');
const publicRoot = join(webRoot, 'public');
const generatedRoot = join(webRoot, 'src/generated');
const repoRoot = join(webRoot, '../..');

function assertPublicationDoesNotDirtyGit() {
  // Compiled resources may be replaced on every selection; they must not be tracked.
  const tracked = spawnSync('git', ['ls-files', '--', 'apps/web/public/.svitlo', 'apps/web/public/textbooks'], {
    cwd: repoRoot,
    encoding: 'utf8',
  });
  assert.equal(tracked.status, 0, tracked.stderr);
  assert.equal(tracked.stdout.trim(), '', 'Web textbook publication outputs must not be tracked in Git');

  // Production Quality refuses package-build reuse when *any* tracked input changes.
  if (process.env.SVITLO_CI_PACKAGE_BUILD_STATE) {
    const clean = spawnSync('git', ['diff', '--quiet', 'HEAD', '--'], { cwd: repoRoot });
    assert.equal(clean.status, 0, 'Web publication must leave the Git checkout clean for verified build reuse');
  }
}

function runSelection(name) {
  const result = spawnSync(process.execPath, [prepare], {
    cwd: webRoot,
    env: { ...process.env, SVITLO_TEXTBOOK: name },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, 'Web must compose ' + name + ': ' + result.stdout + '\n' + result.stderr);
}

test('production preparation switches two independent packages and cleans stale publications', () => {
  const fixtureCourse = join(publicRoot, 'data/courses/11111111-1111-4111-8111-000000000113');
  const orphanCourse = join(publicRoot, 'data/courses/11111111-1111-4111-8111-000000000114');
  const hostNote = join(publicRoot, 'textbooks/web-fixture-alpha/host-owned-note.txt');
  const orphanNote = join(orphanCourse, 'unowned.txt');
  try {
    assertPublicationDoesNotDirtyGit();
    // Both selections invoke the real workspace build, compiled exports,
    // portable Publish CLI, generated bindings, and host locale staging.
    runSelection('web-fixture-alpha');
    assertPublicationDoesNotDirtyGit();
    const lesson = '11111111-1111-4111-8111-00000000011c';
    assert(existsSync(join(publicRoot, 'data/lessons/c', lesson, 'base.json')));
    assert(existsSync(join(publicRoot, 'data/skills/base.json')));
    assert(existsSync(join(publicRoot, 'data/courses/11111111-1111-4111-8111-000000000113/base.json')));
    assert(existsSync(join(publicRoot, 'data/questions/a/11111111-1111-4111-8111-00000000012a/base.json')));
    assert(existsSync(join(publicRoot, 'textbooks/web-fixture-alpha/marker.txt')));
    assert.match(readFileSync(join(generatedRoot, 'textbookScenes.ts'), 'utf8'), /@svitlo\/web-fixture-alpha\/scenes/);
    assert.match(readFileSync(join(generatedRoot, 'textbookStyles.ts'), 'utf8'), /@svitlo\/web-fixture-alpha\/styles/);
    const en = JSON.parse(readFileSync(join(publicRoot, 'data/lessons/c', lesson, 'en.json'), 'utf8'));
    assert.equal(en.locale.title, 'Controlled Lesson');
    assert.equal(en.section[0].content[2].locale.value, 'Controlled interactive scene');

    // Host-owned and unrelated files must survive an ownership-based switch.
    mkdirSync(orphanCourse, { recursive: true });
    writeFileSync(orphanNote, 'host-controlled');
    writeFileSync(hostNote, 'host-controlled');

    runSelection('web-fixture-beta');
    assertPublicationDoesNotDirtyGit();
    assert(!existsSync(join(publicRoot, 'data/lessons/c', lesson, 'base.json')));
    assert(!existsSync(join(publicRoot, 'data/skills/base.json')));
    assert(!existsSync(join(fixtureCourse, 'base.json')));
    assert(!existsSync(fixtureCourse), 'obsolete Course UUID folder must be pruned once empty');
    assert(!existsSync(join(publicRoot, 'data/lessons/c', lesson)), 'obsolete Lesson UUID folder must be pruned');
    assert(existsSync(join(publicRoot, 'data/courses')), 'shared Course collection root must remain');
    assert(existsSync(join(publicRoot, 'data/lessons')), 'shared Lesson collection root must remain');
    assert(existsSync(orphanNote), 'unowned Course resource must not be removed');
    assert(existsSync(hostNote), 'nonempty former textbook directory must not be removed');
    assert(!existsSync(join(publicRoot, 'data/questions/a/11111111-1111-4111-8111-00000000012a/base.json')));
    assert(!existsSync(join(publicRoot, 'textbooks/web-fixture-alpha/marker.txt')));
    assert(existsSync(join(publicRoot, 'textbooks/web-fixture-beta/marker.txt')));
    assert.match(
      readFileSync(join(generatedRoot, 'textbookScenes.ts'), 'utf8'),
      /No Scene registry in selected package/,
    );
    assert.doesNotMatch(readFileSync(join(generatedRoot, 'textbookStyles.ts'), 'utf8'), /\/styles/);
    assert(existsSync(join(publicRoot, 'data/uiKit/components/uk.json')));
    assert(!existsSync(join(publicRoot, '.svitlo/publish-web-fixture-alpha.json')));
  } finally {
    rmSync(hostNote, { force: true });
    rmSync(orphanNote, { force: true });
    if (existsSync(orphanCourse)) rmdirSync(orphanCourse);
    // Leave the alpha fixture selected for the existing Web build/E2E job.
    runSelection('web-fixture-alpha');
    assertPublicationDoesNotDirtyGit();
    assert(!existsSync(join(publicRoot, 'textbooks/web-fixture-beta/marker.txt')));
  }
});
