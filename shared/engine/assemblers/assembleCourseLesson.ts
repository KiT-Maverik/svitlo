import type { LanguageCodes } from '../schemas';
import type { Lesson_Props } from '../configurators/lessons/defineLesson';
import {
  assembleLessonProps,
  type PublishedLessonPropsOverride,
  type PublishedLessonPropsResource,
} from './assembleLessonProps';

/**
 * The Course generator publishes a Lesson reference in a slug-keyed hierarchy, not standalone Lesson
 * Props. The sparse overrides come from the Lesson configurator Build API.
 */
export type CourseLessonEntry = {
  type: 'lesson';
  id: string;
  overrides?: Record<string, unknown>;
};

export type CoursePublishedContent = {
  items: Record<string, CoursePublishedNode>;
  order: string[];
};

export type CoursePublishedNode =
  | CourseLessonEntry
  | { type: 'episode'; id: string }
  | { type: 'module' | 'chapter'; id: string; content: CoursePublishedContent };

export type CoursePublishedTree = {
  type: 'course';
  id: string;
  params: { languages: readonly LanguageCodes[] };
  content: CoursePublishedContent;
};

export type PublishedCoursePropsFiles = {
  base: CoursePublishedTree;
  locale?: Partial<Record<LanguageCodes, unknown>>;
};

export type AssembleCourseLessonInput = {
  courseId: string;
  lessonId: string;
  language: LanguageCodes;
  lesson: PublishedLessonPropsResource;
  course: PublishedCoursePropsFiles;
};

const forbiddenKeys = new Set(['__proto__', 'constructor', 'prototype']);
const allowedOverrideKeys = new Set(['params', 'locale', 'section', 'flashcards', 'questions', 'events']);

function isRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function assertJson(value: unknown, at: string, seen = new Set<object>()): void {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (typeof value !== 'object' || value === null || (!Array.isArray(value) && !isRecord(value))) {
    throw new Error('Non-JSON Course override at ' + at);
  }
  if (seen.has(value)) throw new Error('Circular Course override at ' + at);
  seen.add(value);
  try {
    const entries = Array.isArray(value) ? value.entries() : Object.entries(value);
    for (const [key, item] of entries) {
      if (typeof key === 'string' && forbiddenKeys.has(key)) {
        throw new Error('Unsafe published Props key at ' + at + '/' + key);
      }
      assertJson(item, at + '/' + key, seen);
    }
  } finally {
    seen.delete(value);
  }
}

function assertCourseRoot(root: unknown, courseId: string, label: string): Record<string, unknown> {
  if (!isRecord(root) || (root.type !== undefined && root.type !== 'course')) {
    throw new Error('Invalid ' + label + ' Course publication');
  }
  if (root.id !== undefined && root.id !== courseId) {
    throw new Error('Course publication ID mismatch in ' + label);
  }
  return root;
}

/** The root hierarchy is keyed by slugs; order is an independent ordered index. */
function findLesson(
  root: Record<string, unknown>,
  lessonId: string,
  label: string,
): { node: Record<string, unknown>; path: string[] } | undefined {
  let match: { node: Record<string, unknown>; path: string[] } | undefined;
  const visit = (content: unknown, at: string, prefix: string[]): void => {
    if (!isRecord(content) || !isRecord(content.items) || !Array.isArray(content.order)) {
      throw new Error('Invalid Course content at ' + at);
    }
    const items = content.items;
    const order = content.order;
    if (
      order.length !== Object.keys(items).length ||
      new Set(order).size !== order.length ||
      order.some(slug => typeof slug !== 'string' || forbiddenKeys.has(slug) || !Object.hasOwn(items, slug))
    ) {
      throw new Error('Invalid Course order at ' + at);
    }
    for (const slug of order) {
      const location = at + '/' + slug;
      const raw = items[slug];
      if (!isRecord(raw) || typeof raw.id !== 'string') throw new Error('Invalid Course child at ' + location);
      if (raw.type === 'lesson') {
        if (raw.id === lessonId) {
          if (match) throw new Error('Duplicate Lesson ID ' + lessonId + ' in ' + label + ' Course publication');
          match = { node: raw, path: [...prefix, slug] };
        }
      } else if (raw.type === 'module' || raw.type === 'chapter') {
        visit(raw.content, location + '/content', [...prefix, slug]);
      } else if (raw.type === 'episode') {
        // Episode is Course-owned narrative content, not a Lesson reference.
        continue;
      } else {
        throw new Error('Unsupported Course child type at ' + location);
      }
    }
  };
  visit(root.content, label + '/content', []);
  return match;
}

