/** Classify a canonical entity root without importing editorial TypeScript. */
import fs from 'node:fs';
import path from 'node:path';
import { assertSafeDirectoryPath } from '../../generators/safeGeneratedPath/assertSafeDirectoryPath.mjs';

function fileAt(filename) {
  let stat;
  try {
    stat = fs.lstatSync(filename);
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Invalid authored entrypoint: ' + filename);
  return true;
}

/** Editorial and materialized entrypoints are mutually exclusive.
 * Discovery never reads draft.ts. Strict production refuses unfinished roots.
 */
export function resolveMaterializedEntrypoint(directory, { mode = 'production', legacyLesson = false } = {}) {
  assertSafeDirectoryPath(directory);
  if (!fs.existsSync(directory)) return { source: undefined, draft: false };
  const candidates = ['index.ts'];
  if (legacyLesson) candidates.push(...fs.readdirSync(directory).filter(name => name.endsWith('.data.ts')));
  const sources = candidates.map(name => path.join(directory, name)).filter(fileAt);
  const draft = fileAt(path.join(directory, 'draft.ts'));
  if (sources.length > 1 || (draft && sources.length)) {
    throw new Error('Ambiguous materialized/editorial entrypoints: ' + directory);
  }
  if (draft && mode !== 'draft') throw new Error('Unmaterialized editorial draft: ' + directory);
  return { source: sources[0], draft };
}
