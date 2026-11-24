import { languageCode_Schema, type LanguageCode } from '../../schemas';
import { episode_Props_Schema, type Episode_Props } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import { contentSection_Props_Schema } from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import { practiceSection_Props_Schema } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import { codingTaskSection_Props_Schema } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { learningFlowSection_Props_Schema } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import type { Section_Props } from '../../configurators/sections/section.types';
import type { CourseLessonEntry, CoursePublishedTree } from './assembleCourseLesson';

export type EpisodeSection = Exclude<Section_Props, { type: 'quiz' | 'flashcards' }>;
export type LocalizedEpisode = Omit<Episode_Props, 'section'> & { section: EpisodeSection[] };
export type LocalizedCourseContent = { items: Record<string, LocalizedCourseNode>; order: string[] };
export type LocalizedCourseNode = CourseLessonEntry | LocalizedEpisode | {
  type: 'module' | 'chapter';
  id: string;
  locale: { title: string; [key: string]: unknown };
  content: LocalizedCourseContent;
};
export type LocalizedCourse = Omit<CoursePublishedTree, 'content'> & {
  locale: { title: string; [key: string]: unknown };
  content: LocalizedCourseContent;
};

const forbidden = new Set(['__proto__', 'constructor', 'prototype']);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
function assertRecord(value: unknown, at: string): asserts value is Record<string, unknown> {
  if (!record(value)) throw Error('Invalid Course object: ' + at);
}
function assertSafeJson(value: unknown): void {
  if (Array.isArray(value)) { value.forEach(assertSafeJson); return; }
  if (!record(value)) {
    if (value !== null && typeof value !== 'string' && typeof value !== 'boolean' &&
        !(typeof value === 'number' && Number.isFinite(value))) throw Error('Non-JSON Course value');
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (forbidden.has(key)) throw Error('Unsafe Course key: ' + key);
    assertSafeJson(child);
  }
}
function merge(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return structuredClone(base);
  if (!record(base) || !record(patch)) return structuredClone(patch);
  const result: Record<string, unknown> = structuredClone(base);
  for (const [key, value] of Object.entries(patch)) result[key] = merge(base[key], value);
  return result;
}

const sectionSchemas = {
  content: contentSection_Props_Schema,
  practice: practiceSection_Props_Schema,
  codingTask: codingTaskSection_Props_Schema,
  learningFlow: learningFlowSection_Props_Schema,
} as const;

/** Episode.events is an opaque JSON authoring field, not an implemented reaction protocol. */
export function validateEpisodeRuntime(value: unknown, language: LanguageCode): LocalizedEpisode {
  const episode = episode_Props_Schema.parse(value);
  if (!episode.params.languages.includes(language) || !episode.locale.title.trim() || !episode.section.length)
    throw Error('Episode requires an active locale and nonempty ordered Sections');
  if (Object.keys(episode.events ?? {}).length) throw Error('Unsupported Episode event semantics');
  const ids = new Set<string>();
  for (const section of episode.section) {
    if (!Object.hasOwn(sectionSchemas, section.type)) throw Error('Unsupported Episode Section: ' + section.type);
    if (ids.has(section.id)) throw Error('Duplicate Episode Section ID: ' + section.id);
    ids.add(section.id);
    sectionSchemas[section.type as keyof typeof sectionSchemas].parse(section);
  }
  return episode as LocalizedEpisode;
}