/** Locale JSON contains only changed items along an immutable base-tree path. */
function findLocalizedLesson(
  localeRoot: Record<string, unknown> | undefined,
  path: readonly string[],
  label: string,
): Record<string, unknown> | undefined {
  let parent: Record<string, unknown> | undefined = localeRoot;
  for (const slug of path) {
    if (!parent || parent.content === undefined) return undefined;
    if (!isRecord(parent.content) || !isRecord(parent.content.items)) {
      throw new Error('Invalid Course content at ' + label + '/' + slug);
    }
    const item: unknown = parent.content.items[slug];
    if (item === undefined) return undefined;
    if (!isRecord(item)) throw new Error('Invalid Course child at ' + label + '/' + slug);
    parent = item;
  }
  return parent;
}

function getOverride(node: Record<string, unknown> | undefined, label: string): Record<string, unknown> | undefined {
  if (!node || node.overrides === undefined) return undefined;
  if (!isRecord(node.overrides)) throw new Error('Invalid ' + label + ' Lesson overrides');
  for (const key of Object.keys(node.overrides)) {
    if (!allowedOverrideKeys.has(key)) throw new Error('Forbidden ' + label + ' Lesson override field: ' + key);
  }
  if (isRecord(node.overrides.params) && Object.hasOwn(node.overrides.params, 'languages')) {
    throw new Error('Course Lesson overrides cannot override Lesson supported languages');
  }
  assertJson(node.overrides, label + '/overrides');
  return node.overrides;
}

/**
 * Compose one Course Lesson using the canonical standalone Lesson assembler.
 * It owns the four-layer Props merge and final lesson_Props_Schema validation:
 *
 *   Lesson base -> Lesson locale -> Course override base -> Course override locale.
 *
 * No files are read here; hosts load the published Course and Lesson JSON.
 */
export function assembleCourseLesson({
  courseId,
  lessonId,
  language,
  lesson,
  course,
}: AssembleCourseLessonInput): Lesson_Props {
  if (!isRecord(lesson.base) || lesson.base.id !== lessonId || lesson.base.type !== 'lesson') {
    throw new Error('Standalone Lesson publication ID/type mismatch');
  }
  const base = assertCourseRoot(course.base, courseId, 'base');
  if (base.type !== 'course' || base.id !== courseId) throw new Error('Missing Course base identity');
  if (!isRecord(base.params) || !Array.isArray(base.params.languages) || !base.params.languages.includes(language)) {
    throw new Error('Course does not support language ' + language);
  }

  const baseMatch = findLesson(base, lessonId, 'base');
  if (!baseMatch) throw new Error('Lesson ' + lessonId + ' does not belong to Course ' + courseId);

  const localeData = course.locale?.[language];
  const localeRoot = localeData === undefined ? undefined : assertCourseRoot(localeData, courseId, language);
  const localeNode = findLocalizedLesson(localeRoot, baseMatch.path, language);
  if (
    localeNode &&
    ((localeNode.id !== undefined && localeNode.id !== lessonId) ||
      (localeNode.type !== undefined && localeNode.type !== 'lesson'))
  ) {
    throw new Error('Localized Lesson identity mismatch');
  }
  const basePatch = getOverride(baseMatch.node, 'base');
  const localePatch = getOverride(localeNode, language);

  const overrides =
    basePatch === undefined && localePatch === undefined
      ? undefined
      : ({
          ...(basePatch !== undefined ? { base: basePatch } : {}),
          ...(localePatch !== undefined ? { locale: { [language]: localePatch } } : {}),
        } as unknown as PublishedLessonPropsOverride);

  // Reuse the canonical Lesson Props validator with the published keyed Course hierarchy.
  try {
    return assembleLessonProps(lesson, language, overrides as unknown as PublishedLessonPropsOverride | undefined);
  } catch (error) {
    throw new Error('Invalid assembled Course Lesson Props for ' + language, { cause: error });
  }
}
