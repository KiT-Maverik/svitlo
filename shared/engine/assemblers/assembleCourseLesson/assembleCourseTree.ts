import {
  assessment_Completed_Data_Schema,
  assessment_Draft_Data_Schema,
  type Assessment_Data,
  type Assessment_Draft_Data,
} from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';
import { carousel_Data_Schema } from '../../configurators/contentBlocks/composite/defineCarousel/defineCarousel.schemas';
import { checkpoint_Data_Schema } from '../../configurators/contentBlocks/composite/defineCheckpoint/defineCheckpoint.schemas';
import { audio_Data_Schema } from '../../configurators/contentBlocks/primitive/defineAudio/defineAudio.schemas';
import { code_Data_Schema } from '../../configurators/contentBlocks/primitive/defineCode/defineCode.schemas';
import { image_Data_Schema } from '../../configurators/contentBlocks/primitive/defineImage/defineImage.schemas';
import { markdown_Data_Schema } from '../../configurators/contentBlocks/primitive/defineMarkdown/defineMarkdown.schemas';
import { scene_Data_Schema } from '../../configurators/contentBlocks/primitive/defineScene/defineScene.schemas';
import { subtitles_Data_Schema } from '../../configurators/contentBlocks/primitive/defineSubtitles/defineSubtitles.schemas';
import { text_Data_Schema } from '../../configurators/contentBlocks/primitive/defineText/defineText.schemas';
import { video_Data_Schema } from '../../configurators/contentBlocks/primitive/defineVideo/defineVideo.schemas';
import { youtube_Data_Schema } from '../../configurators/contentBlocks/primitive/defineYoutube/defineYoutube.schemas';
import {
  episode_Completed_Data_Schema, episode_Draft_Data_Schema,
  type Episode_Data, type Episode_Draft_Data,
} from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import { lesson_Draft_Data_Schema, type Lesson_Draft_Data } from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import { codingTaskSection_Data_Schema } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { contentSection_Data_Schema } from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import { learningFlowSection_Data_Schema } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import { practiceSection_Data_Schema } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import { quizSection_Data_Schema } from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import { languageCode_Schema, type LanguageCode } from '../../schemas';
import type { CourseLessonEntry, CoursePublishedTree } from './assembleCourseLesson';

export type LocalizedEpisode = Episode_Data;
export type LocalizedAssessment = Exclude<Assessment_Data, Assessment_Draft_Data>;
export type LocalizedCourseNode =
  | CourseLessonEntry | Lesson_Draft_Data | LocalizedEpisode | Episode_Draft_Data
  | LocalizedAssessment | Assessment_Draft_Data
  | { id: string; type: 'module' | 'chapter'; children: string[]; locale: { title: string }; [key: string]: unknown };
export type LocalizedCourse = CoursePublishedTree & {
  locale: { title: string };
};

const forbidden = new Set(['__proto__', 'constructor', 'prototype']);
const slot = /^[a-z][a-zA-Z0-9]*$/;
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
/** Membership is indexed when the complete resolved Course is validated, not during navigation. */
const validatedPlacementIndexes = new WeakMap<object, WeakMap<object, Set<string>>>();
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function assertRecord(value: unknown, at: string): asserts value is Record<string, unknown> {
  if (!record(value)) throw Error('Invalid Course object: ' + at);
}
function assertSafeJson(value: unknown, ancestors = new Set<object>()): void {
  if (Array.isArray(value)) {
    if (ancestors.has(value)) throw Error('Circular Course array');
    ancestors.add(value);
    for (let index = 0; index < value.length; index++) {
      if (!Object.hasOwn(value, index)) throw Error('Sparse Course array');
      assertSafeJson(value[index], ancestors);
    }
    ancestors.delete(value);
    return;
  }
  if (!record(value)) {
    if (value !== null && typeof value !== 'string' && typeof value !== 'boolean' &&
        !(typeof value === 'number' && Number.isFinite(value))) throw Error('Non-JSON Course value');
    return;
  }
  if (ancestors.has(value) || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null))
    throw Error('Invalid Course JSON object');
  ancestors.add(value);
  for (const [key, child] of Object.entries(value)) {
    if (forbidden.has(key)) throw Error('Unsafe Course key: ' + key);
    assertSafeJson(child, ancestors);
  }
  if (Object.getOwnPropertySymbols(value).length) throw Error('Symbol Course key');
  ancestors.delete(value);
}
/** Atomic arrays; only false in a previously ordered placement is a deletion. */
function merge(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return structuredClone(base);
  if (!record(base) || !record(patch)) return structuredClone(patch);
  const result: Record<string, unknown> = structuredClone(base);
  const children = new Set(Array.isArray(base.children) ? base.children : []);
  for (const [key, value] of Object.entries(patch)) {
    if (forbidden.has(key)) throw Error('Unsafe Course patch key');
    if (value === false && children.has(key)) delete result[key];
    else result[key] = merge(base[key], value);
  }
  return result;
}

