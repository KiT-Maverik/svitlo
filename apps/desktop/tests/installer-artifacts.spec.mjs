import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const extensions = {
  linux: '.AppImage',
  darwin: '.dmg',
  win32: '.exe',
};

test('the platform-specific Electron installer was generated', () => {
  const extension = extensions[process.platform];
  assert.ok(extension, 'Unsupported CI packaging host: ' + process.platform);
  const releaseDir = join(root, 'release');
  const artifacts = readdirSync(releaseDir).filter(name => name.endsWith(extension));
  assert.ok(artifacts.length > 0, 'Missing ' + extension + ' installer in ' + releaseDir);
  for (const artifact of artifacts) {
    assert.ok(statSync(join(releaseDir, artifact)).size > 100_000, 'Unexpected empty installer: ' + artifact);
  }
});
