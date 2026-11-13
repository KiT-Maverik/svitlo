import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadPublishedUiKitMessages } from '../dist/publishedUiKitMessages.js';

test('reads published UI Kit component messages from the current language-code location', async () => {
  const root = mkdtempSync(join(tmpdir(), 'svitlo-ui-kit-messages-'));
  const previous = process.cwd();
  try {
    const dir = join(root, 'public/data/uiKit/components');
    mkdirSync(dir, { recursive: true });
    const ukMessages = { lesson: { action: 'Продовжити' } };
    writeFileSync(join(dir, 'uk.json'), JSON.stringify(ukMessages));
    process.chdir(root);
    assert.deepEqual(await loadPublishedUiKitMessages('uk-UA'), ukMessages);
    assert.deepEqual(await loadPublishedUiKitMessages('uk-UA'), ukMessages);
    await assert.rejects(loadPublishedUiKitMessages('ar-SA'), /Missing or invalid published UI Kit messages/);
  } finally {
    process.chdir(previous);
    rmSync(root, { recursive: true, force: true });
  }
});
