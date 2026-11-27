/**
 * A FlashcardSide is a source-only ordered ContentBlock collection.
 * There is deliberately no side UUID or slug; parent supplies front/back/hint.
 * This materializer delegates each concrete block to its owning materializer.
 */
import {
  primitiveContentBlockTypes,
  type ContentBlock_Primitive_Type,
} from '../../../configurators/contentBlocks/contentBlock.constants';
import type { FlashcardSide_Config } from '../../../configurators/flashcards/defineFlashcardSide/defineFlashcardSide.schemas';
import type { LanguageCode, SupportedLanguages } from '../../../schemas/languages.schemas';
import { createSourceIdentifierRegistry, renderSourceItem } from '../sourceIdentifiers.mjs';

export type PlainBlock = { id: string; slug: string; type: ContentBlock_Primitive_Type } & Record<string, unknown>;
export type BlockNode = PlainBlock | { config: PlainBlock; production?: Record<string, unknown> };
export type FlashcardSideSource = FlashcardSide_Config & { children: string[] };
export type SourceFile = { path: string; content: string; kind: 'typescript' | 'markdown' | 'code' };
export type SourceDiagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type ChildResult = { exportName: string; files: SourceFile[]; diagnostics?: SourceDiagnostic[] };
export type FlashcardSideContext = {
  /** The exact side folder, e.g. flashcards/name/content/front. */
  directory: string;
  role: 'front' | 'back' | 'hint';
  languages: { document: LanguageCode; planned: SupportedLanguages };
  ownerLanguagesImport?: string;
  existingPaths?: ReadonlySet<string>;
  /** Owner C/D concrete block renderer, supplied by parent orchestrator. */
  materializeBlock: (
    node: { config: PlainBlock; production?: Record<string, unknown> },
    context: {
      directory: string;
      documentLanguage: string;
    },
  ) => ChildResult;
};
const validSlug = /^[a-z][A-Za-z0-9]*$/;
const validUUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const validLocale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const identifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
const allowed: ReadonlySet<string> = new Set(primitiveContentBlockTypes);
const record = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
function fail(location: string, message: string): never {
  throw new Error('flashcardSide ' + location + ': ' + message);
}
function safePath(value: string): void {
  if (
    !value ||
    value.startsWith('/') ||
    value
      .split('/')
      .some(part => !part || part === '.' || part === '..' || !/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9]+)?$/.test(part))
  )
    fail(value, 'unsafe output path');
}
function safeSlug(value: unknown, location: string): string {
  if (typeof value !== 'string' || !validSlug.test(value) || ['constructor', 'prototype', '__proto__'].includes(value))
    fail(location, 'unsafe block slug');
  return value;
}
/** All children must be accounted for once; do not silently reorder or drop blocks. */
function assertSide(source: FlashcardSideSource, role: FlashcardSideContext['role']): void {
  if (!record(source) || !Array.isArray(source.children) || Object.hasOwn(source, 'items') || Object.hasOwn(source, 'order'))
    fail('content.' + role, 'expected direct child keys and children order');
  const keys = Object.keys(source).filter(key => key !== 'children');
  if (
    keys.length !== source.children.length ||
    new Set(source.children).size !== keys.length ||
    source.children.some(key => typeof key !== 'string' || !Object.hasOwn(source, key))
  )
    fail('content.' + role + '.order', 'order must include every item once');
  if (role !== 'hint' && keys.length === 0) fail('content.' + role, 'required front/back cannot be empty');
  for (const key of keys) safeSlug(key, 'content.' + role + '.children.' + key);
}
export function materializeFlashcardSide(source: FlashcardSideSource, context: FlashcardSideContext): ChildResult {
  assertSide(source, context.role);
  if (!context.languages || !validLocale.test(context.languages.document))
    fail('languages.document', 'invalid source language');
  const planned = context.languages.planned;
  if (
    !Array.isArray(planned) ||
    planned.length === 0 ||
    new Set(planned).size !== planned.length ||
    !planned.includes(context.languages.document) ||
    planned.some(code => !validLocale.test(code))
  )
    fail('languages.planned', 'unique nonempty planned languages must include the source language');
  safePath(context.directory);
  const files: SourceFile[] = [];
  const diagnostics: SourceDiagnostic[] = [];
  const imports: string[] = [];
  const entries: string[] = [];
  const claim = createSourceIdentifierRegistry('flashcardSide', [
    'defineFlashcardSide',
    'Languages',
    'items',
    'children',
    context.role,
  ]);
  for (const key of source.children) {
    const node = source[key];
    if (!record(node)) fail('children.' + key, 'plain ContentBlock Config required');
    const candidate: unknown = record(node.config) ? node.config : node;
    if (!record(candidate) || typeof candidate.type !== 'string' || !allowed.has(candidate.type))
      fail('children.' + key, 'unsupported concrete ContentBlock');
    const child = candidate;
    if (typeof child.id !== 'string' || !validUUID.test(child.id))
      fail('children.' + key + '.id', 'existing block UUID required');
    if (safeSlug(child.slug, 'children.' + key + '.slug') !== key)
      fail('children.' + key + '.slug', 'slug must equal map key');
    // The role directory already owns this collection. Avoid a redundant /items/ layer.
    const childDir = context.directory + '/' + key;
    safePath(childDir);
    const output = context.materializeBlock(
      { config: child as PlainBlock, ...(record(node.production) ? { production: node.production } : {}) },
      { directory: childDir, documentLanguage: context.languages.document },
    );
    if (!output || !identifier.test(output.exportName) || !Array.isArray(output.files))
      fail('children.' + key, 'invalid delegated ContentBlock output');
    for (const file of output.files) {
      if (!file.path.startsWith(childDir + '/'))
        fail('children.' + key, 'delegated ContentBlock escaped its assigned directory');
    }
    if (!output.files.some(file => file.path === childDir + '/index.ts' && file.kind === 'typescript'))
      fail('children.' + key, 'missing delegated ContentBlock index.ts');
    const name = claim(output.exportName, 'children.' + key);
    imports.push('import { ' + name + ' } from ' + JSON.stringify('./' + key) + ';');
    entries.push('  ' + renderSourceItem(key, name) + ',');
    files.push(...output.files);
    diagnostics.push(...(output.diagnostics ?? []));
  }
  const sourceText = [
    "import { defineFlashcardSide } from '@svitlo/engine/build';",
    ...(context.ownerLanguagesImport
      ? ['import type { Languages } from ' + JSON.stringify(context.ownerLanguagesImport) + ';']
      : []),
    ...imports,
    '',
    'const items = {',
    '' + entries.join('\n'),
    '};',
    '',
    'export const ' +
      context.role +
      ' = defineFlashcardSide<typeof items, ' +
      (context.ownerLanguagesImport ? 'Languages' : '[' + JSON.stringify(context.languages.document) + ']') +
      '>({ children: ' +
      JSON.stringify(source.children) +
      ', ...items });',
    '',
  ].join('\n');
  files.push({ path: context.directory + '/index.ts', content: sourceText, kind: 'typescript' });
  const seen = new Set<string>();
  for (const file of files) {
    safePath(file.path);
    if (seen.has(file.path)) fail(file.path, 'duplicate output path');
    if (context.existingPaths?.has(file.path)) fail(file.path, 'existing authored source; create-only/no clobber');
    seen.add(file.path);
  }
  return { exportName: context.role, files: files.sort((a, b) => a.path.localeCompare(b.path, 'en')), diagnostics };
}
