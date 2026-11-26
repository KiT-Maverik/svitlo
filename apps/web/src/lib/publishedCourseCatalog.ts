import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { LanguageCode } from '@svitlo/engine/runtime';
import type { CoursePreview } from '@svitlo/ui-kit';

import { toCoursePreview } from './coursePreview';
import { loadCourseTree } from './courseResources';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const root = () => join(process.cwd(), 'public/data/courses');

/**
 * Runtime enumerates published Course resources, never build-time ownership
 * manifests. A genuinely empty UUID directory is an orphan; any nonempty
 * directory without a regular base.json is incomplete and must be reported.
 */
export async function loadPublishedCourseCatalog(language: LanguageCode): Promise<CoursePreview[]> {
  let entries;
  try {
    entries = await readdir(root(), { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  const previews: CoursePreview[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory() || !uuid.test(entry.name)) continue;
    const directory = join(root(), entry.name);
    const resources = await readdir(directory, { withFileTypes: true });
    if (resources.length === 0) continue;
    if (!resources.some(resource => resource.name === 'base.json' && resource.isFile()))
      throw new Error('Missing Course publication base: ' + entry.name + '/base.json');

    const base = JSON.parse(await readFile(join(directory, 'base.json'), 'utf8')) as {
      id?: string;
      type?: string;
      params?: { languages?: unknown };
    };
    if (base?.id !== entry.name || base?.type !== 'course')
      throw new Error('Invalid Course publication identity: ' + entry.name + '/base.json');
    if (!Array.isArray(base.params?.languages) || !base.params.languages.every(code => typeof code === 'string'))
      throw new Error('Invalid Course publication languages: ' + entry.name + '/base.json');
    if (!base.params.languages.includes(language)) continue;
    previews.push(toCoursePreview(await loadCourseTree(entry.name, language)));
  }
  return previews;
}
