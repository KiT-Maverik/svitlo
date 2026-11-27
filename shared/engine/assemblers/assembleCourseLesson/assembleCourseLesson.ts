import type { Assessment_DataBase } from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';
import type { Episode_DataBase } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import type { Lesson_Data } from '../../configurators/lessons/defineLesson';
import type { LanguageCode } from '../../schemas';
import type { DeepPartial } from '../../types/transformer.types';
import {
  assembleLessonData,
  type PublishedLessonDataOverride,
  type PublishedLessonDataResource,
} from '../assembleLessonProps/assembleLessonProps';

/**
 * The Course generator publishes a Lesson reference in a slug-keyed hierarchy, not standalone Lesson
 * Data. The sparse overrides come from the Lesson configurator Build API.
 */
export type CourseLessonEntry = {
  type: 'lesson';
  id: string;
  overrides?: NonNullable<PublishedLessonDataOverride['base']>;
};

/** Published Course containers retain direct placement keys, never authored Config or UI arrays. */
export type CoursePublishedNode =
  | CourseLessonEntry
  | Episode_DataBase
  | Assessment_DataBase
  | { id: string; type: 'module' | 'chapter'; children: string[]; [placementSlug: string]: unknown };

export type CoursePublishedTree = {
  type: 'course';
  id: string;
  params: { languages: readonly LanguageCode[] };
  children: string[];
  [placementSlug: string]: unknown;
};

export type PublishedCourseDataFiles = {
  base: CoursePublishedTree;
  locale?: Partial<Record<LanguageCode, DeepPartial<CoursePublishedTree>>>;
};

export type AssembleCourseLessonInput = {
  courseId: string;
  lessonId: string;
  /** Required when the same Lesson occurs in multiple distinct Course slots. */
  placement?: string;
  language: LanguageCode;
  lesson: PublishedLessonDataResource;
  course: PublishedCourseDataFiles;
};

const forbiddenKeys = new Set(['__proto__', 'constructor', 'prototype']);
const allowedOverrideKeys = new Set(['params', 'locale', 'children', 'events']);
const forbiddenOverrideKeys = new Set(['id', 'slug', 'type', 'skills', 'draft']);
const validPlacement = /^[a-z][a-zA-Z0-9]*$/;

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
        throw new Error('Unsafe published Data key at ' + at + '/' + key);
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

/** Direct placement lookup touches only Course→Module→Chapter ancestors, never sibling leaves. */
function findLesson(
  root: Record<string, unknown>,
  lessonId: string,
  label: string,
  placement?: string,
): { node: Record<string, unknown>; path: string[] } | undefined {
  const child = (parent: Record<string, unknown>, slug: string, location: string): Record<string, unknown> => {
    if (!['course', 'module', 'chapter'].includes(String(parent.type)) ||
        !Array.isArray(parent.children) || !parent.children.includes(slug) || !Object.hasOwn(parent, slug)) {
      throw new Error('Unknown Course placement at ' + location);
    }
    const node: unknown = parent[slug];
    if (!isRecord(node) || typeof node.id !== 'string')
      throw new Error('Invalid Course child at ' + location);
    return node;
  };
  if (placement !== undefined) {
    if (typeof placement !== 'string' || !placement ||
        placement.split('/').some(segment => !validPlacement.test(segment) || forbiddenKeys.has(segment)))
      throw new Error('Unsafe Course placement path');
    const path = placement.split('/');
    let node = root;
    for (const slug of path) node = child(node, slug, label + '/' + placement);
    if (node.type !== 'lesson' || node.id !== lessonId)
      throw new Error('Lesson ID or kind mismatch at placement ' + placement);
    if (Object.hasOwn(node, 'draft')) throw new Error('Course draft Lesson cannot be assembled');
    return { node, path };
  }

  let match: { node: Record<string, unknown>; path: string[] } | undefined;
  function visit(parent: Record<string, unknown>, path: string[]): void {
    if (!Array.isArray(parent.children) || new Set(parent.children).size !== parent.children.length)
      throw new Error('Invalid Course children at ' + label + '/' + path.join('/'));
    for (const slug of parent.children) {
      if (typeof slug !== 'string' || !validPlacement.test(slug) || forbiddenKeys.has(slug))
        throw new Error('Unsafe Course child path at ' + label);
      const node = child(parent, slug, label + '/' + [...path, slug].join('/'));
      if (node.type === 'lesson' && node.id === lessonId) {
        if (match) throw new Error('Ambiguous Lesson ID ' + lessonId + '; specify a placement path');
        match = { node, path: [...path, slug] };
      }
      if (node.type === 'module' || node.type === 'chapter') visit(node, [...path, slug]);
      else if (!['lesson', 'episode', 'assessment'].includes(String(node.type)))
        throw new Error('Unsupported Course child at ' + slug);
    }
  }
  visit(root, []);
  return match;
}

