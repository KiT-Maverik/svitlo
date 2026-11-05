import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const require = createRequire(import.meta.url);
const { DEFAULT_SUPPORTED_LANGUAGES } = require('@svitlo/contracts/localization');
const script = path.join(root, 'shared/ui-kit/scripts/generate-locales.mjs');
const target = 'learningApps/playground';
const output = path.join(root, target, 'public/data/ui-kit');

function generate(...flags) {
  return spawnSync(process.execPath, [script, '--package', target, ...flags], {
    cwd: root,
    encoding: 'utf8',
  });
}

describe('global UI Kit translation coverage', () => {
  it('audits complete coverage of every canonical language and component', () => {
    const result = generate('--audit');
    assert.equal(result.status, 0, result.stderr);
    const audit = JSON.parse(result.stdout);
    assert.equal(audit.languages, DEFAULT_SUPPORTED_LANGUAGES.length);
    assert.equal(audit.componentCount, 10);
    assert.equal(audit.missingCount, 0, JSON.stringify(audit.missing));
    assert.deepEqual(audit.missing, {});
  });

  it('publishes exactly one complete UI Kit dictionary per locale without fallback', () => {
    const result = generate();
    assert.equal(result.status, 0, result.stderr);
    const meta = JSON.parse(readFileSync(path.join(output, 'meta.json'), 'utf8'));
    assert.deepEqual(
      meta.locales,
      DEFAULT_SUPPORTED_LANGUAGES.map(({ locale }) => locale),
    );
    assert.equal(meta.components.length, 10);

    for (const { locale } of DEFAULT_SUPPORTED_LANGUAGES) {
      const messages = JSON.parse(readFileSync(path.join(output, locale + '.json'), 'utf8'));
      assert.deepEqual(Object.keys(messages).sort(), [...meta.components].sort(), locale);
    }

    const ar = JSON.parse(readFileSync(path.join(output, 'ar-SA.json'), 'utf8'));
    const en = JSON.parse(readFileSync(path.join(output, 'en-US.json'), 'utf8'));
    const uk = JSON.parse(readFileSync(path.join(output, 'uk-UA.json'), 'utf8'));
    const qm = JSON.parse(readFileSync(path.join(output, 'crh-Latn-UA.json'), 'utf8'));
    assert.notEqual(ar.learningLayout.navigation.top, uk.learningLayout.navigation.top);
    assert.notEqual(ar.questionFrame.matchInstructions, en.questionFrame.matchInstructions);
    assert.notEqual(ar.image.retry, en.image.retry);
    assert.equal(en.learningLayout.actions.skip, 'Skip');
    assert.equal(uk.learningLayout.actions.skip, 'Пропустити');
    assert.equal(qm.questionFrame.check, 'Tekşer');
  });
});
