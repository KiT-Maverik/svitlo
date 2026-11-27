/**
 * Manual-only Turborepo benchmark artifact guard.
 *
 * Validates known public package exports and snapshots every compiled file.
 * A consumer must not silently rebuild or rewrite a predecessor's dist.
 * Does not install dependencies, build packages, or touch production CI state.
 */
import { createHash } from 'node:crypto';
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../..', import.meta.url));
const packages = {
  engine: { dir: 'shared/engine/dist', exports: ['build.js', 'build.d.ts', 'runtime.js', 'runtime.d.ts'] },
  'ui-kit': { dir: 'shared/ui-kit/dist', exports: ['src/index.js', 'src/index.d.ts'] },
  math: { dir: 'content/math/dist', exports: ['textbook/index.js', 'textbook/index.d.ts'] },
};

export function inspect(key, repository = root) {
  const spec = packages[key];
  if (!spec) throw Error('Unknown benchmark artifact: ' + key);
  const dir = resolve(repository, spec.dir);
  if (!lstatSync(dir).isDirectory()) throw Error('Artifact root is not a directory: ' + dir);
  const files = [];
  function walk(folder, prefix = '') {
    for (const item of readdirSync(folder, { withFileTypes: true })) {
      const name = prefix ? prefix + '/' + item.name : item.name;
      const filename = join(folder, item.name);
      if (item.isDirectory()) walk(filename, name);
      else if (item.isFile()) {
        const stat = lstatSync(filename, { bigint: true });
        files.push({
          path: name,
          bytes: Number(stat.size),
          sha256: createHash('sha256').update(readFileSync(filename)).digest('hex'),
          mtimeNs: String(stat.mtimeNs),
        });
      } else throw Error('Unexpected artifact entry: ' + name);
    }
  }
  walk(dir);
  files.sort((a, b) => a.path.localeCompare(b.path));
  for (const name of spec.exports) {
    if (!files.some(file => file.path === name && file.bytes > 0)) {
      throw Error('Missing or empty public export: ' + spec.dir + '/' + name);
    }
  }
  return files;
}

export function capture(keys, repository = root) {
  const names = keys.split(',').map(x => x.trim()).filter(Boolean);
  if (new Set(names).size !== names.length) throw Error('Duplicate artifact requirement');
  return Object.fromEntries(names.map(key => [key, inspect(key, repository)]));
}

function main([mode, first, second]) {
  if (mode === 'check') {
    const tree = inspect(first);
    console.log('Artifact valid: ' + first + ' (' + tree.length + ' files)');
    return;
  }
  if (!['snapshot', 'verify', 'verify-content'].includes(mode) || !first || second === undefined) {
    throw Error('Usage: turbo-poc-artifact.mjs check <key> | snapshot|verify|verify-content <filename> <csv-requires>');
  }
  const tree = capture(second);
  if (mode === 'snapshot') writeFileSync(first, JSON.stringify(tree), { flag: 'wx' });
  else {
    const before = JSON.parse(readFileSync(first, 'utf8'));
    const normalize = value => mode === 'verify-content' ? JSON.stringify(value, (key, v) => key === 'mtimeNs' ? undefined : v) : JSON.stringify(value);
    if (normalize(before) !== normalize(tree)) throw Error('A prerequisite dist changed during a consumer task');
  }
  console.log('Artifact ' + mode + ': ' + (second || '(none)'));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error('::error::' + error.message); process.exitCode = 1; }
}
