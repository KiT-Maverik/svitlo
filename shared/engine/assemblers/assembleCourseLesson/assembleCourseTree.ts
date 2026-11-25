import {
  assessment_Draft_Props_Schema,
  assessment_Props_Schema,
  type Assessment_Draft_Props,
  type Assessment_Props,
} from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';
import { audio_Props_Schema } from '../../configurators/contentBlocks/defineAudio/defineAudio.schemas';
import { carousel_Props_Schema } from '../../configurators/contentBlocks/defineCarousel/defineCarousel.schemas';
import { checkpoint_Props_Schema } from '../../configurators/contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import { code_Props_Schema } from '../../configurators/contentBlocks/defineCode/defineCode.schemas';
import { image_Props_Schema } from '../../configurators/contentBlocks/defineImage/defineImage.schemas';
import { markdown_Props_Schema } from '../../configurators/contentBlocks/defineMarkdown/defineMarkdown.schemas';
import { scene_Props_Schema } from '../../configurators/contentBlocks/defineScene/defineScene.schemas';
import { subtitles_Props_Schema } from '../../configurators/contentBlocks/defineSubtitles/defineSubtitles.schemas';
import { text_Props_Schema } from '../../configurators/contentBlocks/defineText/defineText.schemas';
import { video_Props_Schema } from '../../configurators/contentBlocks/defineVideo/defineVideo.schemas';
import { youtube_Props_Schema } from '../../configurators/contentBlocks/defineYoutube/defineYoutube.schemas';
import {
  episode_Draft_Props_Schema,
  episode_Props_Schema,
  type Episode_Draft_Props,
  type Episode_Props,
} from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import {
  lesson_Draft_Props_Schema,
  type Lesson_Draft_Props,
} from '../../configurators/lessons/defineLesson/defineLesson.schemas';
import { codingTaskSection_Props_Schema } from '../../configurators/sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import {
  contentSection_Props_Schema,
  type Content_Section_Props,
} from '../../configurators/sections/defineContentSection/defineContentSection.schemas';
import { learningFlowSection_Props_Schema } from '../../configurators/sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import { practiceSection_Props_Schema } from '../../configurators/sections/definePracticeSection/definePracticeSection.schemas';
import {
  quizSection_Props_Schema,
  type QuizSection_Props,
} from '../../configurators/sections/defineQuizSection/defineQuizSection.schemas';
import type { Section_Props } from '../../configurators/sections/section.types';
import { languageCode_Schema, type LanguageCode } from '../../schemas';
import type { CourseLessonEntry, CoursePublishedTree } from './assembleCourseLesson';

export type EpisodeSection = Exclude<Section_Props, { type: 'quiz' | 'flashcards' }>;
export type LocalizedEpisode = Omit<Episode_Props, 'section'> & { section: EpisodeSection[] };
/** Zod's resolved block schema retains opaque fields, but runtime validation below
 * resolves every Section/ContentBlock against the concrete kind schemas. */
export type LocalizedAssessment = Omit<Assessment_Props, 'section'> & {
  section: (Content_Section_Props | QuizSection_Props)[];
};
export type LocalizedCourseContent = { items: Record<string, LocalizedCourseNode>; order: string[] };
export type LocalizedCourseNode =
  | CourseLessonEntry
  | Lesson_Draft_Props
  | LocalizedEpisode
  | Episode_Draft_Props
  | LocalizedAssessment
  | Assessment_Draft_Props
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