function verifyIdentity(base: unknown, selected: unknown, at: string): void {
  assertRecord(base, at); assertRecord(selected, at);
  if (base.id !== selected.id || base.type !== selected.type) throw Error('Localized Course identity changed at ' + at);
  if (base.type === 'lesson') return;
  if (base.type === 'episode') {
    if (base.slug !== selected.slug || !Array.isArray(base.section) || !Array.isArray(selected.section) ||
        base.section.length !== selected.section.length)
      throw Error('Localized Episode Section structure changed at ' + at);
    for (let i = 0; i < base.section.length; i++) {
      const original: unknown = base.section[i], translated: unknown = selected.section[i];
      assertRecord(original, at); assertRecord(translated, at);
      if (original.id !== translated.id || original.type !== translated.type || original.slug !== translated.slug)
        throw Error('Localized Episode Section identity changed at ' + at);
    }
    return;
  }
  assertRecord(base.content, at); assertRecord(selected.content, at);
  assertRecord(base.content.items, at); assertRecord(selected.content.items, at);
  if (JSON.stringify(base.content.order) !== JSON.stringify(selected.content.order) ||
      Object.keys(base.content.items).length !== Object.keys(selected.content.items).length)
    throw Error('Localized Course order changed at ' + at);
  for (const [key, child] of Object.entries(base.content.items))
    verifyIdentity(child, selected.content.items[key], at + '/' + key);
}

/** Consume JSON only. Localized arrays are atomic; Course membership and IDs cannot change. */
export function assembleCourseTree(base: unknown, locale: unknown, id: string, language: LanguageCode): LocalizedCourse {
  languageCode_Schema.parse(language);
  assertSafeJson(base);
  if (locale !== undefined) assertSafeJson(locale);
  const value = merge(base, locale);
  verifyIdentity(base, value, 'course');
  assertRecord(value, 'root');
  if (value.type !== 'course' || value.id !== id || !uuid.test(id)) throw Error('Published Course identity mismatch');
  assertRecord(value.params, 'params');
  if (!Array.isArray(value.params.languages) || !value.params.languages.includes(language))
    throw Error('Course does not support language ' + language);
  const visited = new Set([id]);
  function title(node: Record<string, unknown>) {
    assertRecord(node.locale, 'locale');
    if (typeof node.locale.title !== 'string' || !node.locale.title.trim()) throw Error('Missing localized Course title');
  }
  title(value);
  function visit(content: unknown, parent: 'course' | 'module' | 'chapter') {
    assertRecord(content, parent); assertRecord(content.items, parent);
    if (!Array.isArray(content.order) || content.order.length !== Object.keys(content.items).length ||
        new Set(content.order).size !== content.order.length) throw Error('Invalid Course order');
    for (const key of content.order) {
      if (typeof key !== 'string' || forbidden.has(key) || !Object.hasOwn(content.items, key))
        throw Error('Invalid Course child slot');
      const node = content.items[key];
      assertRecord(node, key);
      if (typeof node.id !== 'string' || !uuid.test(node.id)) throw Error('Invalid Course child identity');
      if (node.type === 'lesson') continue; // repeated references are distinct placements
      if (visited.has(node.id)) throw Error('Duplicate Course-owned identity: ' + node.id);
      visited.add(node.id);
      if (node.type === 'episode') { validateEpisodeRuntime(node, language); continue; }
      if ((node.type !== 'module' && node.type !== 'chapter') || parent === 'chapter' ||
          (parent === 'module' && node.type === 'module')) throw Error('Invalid Course hierarchy');
      title(node);
      visit(node.content, node.type);
    }
  }
  visit(value.content, 'course');
  return value as LocalizedCourse;
}

export type CourseActivity = { node: CourseLessonEntry | LocalizedEpisode; placement: string };
export function courseActivities(course: LocalizedCourse): CourseActivity[] {
  const result: CourseActivity[] = [];
  function visit(content: LocalizedCourseContent, prefix: string[]) {
    for (const key of content.order) {
      const node = content.items[key];
      const path = [...prefix, key];
      if (node.type === 'lesson' || node.type === 'episode') result.push({ node, placement: path.join('/') });
      else visit(node.content, path);
    }
  }
  visit(course.content, []);
  return result;
}
export function findCourseEpisode(course: LocalizedCourse, id: string): LocalizedEpisode | undefined {
  return courseActivities(course).map(item => item.node).find(
    (node): node is LocalizedEpisode => node.type === 'episode' && node.id === id,
  );
}