const sectionSchemas = {
  content: contentSection_Data_Schema,
  practice: practiceSection_Data_Schema,
  codingTask: codingTaskSection_Data_Schema,
  learningFlow: learningFlowSection_Data_Schema,
} as const;
const blocks = {
  text: text_Data_Schema, markdown: markdown_Data_Schema, code: code_Data_Schema,
  image: image_Data_Schema, video: video_Data_Schema, audio: audio_Data_Schema,
  subtitles: subtitles_Data_Schema, youtube: youtube_Data_Schema,
  carousel: carousel_Data_Schema, checkpoint: checkpoint_Data_Schema, scene: scene_Data_Schema,
} as const;

function validateSection(value: unknown, at: string, allowed: readonly string[]): void {
  assertRecord(value, at);
  if (!allowed.includes(String(value.type))) throw Error('Unsupported Section kind at ' + at);
  if (value.type === 'quiz') quizSection_Data_Schema.parse(value);
  else sectionSchemas[value.type as keyof typeof sectionSchemas].parse(value);
  if (!Array.isArray(value.children)) throw Error('Missing Section children at ' + at);
  const ids = new Set<string>();
  for (const key of value.children) {
    if (typeof key !== 'string' || !slot.test(key) || !Object.hasOwn(value, key))
      throw Error('Invalid Section placement at ' + at);
    const block: unknown = value[key];
    assertRecord(block, at + '/' + key);
    if (typeof block.id !== 'string' || !uuid.test(block.id) || ids.has(block.id) ||
        !Object.hasOwn(blocks, String(block.type))) throw Error('Invalid Section block at ' + at + '/' + key);
    ids.add(block.id);
    blocks[block.type as keyof typeof blocks].parse(block);
  }
}
/** Episode events are opaque authored JSON, not an implemented reaction protocol. */
export function validateEpisodeRuntime(value: unknown, language: LanguageCode): LocalizedEpisode {
  const episode = episode_Completed_Data_Schema.parse(value);
  if (!episode.params.languages.includes(language) || !episode.locale.title.trim() || !episode.children.length)
    throw Error('Episode requires an active locale and nonempty ordered Sections');
  if (Object.keys(episode.events ?? {}).length) throw Error('Unsupported Episode event semantics');
  const ids = new Set<string>();
  for (const key of episode.children) {
    const section: unknown = episode[key];
    assertRecord(section, 'Episode/' + key);
    if (typeof section.id !== 'string' || ids.has(section.id)) throw Error('Duplicate Episode Section ID');
    ids.add(section.id);
    validateSection(section, 'Episode/' + key, Object.keys(sectionSchemas));
  }
  return episode;
}
/** Completed Assessment has one mandatory Quiz and two independently ordered Content phases. */
export function validateAssessmentRuntime(value: unknown, language: LanguageCode): LocalizedAssessment {
  const assessment = assessment_Completed_Data_Schema.parse(value);
  if (!assessment.params.languages.includes(language) || !assessment.locale.title.trim())
    throw Error('Assessment requires an active locale and a localized title');
  const ids = new Set<string>();
  for (const phase of ['before', 'after'] as const) {
    const collection = assessment[phase];
    for (const key of collection.children) {
      const section = collection[key];
      assertRecord(section, phase + '/' + key);
      if (typeof section.id !== 'string' || ids.has(section.id)) throw Error('Duplicate Assessment Section ID');
      ids.add(section.id);
      validateSection(section, phase + '/' + key, ['content']);
    }
  }
  if (ids.has(assessment.quiz.id)) throw Error('Duplicate Assessment Quiz identity');
  validateSection(assessment.quiz, 'Assessment/quiz', ['quiz']);
  return assessment;
}
/** Changes in translation must not modify the ordered identity tree. */
function verifyIdentity(base: unknown, selected: unknown, at: string): void {
  assertRecord(base, at);
  assertRecord(selected, at);
  if (base.id !== selected.id || base.type !== selected.type || base.draft !== selected.draft ||
      (base.slug !== undefined && base.slug !== selected.slug)) throw Error('Localized Course identity changed at ' + at);
  // Language availability is authored identity, never locale-dependent metadata.
  if (base.type === 'course' || base.type === 'episode' || base.type === 'assessment' ||
      (base.type === 'lesson' && base.draft === true)) {
    assertRecord(base.params, at + '/params');
    assertRecord(selected.params, at + '/params');
    if (!Array.isArray(base.params.languages) ||
        JSON.stringify(base.params.languages) !== JSON.stringify(selected.params.languages)) {
      throw Error('Localized Course language scope changed at ' + at);
    }
  }
  if (Array.isArray(base.children)) {
    if (JSON.stringify(base.children) !== JSON.stringify(selected.children))
      throw Error('Localized Course children changed at ' + at);
    for (const key of base.children) verifyIdentity(base[key], selected[key], at + '/' + key);
  }
  if (base.type === 'assessment') {
    if (base.draft === true) {
      verifyIdentity(base.preview, selected.preview, at + '/preview');
      return;
    }
    for (const phase of ['before', 'after']) {
      const a = base[phase], b = selected[phase];
      assertRecord(a, at + '/' + phase);
      assertRecord(b, at + '/' + phase);
      if (JSON.stringify(a.children) !== JSON.stringify(b.children)) throw Error('Localized Assessment order changed');
      for (const key of a.children as string[]) verifyIdentity(a[key], b[key], at + '/' + phase + '/' + key);
    }
    verifyIdentity(base.quiz, selected.quiz, at + '/quiz');
  }
}

