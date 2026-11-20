/**
 * @fileoverview Compute PR impact from the merge-base rather than the
 * moving base tip; --no-renames preserves both old and new workspace paths.
 */
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(fileURLToPath(new URL('../../..', import.meta.url)));

export function changedFiles(base, head, cwd = repository) {
  if (![base, head].every(sha => /^[a-f0-9]{40}$/.test(sha))) {
    throw new Error('BASE_SHA and HEAD_SHA must be 40-character SHA values');
  }
  return execFileSync('git', ['diff', '--no-renames', '--name-only', '-z', base + '...' + head], { cwd })
    .toString('utf8')
    .split('\0')
    .filter(Boolean);
}
