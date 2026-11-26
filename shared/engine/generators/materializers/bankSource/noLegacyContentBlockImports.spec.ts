import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

/** A repository-wide guard against resurrecting retired ContentBlock import paths. */
test('repository source imports do not refer to deleted ContentBlock directories', () => {
  let root = process.cwd();
  while (!existsSync(path.join(root, 'AGENTS.md')) || !existsSync(path.join(root, 'shared', 'engine', 'package.json'))) {
    const parent = path.dirname(root);
    if (parent === root) throw new Error('Repository root not found');
    root = parent;
  }

  const kinds = [
    'Text', 'Markdown', 'Code', 'Image', 'Audio', 'Video', 'Youtube',
    'Subtitles', 'Scene', 'Carousel', 'Checkpoint',
  ] as const;
  const oldRoot = path.join(root, 'shared', 'engine', 'configurators', 'contentBlocks');
  for (const kind of kinds) {
    assert.equal(existsSync(path.join(oldRoot, 'define' + kind)), false, 'Obsolete ContentBlock directory: ' + kind);
  }

  const ignore = new Set(['node_modules', '.git', 'dist', '.test-build', '.next', '.cache', 'temp', 'coverage', '.coverage-engine']);
  const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md', '.yml', '.yaml']);
  const deepPath = new RegExp('contentBlocks/' + 'define(?:' + kinds.join('|') + ')(?:\\/|\\b)', 'g');
  const importPattern = /(?:\bfrom\s*|\bimport\s*\(|\brequire\s*\()\s*['"]([^'"]+)['"]/g;
  const failures: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignore.has(entry.name)) walk(path.join(dir, entry.name));
        continue;
      }
      if (!entry.isFile() || !sourceExtensions.has(path.extname(entry.name))) continue;
      const file = path.join(dir, entry.name);
      const rel = path.relative(root, file).split(path.sep).join('/');
      if (rel === 'package-lock.json') continue;
      const source = readFileSync(file, 'utf8');
      if (deepPath.test(source)) failures.push(rel + ': obsolete literal deep path');
      deepPath.lastIndex = 0;
      if (!/\.(?:ts|tsx|js|mjs|cjs)$/.test(rel)) continue;
      for (const match of source.matchAll(importPattern)) {
        const specifier = match[1];
        if (!specifier.startsWith('.')) continue;
        const target = path.resolve(path.dirname(file), specifier);
        if (kinds.some(kind => target === path.join(oldRoot, 'define' + kind)
          || target.startsWith(path.join(oldRoot, 'define' + kind) + path.sep))) {
          failures.push(rel + ': ' + specifier);
        }
      }
    }
  };
  for (const dir of ['shared', 'apps', 'content', 'scripts', 'studio']) {
    const target = path.join(root, dir);
    if (existsSync(target)) walk(target);
  }
  assert.deepEqual(failures.sort(), [], 'Old ContentBlock paths must be migrated, not aliased');
});