/** Consume published JSON, not authored Configs; validate the whole tree once per requested language. */
export function assembleCourseTree(
  base: unknown,
  locale: unknown,
  id: string,
  language: LanguageCode,
  mode: 'production' | 'draft' = 'production',
): LocalizedCourse {
  languageCode_Schema.parse(language);
  if (mode !== 'production' && mode !== 'draft') throw Error('Unsupported Course assembly mode');
  assertSafeJson(base);
  if (locale !== undefined) assertSafeJson(locale);
  const value = merge(base, locale);
  verifyIdentity(base, value, 'course');
  assertRecord(value, 'course');
  if (value.type !== 'course' || value.id !== id || !uuid.test(id)) throw Error('Published Course identity mismatch');
  assertRecord(value.params, 'params');
  if (!Array.isArray(value.params.languages) || !value.params.languages.includes(language))
    throw Error('Course does not support language ' + language);
  const visited = new Set([id]);
  const membershipIndex = new WeakMap<object, Set<string>>();
  function title(node: Record<string, unknown>): void {
    assertRecord(node.locale, 'locale');
    if (typeof node.locale.title !== 'string' || !node.locale.title.trim()) throw Error('Missing localized Course title');
  }
  function visit(owner: Record<string, unknown>, parent: 'course' | 'module' | 'chapter'): void {
    title(owner);
    const children = owner.children;
    if (!Array.isArray(children) || new Set(children).size !== children.length)
      throw Error('Invalid Course children');
    const keys = Object.keys(owner).filter(key => !['id', 'slug', 'type', 'params', 'locale', 'children'].includes(key));
    if (keys.length !== children.length || keys.some(key => !children.includes(key)))
      throw Error('Unaddressed Course placement keys');
    membershipIndex.set(owner, new Set(children));
    for (const key of children) {
      if (typeof key !== 'string' || !slot.test(key) || !Object.hasOwn(owner, key))
        throw Error('Invalid Course child slot');
      const node: unknown = owner[key];
      assertRecord(node, key);
      if (typeof node.id !== 'string' || !uuid.test(node.id)) throw Error('Invalid Course child identity');
      if (Object.hasOwn(node, 'draft')) {
        if (mode !== 'draft' || node.draft !== true || node.slug !== key)
          throw Error('Course draft stub cannot be assembled for production at ' + key);
        switch (node.type) {
          case 'lesson': lesson_Draft_Data_Schema.parse(node); break;
          case 'episode': episode_Draft_Data_Schema.parse(node); break;
          case 'assessment': assessment_Draft_Data_Schema.parse(node); break;
          default: throw Error('Invalid Course draft child kind');
        }
      } else if (node.type === 'lesson') {
        // Completed Lesson is a compact reference, not a duplicate full Lesson payload.
        if (Object.keys(node).some(field => !['id', 'type', 'overrides'].includes(field)))
          throw Error('Noncompact Course Lesson reference at ' + key);
        continue; // Reuse of a completed Lesson UUID is intentional.
      } else if (node.type === 'episode') validateEpisodeRuntime(node, language);
      else if (node.type === 'assessment') validateAssessmentRuntime(node, language);
      else {
        if ((node.type !== 'module' && node.type !== 'chapter') || parent === 'chapter' ||
            (parent === 'module' && node.type === 'module')) throw Error('Invalid Course hierarchy');
        visit(node, node.type);
      }
      if (visited.has(node.id)) throw Error('Duplicate Course-owned identity: ' + node.id);
      visited.add(node.id);
    }
  }
  visit(value, 'course');
  validatedPlacementIndexes.set(value, membershipIndex);
  return value as LocalizedCourse;
}

