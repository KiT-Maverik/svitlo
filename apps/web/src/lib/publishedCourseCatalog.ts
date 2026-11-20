import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadCourseTree } from './courseResources';
import { toCoursePreview } from './coursePreview';
import type { CoursePreview } from '@svitlo/ui-kit';
import type { LanguageCode } from '@svitlo/engine/runtime';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const root = () => join(process.cwd(), 'public/data/courses');

export async function loadPublishedCourseCatalog(language: LanguageCode): Promise<CoursePreview[]> {
  let entries;
  try { entries = await readdir(root(), { withFileTypes: true }); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  const previews: CoursePreview[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory() || !uuid.test(entry.name)) continue;
    const base = JSON.parse(await readFile(join(root(), entry.name, 'base.json'), 'utf8')) as {
      params?: { languages?: string[] };
    };
    if (!base.params?.languages?.includes(language)) continue;
    previews.push(toCoursePreview(await loadCourseTree(entry.name, language)));
  }
  return previews;
}
