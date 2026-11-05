import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const script = path.join(root, 'shared/ui-kit/scripts/generate-locales.mjs');
const args = ['--package', 'learningApps/playground'];

function generate(...flags) {
  return spawnSync(process.execPath, [script, ...args, ...flags], {
    cwd: root,
    encoding: 'utf8',
  });
}

describe('global UI Kit translation coverage', () => {
  it('audits all 29 required languages without writing generated files', () => {
    const result = generate('--audit');
    assert.equal(result.status, 0, result.stderr);
    const audit = JSON.parse(result.stdout);
    assert.equal(audit.languages, 29);
    assert.equal(audit.componentCount, 10);
    assert.equal(audit.missing.lesson, undefined);
    assert.equal(audit.missing.navbarPreferences, undefined);
    assert.equal(audit.missing.flashcard, undefined);
    assert.equal(audit.missing.checkpoint, undefined);
    assert.ok(audit.missing.learningLayout?.includes('en'));
    assert.ok(audit.missing.questionFrame?.includes('ar'));
  });

  it('refuses strict publishing while required dictionaries are incomplete', () => {
    const result = generate('--strict');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /UI Kit translations incomplete/);
    assert.match(result.stderr, /learningLayout/);
    assert.match(result.stderr, /questionFrame/);
  });
});