export type CourseActivity = {
  node: CourseLessonEntry | Lesson_Draft_Data | LocalizedEpisode | Episode_Draft_Data |
    LocalizedAssessment | Assessment_Draft_Data;
  placement: string;
};
export function courseActivities(course: LocalizedCourse): CourseActivity[] {
  const result: CourseActivity[] = [];
  function visit(owner: Record<string, unknown>, prefix: string[]): void {
    for (const key of owner.children as string[]) {
      const node = owner[key];
      assertRecord(node, 'Course activity');
      const path = [...prefix, key];
      if (node.type === 'lesson' || node.type === 'episode' || node.type === 'assessment')
        result.push({ node: node as CourseActivity['node'], placement: path.join('/') });
      else visit(node, path);
    }
  }
  visit(course, []);
  return result;
}

/** O(depth) navigation over a tree whose exhaustive child order was validated at assembly. */
export function findCourseActivityByPlacement(course: LocalizedCourse, placement: string): CourseActivity | undefined {
  if (typeof placement !== 'string' || !placement ||
      placement.split('/').some(key => !slot.test(key) || forbidden.has(key)))
    throw Error('Unsafe Course placement path');
  const index = validatedPlacementIndexes.get(course);
  if (!index) throw Error('Course placement lookup requires an assembled, validated Course');
  let owner: Record<string, unknown> = course;
  const path = placement.split('/');
  for (const key of path) {
    if (!index.get(owner)?.has(key) || !Object.hasOwn(owner, key)) return undefined;
    const child: unknown = owner[key];
    assertRecord(child, placement);
    owner = child;
  }
  if (!['lesson', 'episode', 'assessment'].includes(String(owner.type))) return undefined;
  return { node: owner as CourseActivity['node'], placement };
}
export function findCourseEpisode(course: LocalizedCourse, id: string): LocalizedEpisode | Episode_Draft_Data | undefined {
  return courseActivities(course).map(item => item.node)
    .find((node): node is LocalizedEpisode | Episode_Draft_Data => node.type === 'episode' && node.id === id);
}
export function findCourseAssessment(course: LocalizedCourse, id: string): LocalizedAssessment | Assessment_Draft_Data | undefined {
  return courseActivities(course).map(item => item.node)
    .find((node): node is LocalizedAssessment | Assessment_Draft_Data => node.type === 'assessment' && node.id === id);
}
