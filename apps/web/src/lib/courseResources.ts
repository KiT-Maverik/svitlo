import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { loadPublishedCourseLessonProps } from '@svitlo/adapter-nextjs';
import {
  languageCode_Schema,
  resolveEntityPath,
  type CourseLessonEntry,
  type CoursePublishedTree,
} from '@svitlo/engine/runtime';
import type { LanguageCode } from '@svitlo/engine/runtime';

/** The published Course preserves locale metadata and slug-keyed hierarchy. */
export type LocalizedCourseContent = {
  items: Record<string, LocalizedCourseNode>;
  order: string[];
};
export type LocalizedCourseNode =
  | CourseLessonEntry
  | {
      type: 'module' | 'chapter';
      id: string;
      locale: { title: string; [key: string]: unknown };
      content: LocalizedCourseContent;
    };
export type LocalizedCourse = Omit<CoursePublishedTree, 'content'> & {
  locale: { title: string; [key: string]: unknown };
  content: LocalizedCourseContent;
};

const blockedKeys = new Set(['__proto__', 'constructor', 'prototype']);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function assertRecord(value: unknown, location: string): asserts value is Record<string, unknown> {
  if (!record(value)) throw new Error('Invalid published Course object: ' + location);
}

/** Ordinary Props arrays are atomic; only keyed Course objects deep-merge. */
function merge(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return base;
  if (!record(base) || !record(patch)) return patch;
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (blockedKeys.has(key)) throw new Error('Unsafe published Course key: ' + key);
    result[key] = merge(base[key], value);
  }
  return result;
}

function validateContent(content: unknown, parent: 'course' | 'module' | 'chapter', visited: Set<string>): void {
  assertRecord(content, parent + '.content');
  assertRecord(content.items, parent + '.content.items');
  if (
    !Array.isArray(content.order) ||
    content.order.length !== Object.keys(content.items).length ||
    new Set(content.order).size !== content.order.length
  ) {
    throw new Error('Invalid Course content order: ' + parent);
  }
  for (const slug of content.order) {
    if (typeof slug !== 'string' || blockedKeys.has(slug) || !Object.hasOwn(content.items, slug)) {
      throw new Error('Invalid Course child slug: ' + String(slug));
    }
    const child: unknown = content.items[slug];
    assertRecord(child, parent + '/' + slug);
    if (typeof child.id !== 'string' || visited.has(child.id)) {
      throw new Error('Invalid or duplicate Course entity ID: ' + String(child.id));
    }
    visited.add(child.id);
    if (child.type === 'lesson') continue;
    if (child.type !== 'module' && child.type !== 'chapter') {
      throw new Error('Unsupported Course child type: ' + String(child.type));
    }
    if (parent === 'chapter' || (parent === 'module' && child.type === 'module')) {
      throw new Error('Invalid Course hierarchy under ' + parent);
    }
    assertRecord(child.locale, 'Course ' + slug + '.locale');
    if (typeof child.locale.title !== 'string') throw new Error('Missing Course group title: ' + slug);
    validateContent(child.content, child.type, visited);
  }
}

function validateCourse(value: unknown, id: string, language: LanguageCode): LocalizedCourse {
  assertRecord(value, 'root');
  if (value.type !== 'course' || value.id !== id) throw new Error('Published Course identity mismatch');
  assertRecord(value.params, 'params');
  if (!Array.isArray(value.params.languages) || !value.params.languages.includes(language)) {
    throw new Error('Course does not support language ' + language);
  }
  assertRecord(value.locale, 'locale');
  if (typeof value.locale.title !== 'string') throw new Error('Published Course is missing a title');
  validateContent(value.content, 'course', new Set([id]));
  return value as LocalizedCourse;
}

async function readJson(file: string, optional = false): Promise<unknown | undefined> {
  let text: string;
  try {
    text = await readFile(file, 'utf8');
  } catch (error) {
    if (optional && (error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch (error) {
    throw new Error('Malformed Course publication JSON: ' + file, { cause: error });
  }
}

/**
 * Read exactly one localized Course publication. It contains nested Group
 * Props but only Lesson references/overrides, never complete Lesson Props.
 */
export async function loadCourseTree(id: string, language: LanguageCode): Promise<LocalizedCourse> {
  const code = languageCode_Schema.parse(language);
  const courseId = resolveEntityPath(id).split('/')[1];
  const directory = path.join(process.cwd(), 'public/data/courses', courseId);
  const [base, localized] = await Promise.all([
    readJson(path.join(directory, 'base.json')),
    readJson(path.join(directory, code + '.json'), true),
  ]);
  return validateCourse(merge(base, localized), courseId, code);
}

export function courseHasLesson(course: LocalizedCourse, id: string): boolean {
  function visit(content: LocalizedCourseContent): boolean {
    return content.order.some(slug => {
      const item = content.items[slug];
      return item.type === 'lesson' ? item.id === id : visit(item.content);
    });
  }
  return visit(course.content);
}

export function courseLessonIds(course: LocalizedCourse): string[] {
  const ids: string[] = [];
  function visit(content: LocalizedCourseContent): void {
    for (const slug of content.order) {
      const item = content.items[slug];
      if (item.type === 'lesson') ids.push(item.id);
      else visit(item.content);
    }
  }
  visit(course.content);
  return ids;
}

/** Read actual localized Lesson titles, honoring the Course's sparse overrides. */
export async function loadCourseLessonTitles(course: LocalizedCourse, language: LanguageCode) {
  const pairs = await Promise.all(
    courseLessonIds(course).map(async id => {
      const lesson = await loadPublishedCourseLessonProps(course.id, id, languageCode_Schema.parse(language));
      return [id, lesson.locale.title] as const;
    }),
  );
  return Object.fromEntries(pairs) as Record<string, string>;
}