const forbidden = new Set(['__proto__', 'constructor', 'prototype']);
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
function assertRecord(value: unknown, at: string): asserts value is Record<string, unknown> {
  if (!record(value)) throw Error('Invalid Course object: ' + at);
}
function assertSafeJson(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(assertSafeJson);
    return;
  }
  if (!record(value)) {
    if (
      value !== null &&
      typeof value !== 'string' &&
      typeof value !== 'boolean' &&
      !(typeof value === 'number' && Number.isFinite(value))
    )
      throw Error('Non-JSON Course value');
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

const assessmentSectionSchemas = { content: contentSection_Props_Schema, quiz: quizSection_Props_Schema } as const;

const blockSchemas = {
  text: text_Props_Schema,
  markdown: markdown_Props_Schema,
  code: code_Props_Schema,
  image: image_Props_Schema,
  video: video_Props_Schema,
  audio: audio_Props_Schema,
  subtitles: subtitles_Props_Schema,
  youtube: youtube_Props_Schema,
  carousel: carousel_Props_Schema,
  checkpoint: checkpoint_Props_Schema,
  scene: scene_Props_Schema,
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
    const resolved = sectionSchemas[section.type as keyof typeof sectionSchemas].parse(section);
    const blocks = new Set<string>();
    for (const block of resolved.content) {
      if (blocks.has(block.id) || !Object.hasOwn(blockSchemas, block.type))
        throw Error('Invalid Episode block identity/type: ' + block.id);
      blocks.add(block.id);
      blockSchemas[block.type as keyof typeof blockSchemas].parse(block);
    }
  }
  return episode as LocalizedEpisode;
}

/** Completed Assessments reuse published Content/Quiz Sections, not Lesson banks. */
export function validateAssessmentRuntime(value: unknown, language: LanguageCode): LocalizedAssessment {
  const assessment = assessment_Props_Schema.parse(value);
  if (!assessment.params.languages.includes(language) || !assessment.locale.title.trim()) {
    throw Error('Assessment requires an active locale and a localized title');
  }
  const ids = new Set<string>();
  for (const section of assessment.section) {
    if (ids.has(section.id)) throw Error('Duplicate Assessment Section ID: ' + section.id);
    ids.add(section.id);
    if (section.params.disabled === true) continue;
    const resolved = assessmentSectionSchemas[section.type].parse(section);
    const blockIds = new Set<string>();
    for (const block of resolved.content) {
      if (blockIds.has(block.id) || !Object.hasOwn(blockSchemas, block.type)) {
        throw Error('Invalid Assessment block identity/type: ' + block.id);
      }
      blockIds.add(block.id);
      blockSchemas[block.type as keyof typeof blockSchemas].parse(block);
    }
  }
  return assessment as LocalizedAssessment;
}

function verifyIdentity(base: unknown, selected: unknown, at: string): void {
  assertRecord(base, at);
  assertRecord(selected, at);
  if (base.id !== selected.id || base.type !== selected.type || base.draft !== selected.draft)
    throw Error('Localized Course identity changed at ' + at);
  if (base.type === 'lesson' && base.draft !== true) return;
  if (base.type === 'episode' || base.type === 'assessment' || (base.type === 'lesson' && base.draft === true)) {
    if (
      base.slug !== selected.slug ||
      !Array.isArray(base.section) ||
      !Array.isArray(selected.section) ||
      base.section.length !== selected.section.length
    )
      throw Error('Localized activity Section structure changed at ' + at);
    for (let i = 0; i < base.section.length; i++) {
      const original: unknown = base.section[i],
        translated: unknown = selected.section[i];
      assertRecord(original, at);
      assertRecord(translated, at);
      if (original.id !== translated.id || original.type !== translated.type || original.slug !== translated.slug)
        throw Error('Localized activity Section identity changed at ' + at);
      if (
        !Array.isArray(original.content) ||
        !Array.isArray(translated.content) ||
        original.content.length !== translated.content.length
      )
        throw Error('Localized activity Block structure changed at ' + at);
      for (let j = 0; j < original.content.length; j++) {
        const a: unknown = original.content[j],
          b: unknown = translated.content[j];
        assertRecord(a, at);
        assertRecord(b, at);
        if (a.id !== b.id || a.type !== b.type || a.slug !== b.slug)
          throw Error('Localized activity Block identity changed at ' + at);
      }
    }
    return;
  }
  assertRecord(base.content, at);
  assertRecord(selected.content, at);
  assertRecord(base.content.items, at);
  assertRecord(selected.content.items, at);
  if (
    JSON.stringify(base.content.order) !== JSON.stringify(selected.content.order) ||
    Object.keys(base.content.items).length !== Object.keys(selected.content.items).length
  )
    throw Error('Localized Course order changed at ' + at);
  for (const [key, child] of Object.entries(base.content.items))
    verifyIdentity(child, selected.content.items[key], at + '/' + key);
}

