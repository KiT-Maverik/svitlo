import { statSync, existsSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolveEntityPath } from '../../../../utils/entityPath/resolveEntityPath.utils';

function isFile(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

function findRepositoryRoot(cwd: string): string | undefined {
  let directory = resolve(cwd);
  for (;;) {
    if (existsSync(join(directory, 'content')) && existsSync(join(directory, 'shared'))) return directory;
    const parent = dirname(directory);
    if (parent === directory) return undefined;
    directory = parent;
  }
}

function currentTextbookRoot(repoRoot: string, cwd: string): string | undefined {
  const parts = relative(repoRoot, resolve(cwd)).split(sep);
  if (parts[0] !== 'content') return undefined;
  const folder = parts[1] === 'languages' ? parts.slice(0, 3) : parts.slice(0, 2);
  if (folder.length < 2 || folder.some(part => !part || part === '..')) return undefined;
  const root = join(repoRoot, ...folder);
  return existsSync(root) ? root : undefined;
}

function textbookByName(repoRoot: string, name: string): string | undefined {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) return undefined;
  for (const root of [join(repoRoot, 'content', name), join(repoRoot, 'content', 'languages', name)]) {
    if (existsSync(root)) return root;
  }
  return undefined;
}

function localMediaCandidates(
  source: string,
  cwd: string,
): string[] | undefined {
  if (source.startsWith('file:')) return [fileURLToPath(source)];
  // HTTP, CDN, blob and embedded data are not files in the textbook package.
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(source)) return undefined;

  const repoRoot = findRepositoryRoot(cwd);
  if (!repoRoot) return undefined;

  const barePath = decodeURIComponent(source.split(/[?#]/, 1)[0].replace(/\\/g, '/'));
  if (!barePath || barePath.split('/').includes('..') || barePath.includes('\0')) {
    throw new Error('Unsafe local media path: ' + source);
  }

  const textbookPath = /^\/textbooks\/([^/]+)\/(.+)$/.exec(barePath);
  const root = textbookPath
    ? textbookByName(repoRoot, textbookPath[1])
    : currentTextbookRoot(repoRoot, cwd);
  if (!root) {
    if (textbookPath) throw new Error('Unknown textbook for local media: ' + source);
    // Without a textbook context an unscoped URL belongs to the host, not Engine.
    return undefined;
  }

  const name = textbookPath ? textbookPath[2] : barePath.replace(/^\/+/, '');
  if (!name || isAbsolute(name) || name.split('/').includes('..')) {
    throw new Error('Unsafe local media path: ' + source);
  }
  return [join(root, 'static', name), join(root, 'public', name)];
}

/**
 * Check locally packaged ContentBlock media when their textbook can be resolved.
 * Public URLs `/textbooks/<book>/...` map to that book's static/ or public/
 * directory. An unscoped local path uses the active textbook workspace.
 * External URLs are deliberately not fetched.
 */
export function validateLocalAssetPaths(value: string | object, field: string, cwd = process.cwd()): void {
  const entries = typeof value === 'string' ? [[field, value]] : Object.entries(value).map(([locale, source]) => [field + '.' + locale, source]);
  for (const [path, source] of entries) {
    if (typeof source !== 'string') throw new Error('Expected a media file path at ' + path);
    const candidates = localMediaCandidates(source, cwd);
    if (candidates && !candidates.some(isFile)) {
      throw new Error('Missing local media file at ' + path + ': ' + source);
    }
  }
}

/**
 * Scene UUIDs use the same layout as the generated Scene Registry. The active
 * content textbook owns the source; Engine does not import Scene components.
 */
export function validateSceneEntry(id: string, cwd = process.cwd()): void {
  const repoRoot = findRepositoryRoot(cwd);
  const root = repoRoot && currentTextbookRoot(repoRoot, cwd);
  if (!root) return;
  const entry = join(root, 'scenes', resolveEntityPath(id), 'index.ts');
  if (!isFile(entry)) throw new Error('Missing Scene entrypoint for ' + id + ': ' + entry);
}
