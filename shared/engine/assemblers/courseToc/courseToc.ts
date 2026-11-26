import { z } from 'zod';

import { languageCode_Schema, type LanguageCode } from '../../schemas/languages.schemas';

/** Host-neutral navigation. A slot key identifies a placement; Lesson IDs may repeat. */
export type CourseTocContent = { items: Record<string, CourseTocNode>; order: string[] };
export type CourseTocNode =
  | { id: string; type: 'module' | 'chapter'; label: string; content: CourseTocContent }
  | { id: string; type: 'lesson' | 'episode' | 'assessment'; label: string; draft?: true };
export type CourseToc = {
  id: string;
  type: 'course';
  languages: LanguageCode[];
  label: string;
  content: CourseTocContent;
};

const forbidden = new Set(['__proto__', 'constructor', 'prototype']);
const slot = /^[a-z][a-zA-Z0-9]*$/;
const record = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const rootSchema = z.strictObject({
  id: z.uuid(),
  type: z.literal('course'),
  languages: z.array(languageCode_Schema).nonempty(),
  label: z.string().trim().min(1).optional(),
  content: z.unknown(),
});
const nodeSchema = z.strictObject({
  id: z.uuid(),
  type: z.enum(['module', 'chapter', 'lesson', 'episode', 'assessment']),
  label: z.string().trim().min(1).optional(),
  draft: z.literal(true).optional(),
  content: z.unknown().optional(),
});
const contentSchema = z.strictObject({
  items: z.record(z.string(), z.unknown()),
  order: z.array(z.string()),
});

function safeJson(value: unknown, seen = new Set<object>()): void {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (typeof value !== 'object' || value === null || seen.has(value)) throw Error('Invalid TOC JSON value');
  if (
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  )
    throw Error('Invalid TOC JSON object');
  seen.add(value);
  for (const [key, child] of Object.entries(value)) {
    if (forbidden.has(key)) throw Error('Unsafe TOC key: ' + key);
    safeJson(child, seen);
  }
  if (Object.getOwnPropertySymbols(value).length) throw Error('Invalid TOC symbol key');
  seen.delete(value);
}
function merge(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return structuredClone(base);
  if (!record(base) || !record(patch)) return structuredClone(patch);
  const result: Record<string, unknown> = structuredClone(base);
  for (const [key, value] of Object.entries(patch)) result[key] = merge(base[key], value);
  return result;
}

function validateTree(value: unknown, complete: boolean, mode: 'draft' | 'production'): CourseToc {
  const root = rootSchema.parse(value);
  if (new Set(root.languages).size !== root.languages.length) throw Error('Duplicate TOC languages');
  if (complete && !root.label) throw Error('Missing localized Course TOC label');
  const seen = new Set([root.id]);
  function visit(input: unknown, parent: 'course' | 'module' | 'chapter', at: string): void {
    const content = contentSchema.parse(input);
    if (
      content.order.length !== Object.keys(content.items).length ||
      new Set(content.order).size !== content.order.length
    )
      throw Error('Invalid Course TOC order at ' + at);
    for (const key of content.order) {
      if (!slot.test(key) || !Object.hasOwn(content.items, key)) throw Error('Invalid Course TOC slot at ' + at);
      const node = nodeSchema.parse(content.items[key]);
      if (complete && !node.label) throw Error('Missing localized TOC label at ' + at + '/' + key);
      if (node.draft) {
        if (mode !== 'draft' || !['lesson', 'episode', 'assessment'].includes(node.type))
          throw Error('Draft TOC activity in production at ' + at + '/' + key);
      }
      if (node.type !== 'lesson' || node.draft) {
        if (seen.has(node.id)) throw Error('Duplicate TOC entity ID: ' + node.id);
        seen.add(node.id);
      }
      if (node.type === 'module' || node.type === 'chapter') {
        if (node.draft || parent === 'chapter' || (parent === 'module' && node.type === 'module'))
          throw Error('Invalid Course TOC hierarchy at ' + at + '/' + key);
        visit(node.content, node.type, at + '/' + key);
      } else if (node.content !== undefined) {
        throw Error('Unexpected activity TOC children at ' + at + '/' + key);
      }
    }
  }
  visit(root.content, 'course', 'course');
  return value as CourseToc;
}

/** Locale patches may change labels only, never the immutable hierarchy or draft status. */
function assertSameStructure(base: CourseToc, selected: CourseToc): void {
  if (
    base.id !== selected.id ||
    base.type !== selected.type ||
    JSON.stringify(base.languages) !== JSON.stringify(selected.languages)
  )
    throw Error('Localized Course TOC root identity changed');
  function walk(a: CourseTocContent, b: CourseTocContent): void {
    if (JSON.stringify(a.order) !== JSON.stringify(b.order)) throw Error('Localized Course TOC order changed');
    for (const key of a.order) {
      const x = a.items[key],
        y = b.items[key];
      if (
        !x ||
        !y ||
        x.id !== y.id ||
        x.type !== y.type ||
        ('draft' in x ? x.draft : undefined) !== ('draft' in y ? y.draft : undefined)
      )
        throw Error('Localized Course TOC identity changed at ' + key);
      if ('content' in x && 'content' in y) walk(x.content, y.content);
      else if ('content' in x || 'content' in y) throw Error('Localized Course TOC hierarchy changed');
    }
  }
  walk(base.content, selected.content);
}

/** Pure runtime assembler; requires a real selected locale and never loads Lesson Props. */
export function assembleCourseToc(
  base: unknown,
  locale: unknown,
  courseId: string,
  language: LanguageCode,
  mode: 'draft' | 'production' = 'production',
): CourseToc {
  const selected = languageCode_Schema.parse(language);
  if (mode !== 'draft' && mode !== 'production') throw Error('Unsupported Course TOC mode');
  safeJson(base);
  if (locale !== undefined) safeJson(locale);
  const original = validateTree(base, false, mode);
  if (original.id !== courseId || !original.languages.includes(selected))
    throw Error('Course TOC ID or requested language mismatch');
  const resolved = validateTree(merge(base, locale), true, mode);
  assertSameStructure(original, resolved);
  return resolved;
}
