import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Course_Toc, Course_TocContent, Course_TocEpisode, Course_TocLesson } from '@svitlo/engine/content';
import type { LanguageCode } from '@svitlo/engine/localization';
import type { Course_LessonOverride, Locale_Languages } from '@svitlo/engine/content';
import type { LessonResponse } from '@svitlo/engine/lesson';
import { applyCourseLessonOverride, mergeLessonResources } from '@svitlo/engine/lesson';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;
const assertUuid = (id: string) => {
  if (!UUID.test(id)) throw new Error('Invalid Course resource ID');
  return id;
};
const courseRoot = (id: string) => path.join(process.cwd(), 'public/data/pages/courses', assertUuid(id));

async function loadJson(filename: string): Promise<unknown> {
  return JSON.parse(await readFile(filename, 'utf8'));
}

/** Course runtime is the sole owner of assembling the published sparse base and locale. */
async function loadSparseCourseResource(courseId: string, language: LanguageCode, ...segments: string[]): Promise<unknown> {
  const directory = path.join(courseRoot(courseId), ...segments);
  const [base, locale] = await Promise.all([
    loadJson(path.join(directory, 'base.json')),
    loadJson(path.join(directory, language + '.json')),
  ]);
  return mergeLessonResources(base, locale);
}

export async function loadCourseToc(id: string, language: LanguageCode): Promise<Course_Toc> {
  const data = await loadSparseCourseResource(id, language, 'toc');
  if (
    !data ||
    typeof data !== 'object' ||
    !('type' in data) ||
    data.type !== 'course' ||
    !('id' in data) ||
    data.id !== id
  )
    throw new Error('Invalid Course TOC');
  return data as Course_Toc;
}

type Node = Course_TocContent;
export function flattenCourseToc(
  toc: Course_Toc,
  language: string,
  lessonLanguage: string = language,
): {
  id: string;
  title: string;
  href: string;
  depth: number;
}[] {
  const result: { id: string; title: string; href: string; depth: number }[] = [];
  const root = '/' + language + '/course/' + toc.id;
  function walk(nodes: readonly Node[], depth: number) {
    for (const node of nodes) {
      const href =
        node.type === 'lesson'
          ? root + '/lesson/' + lessonLanguage + '/' + node.id
          : node.type === 'episode'
            ? root + '/episode/' + node.id
            : root + '#' + node.id;
      result.push({ id: node.id, title: node.title, href, depth });
      if ('children' in node) walk(node.children, depth + 1);
    }
  }
  walk(toc.children, 0);
  return result;
}

function findNode(
  toc: Course_Toc,
  type: 'lesson' | 'episode',
  id: string,
): Course_TocLesson | Course_TocEpisode | undefined {
  let found: Course_TocLesson | Course_TocEpisode | undefined;
  function walk(nodes: readonly Node[]) {
    for (const node of nodes) {
      if (node.type === type && node.id === id) {
        found = node;
        return;
      }
      if ('children' in node) walk(node.children);
    }
  }
  walk(toc.children);
  return found;
}
export const courseHasLesson = (toc: Course_Toc, id: string): boolean => !!findNode(toc, 'lesson', id);
export const courseHasEpisode = (toc: Course_Toc, id: string): boolean => !!findNode(toc, 'episode', id);

export async function loadCourseLesson(
  courseId: string,
  lesson: LessonResponse,
  language: LanguageCode,
): Promise<LessonResponse> {
  assertUuid(lesson.id);
  let data: unknown;
  try {
    data = await loadSparseCourseResource(courseId, language, 'overrides', lesson.id);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return lesson;
    throw error;
  }
  return applyCourseLessonOverride(lesson, data as Course_LessonOverride<Locale_Languages>);
}
export async function loadCourseEpisode(courseId: string, id: string, language: LanguageCode): Promise<unknown> {
  return loadSparseCourseResource(courseId, language, 'episodes', assertUuid(id));
}