/** Locale fragments follow exactly the same direct placement keys as the base tree. */
function findLocalizedLesson(
  localeRoot: Record<string, unknown> | undefined,
  path: readonly string[],
  label: string,
): Record<string, unknown> | undefined {
  let node: Record<string, unknown> | undefined = localeRoot;
  for (const slug of path) {
    if (!node || !Object.hasOwn(node, slug)) return undefined;
    const next: unknown = node[slug];
    if (!isRecord(next)) throw new Error('Invalid localized Course child at ' + label + '/' + slug);
    node = next;
  }
  return node;
}

function getOverride(
  node: Record<string, unknown> | undefined,
  label: string,
): NonNullable<PublishedLessonDataOverride['base']> | undefined {
  if (!node || node.overrides === undefined) return undefined;
  if (!isRecord(node.overrides)) throw new Error('Invalid ' + label + ' Lesson overrides');
  for (const key of Object.keys(node.overrides)) {
    if (forbiddenOverrideKeys.has(key) || (!allowedOverrideKeys.has(key) && (!validPlacement.test(key) || forbiddenKeys.has(key))))
      throw new Error('Forbidden ' + label + ' Lesson override field: ' + key);
  }
  if (node.overrides.children !== undefined && (!Array.isArray(node.overrides.children) ||
      node.overrides.children.some(key => typeof key !== 'string' || !validPlacement.test(key))))
    throw new Error('Invalid Lesson override children at ' + label);
  if (isRecord(node.overrides.params) && Object.hasOwn(node.overrides.params, 'languages')) {
    throw new Error('Course Lesson overrides cannot override Lesson supported languages');
  }
  assertJson(node.overrides, label + '/overrides');
  return node.overrides as NonNullable<PublishedLessonDataOverride['base']>;
}

/**
 * Compose one Course Lesson using the canonical standalone Lesson assembler.
 * It owns the four-layer Data merge and final lesson_Data_Schema validation:
 *
 *   Lesson base -> Lesson locale -> Course override base -> Course override locale.
 *
 * No files are read here; hosts load the published Course and Lesson JSON.
 */
export function assembleCourseLesson({
  courseId,
  lessonId,
  placement,
  language,
  lesson,
  course,
}: AssembleCourseLessonInput): Lesson_Data {
  if (!isRecord(lesson.base) || lesson.base.id !== lessonId || lesson.base.type !== 'lesson') {
    throw new Error('Standalone Lesson publication ID/type mismatch');
  }
  if (Object.hasOwn(lesson.base, 'draft'))
    throw new Error('Standalone Lesson draft cannot be assembled as completed Data');
  const base = assertCourseRoot(course.base, courseId, 'base');
  if (base.type !== 'course' || base.id !== courseId) throw new Error('Missing Course base identity');
  if (!isRecord(base.params) || !Array.isArray(base.params.languages) || !base.params.languages.includes(language)) {
    throw new Error('Course does not support language ' + language);
  }

  const baseMatch = findLesson(base, lessonId, 'base', placement);
  if (!baseMatch) throw new Error('Lesson ' + lessonId + ' does not belong to Course ' + courseId);
  if (Object.hasOwn(baseMatch.node, 'draft')) throw new Error('Course draft Lesson cannot be assembled');
  if (Object.keys(baseMatch.node).some(field => !['id', 'type', 'overrides'].includes(field)))
    throw new Error('Course Lesson must be a compact published reference');

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
  if (localeNode && Object.hasOwn(localeNode, 'draft'))
    throw new Error('Localized Course draft stub cannot be assembled as completed Data');
  const basePatch = getOverride(baseMatch.node, 'base');
  const localePatch = getOverride(localeNode, language);

  const overrides =
    basePatch === undefined && localePatch === undefined
      ? undefined
      : ({
          ...(basePatch !== undefined ? { base: basePatch } : {}),
          ...(localePatch !== undefined ? { locale: { [language]: localePatch } } : {}),
        } satisfies PublishedLessonDataOverride);

  // Reuse the canonical Lesson Data validator with the published keyed Course hierarchy.
  try {
    return assembleLessonData(lesson, language, overrides);
  } catch (error) {
    throw new Error('Invalid assembled Course Lesson Data for ' + language, { cause: error });
  }
}
