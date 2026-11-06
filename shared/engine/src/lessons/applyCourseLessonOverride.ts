import type { Course_LessonOverride, Locale_Languages } from '@svitlo/contracts/content';
import type { LessonContentBlock, LessonResponse, LessonSectionResponse } from './assembleLessonResponse';

type Patch = Course_LessonOverride<Locale_Languages>;
type Block = LessonContentBlock;
type Section = LessonSectionResponse;
const unsafe = new Set(['__proto__', 'constructor', 'prototype']);
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

function mergeObject(base: unknown, patch: unknown): unknown {
  if (!record(base) || !record(patch)) return patch;
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (unsafe.has(key)) throw new Error('Unsafe Course patch field: ' + key);
    result[key] = key in base ? mergeObject(base[key], value) : value;
  }
  return result;
}

/** Normalize authored, single-locale blocks to the existing Lesson renderer contract. */
function asBlock(authored: Record<string, unknown>): Block {
  const block = { ...authored };
  if (block.type === 'markdown') {
    if (typeof block.locales !== 'string') throw new Error('Unlocalized Markdown in Course resource');
    block.text = block.locales;
    delete block.locales;
  }
  if (block.type === 'scene') {
    if (!record(block.locales)) throw new Error('Unlocalized Scene in Course resource');
    block.rendererKey = block.id;
  }
  return block as Block;
}
function normalizedSection(raw: Record<string, unknown>): Section {
  if (!Array.isArray(raw.content)) throw new Error('Invalid authored Course Section content');
  return {
    ...raw,
    content: raw.content.map(value => asBlock(value as Record<string, unknown>)),
    questions: [],
  } as Section;
}
function changedBlocks(blocks: readonly Block[], changes: Record<string, unknown>): Block[] {
  const items = new Map(blocks.map(block => [block.slug, block]));
  const removed = (changes.removed ?? []) as string[];
  for (const slug of removed) {
    if (!items.delete(slug)) throw new Error('Course removed unknown ContentBlock ' + slug);
  }
  for (const entry of (changes.added ?? []) as { block: Record<string, unknown>; source: { type: string } }[]) {
    if (entry.source?.type !== 'course') throw new Error('Course content requires course-owned source');
    const block = asBlock(entry.block);
    if (items.has(block.slug)) throw new Error('Duplicate Course block slug ' + block.slug);
    items.set(block.slug, block);
  }
  for (const [slug, patch] of Object.entries((changes.bySlug ?? {}) as Record<string, Record<string, unknown>>)) {
    const previous = items.get(slug);
    if (!previous) throw new Error('Course changed unknown ContentBlock ' + slug);
    if (['id', 'slug', 'type'].some(key => Object.hasOwn(patch, key))) {
      throw new Error('Cannot change ContentBlock identity');
    }
    const props = { ...patch };
    if (previous.type === 'markdown' && Object.hasOwn(props, 'locales')) {
      if (typeof props.locales !== 'string') throw new Error('Invalid Course Markdown locale');
      props.text = props.locales;
      delete props.locales;
    }
    items.set(slug, mergeObject(previous, props) as Block);
  }
  const order = (changes.order ?? [...items.keys()]) as string[];
  if (order.length !== items.size || new Set(order).size !== order.length ||
      order.some(slug => !items.has(slug))) throw new Error('Incomplete Course ContentBlock order');
  const result = order.map(slug => items.get(slug)!);
  const ids = result.map(block => block.id);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate Course ContentBlock ID');
  return result;
}
function changedSections(sections: readonly Section[], changes: Record<string, unknown>): Section[] {
  const items = new Map(sections.map(section => [section.slug, section]));
  for (const slug of (changes.removed ?? []) as string[]) {
    if (!items.delete(slug)) throw new Error('Course removed unknown Section ' + slug);
  }
  for (const entry of (changes.added ?? []) as { section: Record<string, unknown>; source: { type: string } }[]) {
    if (entry.source?.type !== 'course') throw new Error('Course Section requires course-owned source');
    const section = normalizedSection(entry.section);
    if (items.has(section.slug)) throw new Error('Duplicate Course Section slug ' + section.slug);
    items.set(section.slug, section);
  }
  for (const [slug, patch] of Object.entries((changes.bySlug ?? {}) as Record<string, Record<string, unknown>>)) {
    const section = items.get(slug);
    if (!section) throw new Error('Course changed unknown Section ' + slug);
    if (['id', 'slug', 'type'].some(key => Object.hasOwn(patch, key))) {
      throw new Error('Cannot change Section identity');
    }
    const next = { ...section };
    if (patch.title !== undefined) next.title = patch.title as string;
    if (patch.navigationLabel !== undefined) next.navigationLabel = patch.navigationLabel as string;
    if (patch.skippable === false) delete next.skippable;
    if (patch.skippable === true) next.skippable = true;
    if (patch.content !== undefined) next.content = changedBlocks(section.content, patch.content as Record<string, unknown>);
    items.set(slug, next);
  }
  const order = (changes.order ?? [...items.keys()]) as string[];
  if (order.length !== items.size || new Set(order).size !== order.length ||
      order.some(slug => !items.has(slug))) throw new Error('Incomplete Course Section order');
  const result = order.map(slug => items.get(slug)!);
  const ids = result.map(section => section.id);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate Course Section ID');
  return result;
}

/**
 * Apply a published one-locale Course patch to a resolved Lesson Response.
 * This is NOT sparse localization merge: arrays use explicit slug-based operations.
 * The canonical Lesson and its authored Definition are never mutated.
 */
export function applyCourseLessonOverride(response: LessonResponse, patch: Patch): LessonResponse {
  if (patch.type !== 'lessonOverride' || patch.lessonId !== response.id) {
    throw new Error('Course/Lesson ID mismatch');
  }
  const changes = patch.overrides;
  const parameters = changes.parameters?.sections
    ? {
        ...response.parameters,
        sections: { ...response.parameters.sections, ...changes.parameters.sections },
      }
    : response.parameters;
  const sections = changes.sections
    ? changedSections(response.sections, changes.sections as Record<string, unknown>)
    : response.sections;
  const quizzes = sections.filter(section => section.type === 'quiz');
  if (quizzes.length > 1 || (response.parameters.requireQuiz && quizzes.length !== 1)) {
    throw new Error('Invalid Course quiz Section count');
  }
  for (const section of sections) {
    const quizBlocks = section.content.filter(block => block.type === 'quiz');
    if ((section.type === 'quiz') !== (quizBlocks.length === 1)) {
      throw new Error('Invalid Course quiz ContentBlock count in ' + section.slug);
    }
  }
  const events = changes.events
    ? (mergeObject(response.events ?? {}, changes.events) as LessonResponse['events'])
    : response.events;
  return {
    ...response,
    title: changes.title ?? response.title,
    parameters,
    sections: [...sections],
    ...(events === undefined ? {} : { events }),
  };
}
