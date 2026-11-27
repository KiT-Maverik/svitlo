/**
 * Create-only staged MatchBlocks source emission.
 * This is NOT a Props publisher or a YAML/Configurator adapter.
 * Child blocks belong to their concrete materializers (Agents C/D).
 */
import type { Question_MatchBlocks_Config } from '../../../configurators/questions/defineMatchBlocks/defineMatchBlocks.schemas';
import type { LanguageCode, SupportedLanguages } from '../../../schemas/languages.schemas';
import { renderBlockerTodo } from '../renderBlockerTodo.mjs';
import { createSourceIdentifierRegistry } from '../sourceIdentifiers.mjs';

type PlainBlock = { id: string; slug: string; type: string } & Record<string, unknown>;
type BlockNode = PlainBlock | { config: PlainBlock; production?: Record<string, unknown> };
type BlockCollection = { children: string[] } & Record<string, unknown>;
type Content = Omit<Question_MatchBlocks_Config['content'], 'question' | 'hint' | 'explanation' | 'pairs'> & {
  question: BlockCollection;
  hint?: BlockCollection;
  explanation?: BlockCollection;
  pairs: { items: Record<string, { left: BlockNode; right: BlockNode }>; order: string[] };
};
export type MatchBlocksSource = Omit<Question_MatchBlocks_Config, 'content'> & { content: Content };
export type MatchBlocksNode = { config: MatchBlocksSource; production?: { pending?: boolean; specification?: string } };
type OutputFile = { path: string; content: string; kind: 'typescript' | 'markdown' | 'code' };
type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
type ChildOutput = { exportName: string; files: OutputFile[]; diagnostics?: Diagnostic[] };
export type MatchBlocksContext = {
  /** Question-kind bank folder, e.g. questions/selectOneAnswer. */
  directory: string;
  /** Same production-only language plan structure as CourseWorkflowStage1Languages. */
  languages: { document: LanguageCode; planned: SupportedLanguages };
  /** Bank-only: bind the owning Lesson's Languages type rather than a copied tuple. */
  ownerLanguagesImport?: string;
  /** The parent binds the matching concrete ContentBlock renderer. */
  materializeBlock: (
    node: { config: PlainBlock; production?: Record<string, unknown> },
    context: {
      directory: string;
      documentLanguage: string;
    },
  ) => ChildOutput;
  /** A parent preflight may pass all known authored destinations to refuse clobbering. */
  existingPaths?: ReadonlySet<string>;
};
const validSlug = /^[a-z][A-Za-z0-9]*$/;
const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
const reservedNames = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  'let',
  'static',
  'implements',
  'interface',
  'private',
  'protected',
  'public',
  'package',
]);
const validUUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const validLocale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const allowedBlocks = new Set([
  'text',
  'markdown',
  'code',
  'image',
  'video',
  'youtube',
  'audio',
  'subtitles',
  'scene',
  'carousel',
  'checkpoint',
]);
const collectionPaths = new Set(['content.question', 'content.hint', 'content.explanation', 'content.pairs']);
const childPatterns = [
  'content.question.*',
  'content.hint.*',
  'content.explanation.*',
  'content.pairs.*.left',
  'content.pairs.*.right',
];
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function fail(location: string, reason: string): never {
  throw new Error('matchBlocks ' + location + ': ' + reason);
}
function safeSlug(value: unknown, location: string): string {
  if (typeof value !== 'string' || !validSlug.test(value) || ['constructor', 'prototype', '__proto__'].includes(value))
    fail(location, 'invalid or unsafe slug');
  return value;
}
function checkPath(value: string): void {
  if (
    !value ||
    value.startsWith('/') ||
    value
      .split('/')
      .some(part => !part || part === '.' || part === '..' || !/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9]+)?$/.test(part))
  )
    fail(value, 'unsafe destination path');
}
function assertCollection(value: unknown, location: string): asserts value is { children: string[] } & Record<string, unknown> {
  if (!isRecord(value) || !Array.isArray(value.children) ||
      Object.hasOwn(value, 'items') || Object.hasOwn(value, 'order'))
    fail(location, 'expected direct child keys and children order');
  const order = value.children;
  const keys = Object.keys(value).filter(key => key !== 'children');
  if (keys.length !== order.length || new Set(order).size !== keys.length ||
      order.some(key => typeof key !== 'string' || !Object.hasOwn(value, key)))
    fail(location + '.children', 'children must include every child once');
  for (const key of keys) safeSlug(key, location + '.' + key);
}
/** Prune only true locale-code dictionaries, not ordinary maps (e.g. accepted answers). */
function sourceLocale(value: unknown, language: string, location: string): unknown {
  if (Array.isArray(value))
    return value.map((item, index) => sourceLocale(item, language, location + '[' + index + ']'));
  if (!isRecord(value)) return value;
  const keys = Object.keys(value);
  if (keys.length && keys.every(key => validLocale.test(key))) {
    if (!Object.hasOwn(value, language)) fail(location, 'reviewed source-language value missing: ' + language);
    return { [language]: sourceLocale(value[language], language, location + '.' + language) };
  }
  return Object.fromEntries(keys.map(key => [key, sourceLocale(value[key], language, location + '.' + key)]));
}
export function materializeMatchBlocks(node: MatchBlocksNode, context: MatchBlocksContext): ChildOutput {
  const config = node.config;
  if (!isRecord(config) || config.type !== 'matchBlocks') fail('config.type', 'incorrect kind');
  const name = safeSlug(config.slug, 'config.slug');
  const exportedName = reservedNames.has(name) ? 'config_' + name : name;
  if (
    typeof config.id !== 'string' ||
    !validUUID.test(config.id) ||
    config.id === '00000000-0000-0000-0000-000000000000'
  )
    fail('config.id', 'immutable non-Nil Question UUID required');
  if (!context.languages || !validLocale.test(context.languages.document))
    fail('languages.document', 'valid source locale required');
  if (!isRecord(config.params) || !isRecord(config.content)) fail('config', 'params/content required');
  assertCollection(config.content.question, 'content.question');
  if (!config.content.question.children.length) fail('content.question', 'reviewed prompt required');
  if (config.content.hint !== undefined) assertCollection(config.content.hint, 'content.hint');
  if (config.content.explanation !== undefined) assertCollection(config.content.explanation, 'content.explanation');
  assertCollection(config.content.pairs, 'content.pairs');
  if (!config.content.pairs.children.length) fail('content.pairs', 'at least one pair required');
  for (const key of config.content.pairs.children) {
    const pair = config.content.pairs[key];
    if (!isRecord(pair) || !pair.left || !pair.right)
      fail('content.pairs.items.' + key, 'both left and right blocks required');
  }
  const planned = context.languages.planned;
  if (
    !Array.isArray(planned) ||
    planned.length === 0 ||
    new Set(planned).size !== planned.length ||
    planned.some(code => !validLocale.test(code))
  )
    fail('languages.planned', 'nonempty unique supported languages required');
  if (!planned.includes(context.languages.document)) fail('languages.planned', 'source language must be included');
  checkPath(context.directory);
  const modulePath = context.directory + '/' + name + '.ts';
  const files: OutputFile[] = [];
  const diagnostics: Diagnostic[] = [];
  const imports: string[] = [];
  const claim = createSourceIdentifierRegistry('matchBlocks', [
    'defineMatchBlocks',
    'Languages',
    'content',
    exportedName,
  ]);
  const blockers: string[] = [];
  if (node.production?.pending === true)
    blockers.push('Independent Question Bank review and content completion required.');
  const remaining = planned.filter(code => code !== context.languages.document);
  if (remaining.length && !context.ownerLanguagesImport)
    blockers.push('Restore independently reviewed translations for ' + remaining.join(', ') + '.');
  const matches = (pattern: string, parts: string[]) => {
    const tokens = pattern.split('.');
    return tokens.length === parts.length && tokens.every((token, index) => token === '*' || token === parts[index]);
  };
  const render = (value: unknown, parts: string[], depth = 0): string => {
    const location = parts.join('.');
    if (childPatterns.some(pattern => matches(pattern, parts))) {
      if (!isRecord(value)) fail(location, 'nested ContentBlock Config required');
      const child = isRecord(value.config) ? value.config : value;
      if (!isRecord(child) || typeof child.type !== 'string' || !allowedBlocks.has(child.type))
        fail(location, 'unrecognized ContentBlock kind');
      if (typeof child.id !== 'string' || !validUUID.test(child.id))
        fail(location + '.id', 'existing child UUID required');
      safeSlug(child.slug, location + '.slug');
      if (parts[1] !== 'pairs' && child.slug !== parts.at(-1))
        fail(location + '.slug', 'child slug must match collection key');
      // Preserve the pair's identity and left/right roles without source-only items wrappers.
      const childPath = parts.slice(1).join('/');
      const childDir = context.directory + '/' + name + '/' + childPath;
      checkPath(childDir);
      const out = context.materializeBlock(
        { config: child as PlainBlock, ...(isRecord(value.production) ? { production: value.production } : {}) },
        { directory: childDir, documentLanguage: context.languages.document },
      );
      if (!out || !validIdentifier.test(out.exportName) || !Array.isArray(out.files))
        fail(location, 'invalid child materializer result');
      for (const file of out.files) {
        if (!file.path.startsWith(childDir + '/'))
          fail(location, 'delegated ContentBlock escaped its assigned directory');
      }
      if (!out.files.some(file => file.path === childDir + '/index.ts' && file.kind === 'typescript'))
        fail(location, 'missing delegated ContentBlock index.ts');
      const childName = claim(out.exportName, location);
      imports.push('import { ' + out.exportName + ' } from ' + JSON.stringify('./' + name + '/' + childPath) + ';');
      files.push(...out.files);
      diagnostics.push(...(out.diagnostics ?? []));
      return childName;
    }
    if (collectionPaths.has(location)) assertCollection(value, location);
    if (location === 'locale' || false) value = sourceLocale(value, context.languages.document, location);
    if (typeof value === 'number' && !Number.isFinite(value)) fail(location, 'nonfinite numeric value');
    if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
      return JSON.stringify(value);
    if (Array.isArray(value))
      return '[' + value.map((item, index) => render(item, [...parts, String(index)], depth + 1)).join(', ') + ']';
    if (!isRecord(value)) fail(location, 'unsupported opaque source expression; preserve through parent');
    const entries = Object.entries(value).map(([key, item]) => {
      const path = [...parts, key];
      const rendered = render(item, path, depth + 1);
      const keySource = validIdentifier.test(key) && key !== '__proto__' ? key : JSON.stringify(key);
      const isChild = childPatterns.some(pattern => matches(pattern, path));
      return '  '.repeat(depth + 1) + (isChild && rendered === key ? keySource : keySource + ': ' + rendered);
    });
    return entries.length ? '{\n' + entries.join(',\n') + '\n' + '  '.repeat(depth) + '}' : '{}';
  };
  const nested = 'const content = ' + render(config.content, ['content']) + ';\n\n';
  const metadata = Object.entries(config)
    .filter(([key]) => key !== 'content')
    .map(([key, item]) => '  ' + key + ': ' + render(item, [key], 1) + ',')
    .join('\n');
  files.push({
    path: modulePath,
    kind: 'typescript',
    content: [
      "import { defineMatchBlocks } from '@svitlo/engine/build';",
      ...(context.ownerLanguagesImport
        ? ['import type { Languages } from ' + JSON.stringify(context.ownerLanguagesImport) + ';']
        : []),
      ...imports.sort(),
      '',
      ...blockers.map(renderBlockerTodo),
      nested +
        'export const ' +
        exportedName +
        ' = defineMatchBlocks<' +
        JSON.stringify(name) +
        ', typeof content, ' +
        (context.ownerLanguagesImport ? 'Languages' : '[' + JSON.stringify(context.languages.document) + ']') +
        '>({\n' +
        metadata +
        '\n  content,\n});\n',
    ].join('\n'),
  });
  if (node.production?.specification)
    files.push({
      path: context.directory + '/' + name + '/specification.md',
      content: node.production.specification.trimEnd() + '\n',
      kind: 'markdown',
    });
  const seen = new Set<string>();
  for (const file of files) {
    checkPath(file.path);
    if (seen.has(file.path)) fail(file.path, 'duplicate emitted destination');
    if (context.existingPaths?.has(file.path)) fail(file.path, 'existing authored file; create-only/no clobber');
    seen.add(file.path);
  }
  return { exportName: exportedName, files: files.sort((a, b) => a.path.localeCompare(b.path, 'en')), diagnostics };
}
