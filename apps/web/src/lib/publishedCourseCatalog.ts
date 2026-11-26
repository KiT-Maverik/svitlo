import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { LanguageCode } from '@svitlo/engine/runtime';
import type { CoursePreview } from '@svitlo/ui-kit';

import { toCoursePreview } from './coursePreview';
import { loadCourseTree } from './courseResources';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const root = () => join(process.cwd(), 'public/data/courses');

/** The selected publisher's ownership manifest distinguishes missing owned resources from orphan folders. */
async function ownedCourseBases(): Promise<{ ids: Set<string>; hasManifest: boolean }> {
  const owned = new Set<string>();
  const directory = join(process.cwd(), 'public/.svitlo');
  let files;
  try {
    files = await readdir(directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { ids: owned, hasManifest: false };
    throw error;
  }
  const manifests = files.filter(file => /^publish-[a-z][a-z0-9-]*\.json$/.test(file));
  for (const name of manifests) {
    const manifest = JSON.parse(await readFile(join(directory, name), 'utf8')) as {
      version?: number;
      textbook?: string;
      files?: unknown;
    };
    const textbook = name.slice('publish-'.length, -'.json'.length);
    if (
      manifest.version !== 1 ||
      manifest.textbook !== textbook ||
      !Array.isArray(manifest.files) ||
      !manifest.files.every((file: unknown) => typeof file === 'string')
    )
      throw new Error('Invalid Course publication ownership manifest: ' + name);
    for (const file of manifest.files as string[]) {
      const match = /^data\/courses\/([0-9a-f-]+)\/base\.json$/.exec(file);
      if (match && uuid.test(match[1])) owned.add(match[1]);
    }
  }
  return { ids: owned, hasManifest: manifests.length > 0 };
}

export async function loadPublishedCourseCatalog(language: LanguageCode): Promise<CoursePreview[]> {
  const { ids: owned, hasManifest } = await ownedCourseBases();
  let entries;
  try {
    entries = await readdir(root(), { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT' && owned.size === 0) return [];
    throw error;
  }
  const directories = entries.filter(entry => entry.isDirectory() && uuid.test(entry.name));
  const available = new Set(directories.map(entry => entry.name));
  for (const id of owned)
    if (!available.has(id)) throw new Error('Missing owned Course publication: ' + id + '/base.json');

  const previews: CoursePreview[] = [];
  for (const entry of directories.sort((a, b) => a.name.localeCompare(b.name))) {
    // Once selection published an ownership manifest, ignore unowned prior-package files.
    if (hasManifest && !owned.has(entry.name)) continue;
    const directory = join(root(), entry.name);
    const resources = await readdir(directory, { withFileTypes: true });
    if (!resources.some(resource => resource.name === 'base.json' && resource.isFile())) {
      // An unowned, already-empty directory is a harmless remnant of an old publication.
      // A localized JSON or an owned base without its file indicates a broken publication.
      if (owned.has(entry.name) || resources.some(resource => resource.isFile() && resource.name.endsWith('.json')))
        throw new Error('Missing Course publication base: ' + entry.name + '/base.json');
      continue;
    }
    const base = JSON.parse(await readFile(join(directory, 'base.json'), 'utf8')) as {
      params?: { languages?: unknown };
    };
    if (!Array.isArray(base?.params?.languages) || !base.params.languages.every(code => typeof code === 'string'))
      throw new Error('Invalid Course publication languages: ' + entry.name + '/base.json');
    if (!base.params.languages.includes(language)) continue;
    previews.push(toCoursePreview(await loadCourseTree(entry.name, language)));
  }
  return previews;
}
