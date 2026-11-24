/** Read exact UTF-8 Git blobs and non-symlink tree entries from a pinned checkout.
 * Shared by entity-owned trusted transactions. This code NEVER executes source.
 */
import { execFileSync } from 'node:child_process';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';

const SHA = /^[a-f0-9]{40}$/;
const maxBytes = 32 * 1024 * 1024;
export const ordinary = entry => entry?.type === 'blob' && entry.mode === '100644';

export function pinnedGitReader(root) {
  const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: maxBytes, encoding: 'utf8' });
  const tree = (sha, scope) => {
    const result = new Map();
    for (const row of git('ls-tree', '-r', '-z', sha, '--', scope).split('\0').filter(Boolean)) {
      const match = row.match(/^(\d{6}) (blob|tree|commit) ([a-f0-9]{40})\t(.+)$/s);
      if (!match || result.has(match[4])) throw Error('Invalid pinned Git tree entry');
      result.set(match[4], { mode: match[1], type: match[2], sha: match[3] });
    }
    return result;
  };
  const blob = (entry, name) => {
    if (!ordinary(entry) || !SHA.test(entry.sha)) throw Error('Expected ordinary non-symlink source: ' + name);
    const bytes = execFileSync('git', ['cat-file', 'blob', entry.sha], { cwd: root, maxBuffer: maxBytes });
    const value = bytes.toString('utf8');
    if (!Buffer.from(value, 'utf8').equals(bytes) || gitBlob(bytes) !== entry.sha)
      throw Error('Pinned source is not exact UTF-8: ' + name);
    return value;
  };
  return { git, tree, blob };
}
