import fs from 'node:fs';
import path from 'node:path';

/**
 * Reject symlinks and non-directory ancestors of generated output before
 * read, mkdir, staging or replacement. Missing suffixes are permitted.
 */
export function assertSafeDirectoryPath(directory) {
  const absolute = path.resolve(directory);
  let current = path.parse(absolute).root;
  for (const segment of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    let stat;
    try {
      stat = fs.lstatSync(current);
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    if (stat.isSymbolicLink()) throw new Error('Symlink in generated path: ' + current);
    if (!stat.isDirectory()) throw new Error('Non-directory in generated path: ' + current);
  }
}
