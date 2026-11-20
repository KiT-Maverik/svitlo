import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { webRoot } from './resolve-selected-textbook.mjs';

const prepare = join(webRoot, 'scripts/prepareTextbook/prepare-textbook.mjs');
const publicRoot = join(webRoot, 'public');
const generatedRoot = join(webRoot, 'src/generated');

function runSelection(name) {
  const result = spawnSync(process.execPath, [prepare], {
    cwd: webRoot,
    env: { ...process.env, SVITLO_TEXTBOOK: name },
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, 'Web must compose ' + name + ': ' + result.stdout + '\n' + result.stderr);
}

test('production preparation switches two independent packages and cleans stale publications', () => {
  try {
    // Both selections invoke the real workspace build, compiled exports,
    // portable Publish CLI, generated bindings, and host locale staging.
    runSelection('web-fixture-alpha');
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

    runSelection('web-fixture-beta');
    assert(!existsSync(join(publicRoot, 'data/lessons/c', lesson, 'base.json')));
    assert(!existsSync(join(publicRoot, 'data/skills/base.json')));
    assert(!existsSync(join(publicRoot, 'data/courses/11111111-1111-4111-8111-000000000113/base.json')));
    assert(!existsSync(join(publicRoot, 'data/questions/a/11111111-1111-4111-8111-00000000012a/base.json')));
    assert(!existsSync(join(publicRoot, 'textbooks/web-fixture-alpha/marker.txt')));
    assert(existsSync(join(publicRoot, 'textbooks/web-fixture-beta/marker.txt')));
    assert.match(readFileSync(join(generatedRoot, 'textbookScenes.ts'), 'utf8'), /No Scene registry in selected package/);
    assert.doesNotMatch(readFileSync(join(generatedRoot, 'textbookStyles.ts'), 'utf8'), /\/styles/);
    assert(existsSync(join(publicRoot, 'data/uiKit/components/uk.json')));
    assert(!existsSync(join(publicRoot, '.svitlo/publish-web-fixture-alpha.json')));
  } finally {
    // Leave the alpha fixture selected for the existing Web build/E2E job.
    runSelection('web-fixture-alpha');
    assert(!existsSync(join(publicRoot, 'textbooks/web-fixture-beta/marker.txt')));
  }
});
