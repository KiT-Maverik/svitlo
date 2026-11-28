import { z } from 'zod';

import { languageCode_Schema, type LanguageCode } from '../../schemas/languages.schemas';

/** Direct placement keys are canonical Data. Presentation arrays belong to UI adapters. */
export type CourseTocContent = { children: string[]; [placement: string]: unknown };
export type CourseTocNode =
  | { id: string; type: 'module' | 'chapter'; label: string; children: string[]; [placement: string]: unknown }
  | { id: string; type: 'lesson' | 'episode' | 'assessment'; label: string; draft?: true };
export type CourseToc = {
  id: string;
  type: 'course';
  languages: LanguageCode[];
  label: string;
  children: string[];
  [placement: string]: unknown;
};

const forbidden = new Set(['__proto__', 'constructor', 'prototype']);
const slot = /^[a-z][a-zA-Z0-9]*$/;
const record = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const rootSchema = z.looseObject({
  id: z.uuid(),
  type: z.literal('course'),
  languages: z.array(languageCode_Schema).nonempty(),
  label: z.string().trim().min(1).optional(),
  children: z.array(z.string()),
});
const nodeSchema = z.looseObject({
  id: z.uuid(),
  type: z.enum(['module', 'chapter', 'lesson', 'episode', 'assessment']),
  label: z.string().trim().min(1).optional(),
  draft: z.literal(true).optional(),
  children: z.array(z.string()).optional(),
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
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index++) {
      if (!Object.hasOwn(value, index)) throw Error('Sparse TOC array');
      safeJson(value[index], seen);
    }
  } else {
    for (const [key, child] of Object.entries(value)) {
      if (forbidden.has(key)) throw Error('Unsafe TOC key: ' + key);
      safeJson(child, seen);
    }
    if (Object.getOwnPropertySymbols(value).length) throw Error('Invalid TOC symbol key');
  }
  seen.delete(value);
}
function merge(base: unknown, patch: unknown): unknown {
  if (patch === undefined) return structuredClone(base);
  if (!record(base) || !record(patch)) return structuredClone(patch);
  const result: Record<string, unknown> = structuredClone(base);
  for (const [key, value] of Object.entries(patch)) {
    if (forbidden.has(key)) throw Error('Unsafe TOC property');
    result[key] = merge(base[key], value);
  }
  return result;
}
function validateTree(value: unknown, complete: boolean, mode: 'draft' | 'production'): CourseToc {
  const root = rootSchema.parse(value);
  if (new Set(root.languages).size !== root.languages.length) throw Error('Duplicate TOC languages');
  if (complete && !root.label) throw Error('Missing localized Course TOC label');
  const seen = new Set([root.id]);
  function visit(owner: Record<string, unknown>, parent: 'course' | 'module' | 'chapter', at: string): void {
    const children = owner.children;
    if (!Array.isArray(children) || new Set(children).size !== children.length)
      throw Error('Invalid Course TOC order at ' + at);
    const metadata =
      parent === 'course' ? ['id', 'type', 'languages', 'label', 'children'] : ['id', 'type', 'label', 'children'];
    const slots = Object.keys(owner).filter(key => !metadata.includes(key));
    if (slots.length !== children.length || slots.some(key => !children.includes(key)))
      throw Error('Unaddressed Course TOC slot at ' + at);
    for (const key of children) {
      if (typeof key !== 'string' || !slot.test(key) || !Object.hasOwn(owner, key))
        throw Error('Invalid Course TOC slot at ' + at);
      const node = nodeSchema.parse(owner[key]);
      if (complete && !node.label) throw Error('Missing localized TOC label at ' + at + '/' + key);
      if (node.draft && (mode !== 'draft' || !['lesson', 'episode', 'assessment'].includes(node.type)))
        throw Error('Draft TOC activity in production at ' + at + '/' + key);
      if (node.type !== 'lesson' || node.draft) {
        if (seen.has(node.id)) throw Error('Duplicate TOC entity ID: ' + node.id);
        seen.add(node.id);
      }
      if (node.type === 'module' || node.type === 'chapter') {
        if (node.draft || parent === 'chapter' || (parent === 'module' && node.type === 'module'))
          throw Error('Invalid Course TOC hierarchy at ' + at + '/' + key);
        if (node.children === undefined) throw Error('Missing TOC children at ' + at + '/' + key);
        visit(node, node.type, at + '/' + key);
      } else if (
        node.children !== undefined ||
        Object.keys(node).some(field => !['id', 'type', 'label', 'draft'].includes(field))
      ) {
        throw Error('Unexpected activity TOC placements at ' + at + '/' + key);
      }
    }
  }
  visit(root, 'course', 'course');
  return value as CourseToc;
}
/** Translation can only change labels, never the addressable Course hierarchy. */
function assertSameStructure(base: CourseToc, selected: CourseToc): void {
  if (
    base.id !== selected.id ||
    base.type !== selected.type ||
    JSON.stringify(base.languages) !== JSON.stringify(selected.languages)
  )
    throw Error('Localized Course TOC root identity changed');
  function walk(a: Record<string, unknown>, b: Record<string, unknown>): void {
    if (JSON.stringify(a.children) !== JSON.stringify(b.children)) throw Error('Localized Course TOC order changed');
    for (const key of a.children as string[]) {
      const x = a[key],
        y = b[key];
      if (!record(x) || !record(y) || x.id !== y.id || x.type !== y.type || x.draft !== y.draft)
        throw Error('Localized Course TOC identity changed at ' + key);
      if (x.type === 'module' || x.type === 'chapter') walk(x, y);
    }
  }
  walk(base, selected);
}
/** Pure host-neutral assembler. Input JSON is already Data-shaped and sparse by locale. */
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
