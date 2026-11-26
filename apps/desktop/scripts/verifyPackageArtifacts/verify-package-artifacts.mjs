#!/usr/bin/env node
/** Verify real Forge unpacked/maker files without confusing artifacts with installer execution. */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const output = join(root, 'out');
const [target] = process.argv.slice(2);
if (!['unpacked', 'win32', 'darwin', 'linux'].includes(target)) {
  throw new Error('Usage: verify-package-artifacts.mjs unpacked|win32|darwin|linux');
}
if (!existsSync(output)) throw new Error('Forge out/ directory is missing');
const native = readdirSync(output, { withFileTypes: true })
  .filter(item => item.isDirectory() && /-linux-(x64|arm64)$/.test(item.name))
  .map(item => join(output, item.name, 'svitlo'))
  .filter(existsSync);
if (target === 'unpacked') {
  if (process.platform !== 'linux' || native.length !== 1) {
    throw new Error('Expected exactly one Linux unpacked Forge executable');
  }
  console.log('Verified Linux unpacked executable: ' + native[0]);
} else {
  const directory = join(output, 'make');
  if (!existsSync(directory)) throw new Error('Forge maker output is missing');
  const files = readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter(item => item.isFile())
    .map(item => join(item.parentPath, item.name));
  const formats = {
    win32: [/Setup\\.exe$/i, /-full\\.nupkg$/i, /[\\/]RELEASES$/],
    darwin: [/\\.dmg$/i],
    linux: [/\\.deb$/i],
  };
  for (const pattern of formats[target]) {
    const matches = files.filter(path => pattern.test(path));
    if (matches.length === 0 || matches.some(path => statSync(path).size < (path.endsWith('RELEASES') ? 1 : 1000000))) {
      throw new Error('Missing or too-small Forge ' + target + ' artifact: ' + pattern);
    }
    for (const file of matches) console.log('Verified ' + file + ' (' + statSync(file).size + ' bytes)');
  }
}