/** Consume JSON only. Localized arrays are atomic; Course membership and IDs cannot change. */
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
  assertRecord(value, 'root');
  if (value.type !== 'course' || value.id !== id || !uuid.test(id)) throw Error('Published Course identity mismatch');
  assertRecord(value.params, 'params');
  if (!Array.isArray(value.params.languages) || !value.params.languages.includes(language))
    throw Error('Course does not support language ' + language);
  const visited = new Set([id]);
  function title(node: Record<string, unknown>) {
    assertRecord(node.locale, 'locale');
    if (typeof node.locale.title !== 'string' || !node.locale.title.trim())
      throw Error('Missing localized Course title');
  }
  title(value);
  function visit(content: unknown, parent: 'course' | 'module' | 'chapter') {
    assertRecord(content, parent);
    assertRecord(content.items, parent);
    if (
      !Array.isArray(content.order) ||
      content.order.length !== Object.keys(content.items).length ||
      new Set(content.order).size !== content.order.length
    )
      throw Error('Invalid Course order');
    for (const key of content.order) {
      if (typeof key !== 'string' || forbidden.has(key) || !Object.hasOwn(content.items, key))
        throw Error('Invalid Course child slot');
      const node = content.items[key];
      assertRecord(node, key);
      if (typeof node.id !== 'string' || !uuid.test(node.id)) throw Error('Invalid Course child identity');
      if (Object.hasOwn(node, 'draft')) {
        if (mode !== 'draft' || node.draft !== true)
          throw Error('Course draft stub cannot be assembled for production at ' + key);
        if (node.slug !== key) throw Error('Invalid Course stub placement: ' + key);
        switch (node.type) {
          case 'lesson':
            lesson_Draft_Props_Schema.parse(node);
            break;
          case 'episode':
            episode_Draft_Props_Schema.parse(node);
            break;
          case 'assessment':
            assessment_Draft_Props_Schema.parse(node);
            break;
          default:
            throw Error('Invalid Course draft child kind at ' + key);
        }
        if (visited.has(node.id)) throw Error('Duplicate Course draft identity: ' + node.id);
        visited.add(node.id);
        continue;
      }
      if (node.type === 'lesson') continue; // repeated completed Lesson references are distinct placements
      if (visited.has(node.id)) throw Error('Duplicate Course-owned identity: ' + node.id);
      visited.add(node.id);
      if (node.type === 'episode') {
        validateEpisodeRuntime(node, language);
        continue;
      }
      if (node.type === 'assessment') {
        validateAssessmentRuntime(node, language);
        continue;
      }
      if (
        (node.type !== 'module' && node.type !== 'chapter') ||
        parent === 'chapter' ||
        (parent === 'module' && node.type === 'module')
      )
        throw Error('Invalid Course hierarchy');
      title(node);
      visit(node.content, node.type);
    }
  }
  visit(value.content, 'course');
  return value as LocalizedCourse;
}

export type CourseActivity = {
  node:
    | CourseLessonEntry
    | Lesson_Draft_Props
    | LocalizedEpisode
    | Episode_Draft_Props
    | LocalizedAssessment
    | Assessment_Draft_Props;
  placement: string;
};
export function courseActivities(course: LocalizedCourse): CourseActivity[] {
  const result: CourseActivity[] = [];
  function visit(content: LocalizedCourseContent, prefix: string[]) {
    for (const key of content.order) {
      const node = content.items[key];
      const path = [...prefix, key];
      if (node.type === 'lesson' || node.type === 'episode' || node.type === 'assessment')
        result.push({ node, placement: path.join('/') });
      else visit(node.content, path);
    }
  }
  visit(course.content, []);
  return result;
}
export function findCourseEpisode(
  course: LocalizedCourse,
  id: string,
): LocalizedEpisode | Episode_Draft_Props | undefined {
  return courseActivities(course)
    .map(item => item.node)
    .find((node): node is LocalizedEpisode | Episode_Draft_Props => node.type === 'episode' && node.id === id);
}

export function findCourseAssessment(
  course: LocalizedCourse,
  id: string,
): LocalizedAssessment | Assessment_Draft_Props | undefined {
  return courseActivities(course)
    .map(item => item.node)
    .find((node): node is LocalizedAssessment | Assessment_Draft_Props => node.type === 'assessment' && node.id === id);
}
