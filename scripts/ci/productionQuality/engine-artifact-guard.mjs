/**
 * Read-only integrity guard for the manual Engine build-once artifact experiment.
 *
 * Verifies compiled public exports, snapshots the complete dist file tree, and
 * rejects missing, added, changed, or rewritten files in consumer jobs.
 * Does not build packages, execute authored source, or read build-reuse state.
 */
import { createHash } from 'node:crypto';
import { appendFileSync, lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultDist = fileURLToPath(new URL('../../../shared/engine/dist/', import.meta.url));
const requiredExports = ['build.js', 'build.d.ts', 'runtime.js', 'runtime.d.ts'];

export function inspectEngineDist(directory) {
  const root = resolve(directory);
  if (!lstatSync(root).isDirectory()) throw new Error('Engine dist is not a regular directory: ' + root);
  const files = [];

  function visit(path, prefix) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const name = prefix ? prefix + '/' + entry.name : entry.name;
      const absolutePath = join(path, entry.name);
      if (entry.isDirectory()) {
        visit(absolutePath, name);
      } else if (entry.isFile()) {
        const stat = lstatSync(absolutePath, { bigint: true });
        files.push({
          path: name,
          bytes: Number(stat.size),
          sha256: createHash('sha256').update(readFileSync(absolutePath)).digest('hex'),
          mtimeNs: String(stat.mtimeNs),
        });
      } else {
        throw new Error('Unexpected non-regular Engine artifact entry: ' + name);
      }
    }
  }

  visit(root, '');
  files.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  for (const expected of requiredExports) {
    const entry = files.find(file => file.path === expected);
    if (!entry || entry.bytes === 0) throw new Error('Missing or empty Engine compiled export: ' + expected);
  }
  return {
    files,
    fileCount: files.length,
    totalBytes: files.reduce((sum, entry) => sum + entry.bytes, 0),
  };
}

export function assertEngineDistUnchanged(before, after) {
  if (JSON.stringify(before.files) !== JSON.stringify(after.files)) {
    throw new Error('Engine dist changed after artifact download (content, file set, or mtime); consumer rebuild/write detected');
  }
}

function summary(line) {
  console.log(line);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, '- ' + line + '\n');
}

function main([mode, snapshotFile]) {
  if (!['inspect', 'snapshot', 'verify'].includes(mode)) {
    throw new Error('Usage: node engine-artifact-guard.mjs <inspect|snapshot|verify> [snapshot-file]');
  }
  if (mode !== 'inspect' && !snapshotFile) throw new Error('A runner-local snapshot file is required');
  const current = inspectEngineDist(defaultDist);
  if (mode === 'snapshot') {
    writeFileSync(snapshotFile, JSON.stringify(current) + '\n', { flag: 'wx' });
  } else if (mode === 'verify') {
    const before = JSON.parse(readFileSync(snapshotFile, 'utf8'));
    assertEngineDistUnchanged(before, current);
  }
  summary(
    'Engine artifact ' + mode + ': ' + current.fileCount + ' files, ' +
    current.totalBytes + ' uncompressed bytes' + (mode === 'verify' ? ' (unchanged)' : ''),
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error('::error::' + error.message);
    process.exitCode = 1;
  }
}
