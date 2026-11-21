/**
 * @fileoverview Shared, create-only Config YAML → modular TypeScript materializer.
 *
 * Input is a reviewed { config, production? } tree. The caller owns YAML
 * parsing, Engine Zod validation, review authorization and publication. This
 * module never derives an entity from narrative text or resolves a Lesson by
 * guessing an import path. Only the child boundaries defined by the current
 * Engine YAML Config projections are traversed.
 *
 * Unlike the legacy Course/Lesson renderers, every type uses this one emitter.
 * Wrappers may consume materialize().files and writeMaterialized() independently.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

import { loadFactoryRegistry, sourceAuthoringCopy } from './yamlScaffolding.mjs';

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const identifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const slugPattern = /^[a-zA-Z][a-zA-Z0-9]*$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const localePattern = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const nilUuid = '00000000-0000-0000-0000-000000000000';
const authoredExpression = Symbol('file-backed generated expression');
const readExpression = code => ({ [authoredExpression]: code });
const mediaExtensions = { image: 'webp', audio: 'mp3', video: 'mp4', subtitles: 'vtt' };
const codeExtensions = {
  typescript: 'ts', ts: 'ts', tsx: 'tsx', javascript: 'js', js: 'js',
  jsx: 'jsx', python: 'py', py: 'py', html: 'html', css: 'css',
  scss: 'scss', json: 'json', yaml: 'yaml', yml: 'yml', bash: 'sh',
  shell: 'sh', sh: 'sh', sql: 'sql', java: 'java', kotlin: 'kt',
  swift: 'swift', rust: 'rs', go: 'go', c: 'c', cpp: 'cpp',
  csharp: 'cs', cs: 'cs', php: 'php', ruby: 'rb', rb: 'rb',
  dart: 'dart', xml: 'xml', markdown: 'md', md: 'md',
};

const blocks = 'text code image video youtube carousel scene checkpoint markdown audio subtitles'.split(' ');
const sections = 'content practice codingTask learningFlow flashcards quiz quest'.split(' ');
const questions = 'selectOneAnswer selectMultipleAnswers matchBlocks answerWithText answerWithNumber orderSequence buildAnswerWithBlocks fillBlanksWithBlocks fillBlanksWithText'.split(' ');
const answerBlocks = blocks.filter(type => type !== 'checkpoint');
const rule = (pattern, allowed) => ({ pattern: pattern.split('.'), allowed: new Set(allowed) });

/**
 * Exact Config child paths projected by yamlLessonCourse, yamlSection,
 * yamlContentBlock and yamlQuestion schemas. '*' is one slugged map key.
 * Normal arbitrary objects with a "type" property are always plain data.
 */
const boundaries = {
  course: [rule('content.items.*', ['module', 'chapter', 'episode', 'lessonReference'])],
  module: [rule('content.items.*', ['chapter', 'episode', 'lessonReference'])],
  chapter: [rule('content.items.*', ['episode', 'lessonReference'])],
  lesson: [rule('section.items.*', sections)],
  episode: [rule('section.items.*', sections)],
  quest: [rule('stages.*', ['questStage']), rule('tasks.*', ['questTask'])],
  questStage: [
    rule('content.video.medium', ['video']), rule('content.video.small', ['video']),
    ...['dialogue', 'narration', 'background'].map(key => rule('content.audio.' + key, ['audio'])),
    rule('content.image', ['image']), rule('content.subtitles', ['subtitles']),
  ],
  questTask: [rule('scene', ['scene'])],
  carousel: [rule('slides.items.*', ['image', 'scene'])],
  checkpoint: [rule('content.items.*', ['checkpointItem'])],
  checkpointItem: [rule('question', ['text']), rule('answer', ['checkpointAnswer'])],
  checkpointAnswer: [rule('content.items.*', answerBlocks)],
  flashcard: [
    rule('content.front.items.*', blocks),
    rule('content.back.items.*', blocks),
    rule('content.hint.items.*', blocks),
  ],
};
for (const type of sections.filter(type => type !== 'quest')) {
  boundaries[type] = [rule('content.items.*', blocks)];
}
for (const type of questions) {
  boundaries[type] = [
    ...['question', 'hint', 'explanation', 'correctSequence', 'distractors', 'sequence']
      .map(field => rule('content.' + field + '.items.*', blocks)),
    ...['correct', 'incorrect', 'distractors']
      .map(field => rule('content.answers.' + field + '.items.*', blocks)),
    rule('content.pairs.items.*.left', blocks),
    rule('content.pairs.items.*.right', blocks),
    rule('content.slots.items.*.correctAnswer', blocks),
  ];
}

const orderedPaths = {
  course: ['content'], module: ['content'], chapter: ['content'],
  lesson: ['section'], episode: ['section'],
  carousel: ['slides'], checkpoint: ['content'], checkpointAnswer: ['content'],
  flashcard: ['content.front', 'content.back', 'content.hint'],
};
for (const type of sections.filter(type => type !== 'quest')) orderedPaths[type] = ['content'];
for (const type of questions) {
  orderedPaths[type] = [
    ...['question', 'hint', 'explanation', 'correctSequence', 'distractors', 'sequence']
      .map(field => 'content.' + field),
    ...['correct', 'incorrect', 'distractors'].map(field => 'content.answers.' + field),
    'content.pairs', 'content.slots',
  ];
}

const childFields = {
  course: ['content'], module: ['content'], chapter: ['content'],
  lesson: ['section'], episode: ['section'], quest: ['stages', 'tasks'],
  questStage: ['content'], questTask: ['scene'], carousel: ['slides'],
  checkpoint: ['content'], checkpointItem: ['question', 'answer'],
  checkpointAnswer: ['content'], flashcard: ['content', 'parameters'],
};
for (const type of sections.filter(type => type !== 'quest')) childFields[type] = ['content'];
for (const type of questions) childFields[type] = ['content'];

const asKey = name => identifier.test(name) && name !== '__proto__' ? name : JSON.stringify(name);
const isSafePart = part => slugPattern.test(part) && part !== '__proto__' && part !== 'constructor';
const reservedWords = new Set(['await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static']);
const exportName = slug => identifier.test(slug) && !reservedWords.has(slug) && slug !== 'languages' && slug !== 'content' && slug !== 'section' ? slug : 'config_' + slug;
const relative = (from, to) => {
  const result = path.posix.relative(from || '.', to || '.');
  return result.startsWith('.') ? result : './' + result;
};
const matches = (pattern, actual) =>
  pattern.length === actual.length && pattern.every((part, index) => part === '*' || part === actual[index]);

export class MaterializeDiagnostic extends Error {
  constructor(location, message) {
    super(location + ': ' + message);
    this.name = 'MaterializeDiagnostic';
    this.location = location;
  }
}
function fail(location, message) {
  throw new MaterializeDiagnostic(location, message);
}

function assertCollection(value, location) {
  if (!isRecord(value.items) || !Array.isArray(value.order)) fail(location, 'expected { items, order }');
  const keys = Object.keys(value.items);
  const order = value.order;
  if (order.length !== keys.length || new Set(order).size !== order.length ||
      order.some(key => typeof key !== 'string' || !Object.hasOwn(value.items, key))) {
    fail(location + '.order', 'order must include each items key exactly once');
  }
}

function safeOutput(relativePath) {
  if (!relativePath || relativePath.startsWith('/') ||
      relativePath.split('/').some(part => part === '.' || part === '..' || !part)) {
    throw new Error('Unsafe generated path: ' + relativePath);
  }
  return relativePath;
}

function checkNoSymlinks(filename) {
  const absolute = path.resolve(filename);
  let current = path.parse(absolute).root;
  for (const part of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Refusing symlink path: ' + current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}

/**
 * @param {{config: object, production?: object}} document
 * @param {{
 *   documentLanguage?: string,
 *   registry?: Record<string,string>,
 *   resolveLessonReference?: (reference: object) => ({module:string, exportName:string}|null),
 *   isPending?: (config: object, production: object|undefined) => boolean
 * }} context
 * @returns {{rootExport:string, rootType:string,
 *   files: {path:string,content:string,kind:string}[],
 *   diagnostics: {path:string,code:string,message:string,severity:string}[]}}
 */
export function materialize(document, context = {}) {
  if (!isRecord(document) || !isRecord(document.config)) fail('$', 'expected { config, production? }');
  for (const key of Object.keys(document)) {
    if (key !== 'config' && key !== 'production') fail('$.' + key, 'unexpected root authoring field');
  }
  const registry = context.registry ?? loadFactoryRegistry();
  const language = context.documentLanguage ?? document.production?.documentLanguage;
  if (typeof language !== 'string' || !localePattern.test(language))
    fail('$.production.documentLanguage', 'valid source language is required');
  const files = new Map();
  const diagnostics = [];
  const identities = new Map();
  const factories = new Set(Object.keys(registry));
  const rootType = document.config.type;
  if (!factories.has(rootType)) fail('$.config.type', 'unknown root Config type ' + JSON.stringify(rootType));

  function addFile(file, content, kind = 'typescript') {
    safeOutput(file);
    if (files.has(file)) fail(file, 'duplicate generated destination');
    files.set(file, { path: file, content, kind });
  }
  function warn(location, code, message) {
    diagnostics.push({ path: location, code, message, severity: 'warning' });
  }
  function ensurePart(value, location) {
    if (typeof value !== 'string' || !isSafePart(value)) fail(location, 'unsafe or missing camelCase key');
    return value;
  }
  function serialize(value, owner, parts, directory, imports, depth = 0) {
    const location = owner.location + '.config.' + parts.join('.');
    const edge = (boundaries[owner.type] ?? []).find(entry => matches(entry.pattern, parts));
    if (edge) {
      if (value === null && owner.type === 'questStage' && parts[1] === 'audio') return 'null';
      if (!isRecord(value)) fail(location, 'expected nested {config, production?} node');
      const child = isRecord(value.config) ? value.config : null;
      if (!child) fail(location, 'expected nested Config envelope');
      if (!edge.allowed.has(child.type)) fail(location + '.type', 'disallowed child type ' + JSON.stringify(child.type));
      const key = parts.at(-1);
      const pathParts = parts.map(part => ensurePart(part, location));
      if (edge.pattern.at(-1) === '*' && child.type !== 'lessonReference' &&
          child.slug !== key) fail(location + '.slug', 'child slug must match the collection key');
      const childDirectory = path.posix.join(directory, ...pathParts);
      const childExport = emitNode(value, childDirectory, location, key);
      const importAlias = 'child_' + parts.join('_');
      if (!identifier.test(importAlias)) fail(location, 'invalid import alias');
      const specifier = relative(directory, childDirectory);
      imports.set(importAlias, 'import { ' + childExport + ' as ' + importAlias + ' } from ' + JSON.stringify(specifier) + ';');
      return importAlias;
    }
    if (Array.isArray(value)) return '[' + value.map(item => serialize(item, owner, parts, directory, imports, depth + 1)).join(', ') + ']';
    if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
      return JSON.stringify(value);
    if (!isRecord(value)) fail(location, 'unsupported non-serializable value');
    if ((orderedPaths[owner.type] ?? []).includes(parts.join('.'))) assertCollection(value, location);
    const entries = Object.entries(value).map(([key, child]) => {
      const result = serialize(child, owner, [...parts, key], directory, imports, depth + 1);
      return '  '.repeat(depth + 1) + asKey(key) + ': ' + result;
    });
    return entries.length ? '{\n' + entries.join(',\n') + '\n' + '  '.repeat(depth) + '}' : '{}';
  }
  function emitNode(envelope, directory, location, placement) {
    if (!isRecord(envelope) || !isRecord(envelope.config)) fail(location, 'expected { config, production? }');
    for (const key of Object.keys(envelope)) {
      if (key !== 'config' && key !== 'production') fail(location + '.' + key, 'unexpected nested authoring field');
    }
    if (envelope.production !== undefined && !isRecord(envelope.production))
      fail(location + '.production', 'production must be a mapping');
    const production = envelope.production;
    const authored = envelope.config;
    const type = authored.type;
    if (!factories.has(type) && type !== 'lessonReference') fail(location + '.config.type', 'unknown Engine type ' + JSON.stringify(type));
    if (type === 'lessonReference' && directory === '') fail(location, 'lessonReference cannot be a root');
    const slug = ensurePart(authored.slug ?? (type === 'lessonReference' ? placement : undefined), location + '.config.slug');
    const id = type === 'lessonReference' ? authored.lessonId : authored.id;
    if (typeof id !== 'string' || !uuidPattern.test(id)) fail(location + '.config.' + (type === 'lessonReference' ? 'lessonId' : 'id'), 'immutable UUID is required');
    if (type !== 'lessonReference') {
      if (identities.has(id)) fail(location + '.config.id', 'Configurator UUID reused at ' + identities.get(id));
      identities.set(id, location);
    }
    const named = exportName(slug);
    const imports = new Map();
    const todos = [];
    const fields = [];
    let body;
    const pending = (type === 'quiz' || type === 'flashcards') &&
      (context.isPending?.(authored, production) === true || !isRecord(authored.params) || !isRecord(authored.content));

    if (type === 'lessonReference') {
      const resolved = context.resolveLessonReference?.(authored) ?? null;
      if (resolved) {
        if (!isRecord(resolved) || typeof resolved.module !== 'string' ||
            !/^(?:\.\/|\.\.\/|#|@)/.test(resolved.module) ||
            typeof resolved.exportName !== 'string' || !identifier.test(resolved.exportName)) {
          fail(location, 'resolver returned an unsafe or invalid Lesson import');
        }
        body = 'export { ' + resolved.exportName + ' as ' + named + ' } from ' + JSON.stringify(resolved.module) + ';\n';
      } else {
        warn(location, 'pending-lesson', 'Standalone Lesson import not verified; requires Agent B pending helper');
        body = "import { definePendingLesson } from '@svitlo/engine/build';\n\n" +
          '// TODO (BLOCKER): Resolve the reviewed standalone Lesson UUID before publication.\n' +
          'export const ' + named + ' = definePendingLesson({ id: ' + JSON.stringify(id) +
          ', slug: ' + JSON.stringify(slug) + ' });\n';
      }
    } else if (pending) {
      const factory = type === 'quiz' ? 'definePendingQuizSection' : 'definePendingFlashcardsSection';
      warn(location, 'pending-assessment', 'Incomplete assessment; independent bank integration required');
      body = 'import { ' + factory + " } from '@svitlo/engine/build';\n\n" +
        '// TODO (BLOCKER): Replace this pending assessment with reviewed Section content.\n' +
        'export const ' + named + ' = ' + factory + '({ id: ' + JSON.stringify(id) +
        ', slug: ' + JSON.stringify(slug) + ' });\n';
    } else {
      if (type === 'scene' && context.isPending?.(authored, production) === true) {
        todos.push('// TODO (BLOCKER): Complete and register this Scene; Draft Preview uses Agent F\'s SceneStub.');
        warn(location, 'pending-scene', 'Scene implementation and UUID registration remain pending');
      }
      const config = sourceAuthoringCopy(authored, language);
      if (isRecord(config.params) && Array.isArray(config.params.languages)) {
        if (!config.params.languages.includes(language)) fail(location + '.config.params.languages', 'source language is not supported');
        if (config.params.languages.length > 1) todos.push('// TODO (BLOCKER): Restore reviewed languages: ' + JSON.stringify(config.params.languages));
      }
      if (Object.hasOwn(mediaExtensions, type)) {
        if (!isRecord(config.locale)) fail(location + '.config.locale', 'media locale is required');
        const needed = type === 'video' ? ['fileName', 'posterFileName'] : ['fileName'];
        for (const key of needed) {
          if (config.locale[key] === undefined || config.locale[key] === null) {
            config.locale[key] = nilUuid + '.' + (key === 'posterFileName' ? 'webp' : mediaExtensions[type]);
            todos.push('// TODO (BLOCKER): Supply verified ' + key + ' asset for ' + type + ' ' + id + '; reserved Nil UUID is not an asset.');
            warn(location, 'pending-media', 'Missing verified ' + key + ' media asset');
          }
        }
      }
      const textFile = type === 'markdown' && isRecord(config.locale) ? config.locale.value : undefined;
      if (textFile !== undefined) {
        if (typeof textFile === 'string') {
          if (!textFile.trim()) fail(location + '.config.locale.value', 'empty Markdown');
          addFile(path.posix.join(directory, 'markdown.md'), textFile, 'markdown');
          config.locale.value = readExpression('readMarkdown(import.meta.url)');
        } else if (isRecord(textFile)) {
          if (Object.keys(textFile).length !== 1 || typeof textFile[language] !== 'string' || !textFile[language].trim())
            fail(location + '.config.locale.value', 'source-language Markdown is required');
          addFile(path.posix.join(directory, language + '.md'), textFile[language], 'markdown');
          config.locale.value = readExpression('readMarkdown(import.meta.url, ' + JSON.stringify([language]) + ')');
        } else fail(location + '.config.locale.value', 'invalid Markdown value');
        imports.set('buildReader', "import { readMarkdown } from '@svitlo/engine/build';");
      }
      if (type === 'code' && isRecord(config.params) && config.params.codeAsText !== undefined) {
        const code = config.params.codeAsText;
        const extension = codeExtensions[String(config.params.language).toLowerCase()];
        if (typeof code !== 'string' || !code.trim() || !extension) fail(location + '.config.params.codeAsText', 'valid nonempty Code and supported language required');
        addFile(path.posix.join(directory, 'code.' + extension), code, 'code');
        config.params.codeAsText = readExpression('readCodeSource(import.meta.url, ' + JSON.stringify(extension) + ')');
        imports.set('buildReader', "import { readCodeSource } from '@svitlo/engine/build';");
      }
      // Traverse only declared Config child boundaries. Reader expressions remain opaque.
      function renderField(value, parts, level = 0) {
        if (isRecord(value) && Object.hasOwn(value, authoredExpression))
          return value[authoredExpression];
        if (Array.isArray(value)) return '[' + value.map(item => renderField(item, parts, level + 1)).join(', ') + ']';
        const edge = (boundaries[type] ?? []).find(entry => matches(entry.pattern, parts));
        if (edge) return serialize(value, { type, location }, parts, directory, imports, level);
        if (!isRecord(value)) return serialize(value, { type, location }, parts, directory, imports, level);
        if ((orderedPaths[type] ?? []).includes(parts.join('.'))) assertCollection(value, location + '.config.' + parts.join('.'));
        const entries = Object.entries(value).map(([key, child]) =>
          '  '.repeat(level + 1) + asKey(key) + ': ' + renderField(child, [...parts, key], level + 1));
        return entries.length ? '{\n' + entries.join(',\n') + '\n' + '  '.repeat(level) + '}' : '{}';
      }
      const bound = new Map();
      for (const field of childFields[type] ?? []) {
        if (!Object.hasOwn(config, field)) continue;
        if (type === 'flashcard' && field === 'content') {
          const content = config.content;
          if (!isRecord(content) || !isRecord(content.front) || !isRecord(content.back))
            fail(location + '.config.content', 'Flashcard requires front and back');
          if (!isRecord(config.parameters) || !Array.isArray(config.parameters.flags))
            fail(location + '.config.parameters.flags', 'Flashcard flags array is required');
          for (const side of ['front', 'back', 'hint']) {
            if (content[side] === undefined) continue;
            const sideItems = renderField(content[side].items, ['content', side, 'items']);
            const sideOrder = renderField(content[side].order, ['content', side, 'order']);
            fields.push('const ' + side + 'Items = ' + sideItems + ';');
            fields.push('const ' + side + ' = defineFlashcardSide<typeof ' + side + 'Items, typeof languages>({ items: ' +
              side + 'Items, order: ' + sideOrder + ' });');
          }
          imports.set('sideFactory', "import { defineFlashcardSide } from '@svitlo/engine/build';");
          fields.push('const content = { ' + ['front', 'back', 'hint'].filter(side => content[side] !== undefined).join(', ') + ' };');
        } else {
          fields.push('const ' + field + ' = ' + renderField(config[field], [field]) + ';');
        }
        bound.set(field, true);
      }
      const props = Object.entries(config).map(([field, value]) => {
        if (bound.has(field)) return '  ' + field + ',';
        if (field === 'params' && isRecord(value) && Array.isArray(value.languages)) {
          const rest = Object.entries(value).map(([k, v]) =>
            '    ' + asKey(k) + ': ' + (k === 'languages' ? 'languages' : renderField(v, ['params', k])) + ',');
          return '  params: {\n' + rest.join('\n') + '\n  },';
        }
        return '  ' + asKey(field) + ': ' + renderField(value, [field]) + ',';
      });
      const slugType = JSON.stringify(slug);
      const langType = 'typeof languages';
      const collection = key => bound.has(key) ? 'typeof ' + key + '.items' : '{}';
      let generic;
      if (type === 'lesson' || type === 'episode') generic = [slugType, langType, collection('section')];
      else if (['course', 'module', 'chapter'].includes(type)) generic = [slugType, collection('content'), langType];
      else if (type === 'quest') generic = [slugType, 'typeof stages', 'typeof tasks', langType];
      else if (['checkpointItem'].includes(type)) generic = [slugType, 'typeof answer', 'typeof question', langType];
      else if (type === 'flashcard') generic = [slugType,
        'typeof content.front.items', 'typeof content.back.items',
        config.content.hint ? 'typeof content.hint.items' : '{}',
        'typeof ' + (config.parameters?.flags ? 'parameters.flags' : 'content.front.items') ,
        config.parameters?.relationships ? 'typeof parameters.relationships.items' : '{}', langType];
      else if ([...sections.filter(value => value !== 'quest'), 'carousel', 'checkpoint', 'checkpointAnswer'].includes(type))
        generic = [slugType, collection(type === 'carousel' ? 'slides' : 'content'), langType];
      else if (questions.includes(type)) generic = [slugType, 'typeof content', langType];
      else generic = [slugType, langType];
      // Flags remain an authored array; the generic references the real parameters declaration.
      const factory = registry[type];
      imports.set('factory', 'import { ' + factory + " } from '@svitlo/engine/build';");
      imports.set('languages', 'import { languages } from ' + JSON.stringify(relative(directory, 'languages')) + ';');
      body = [...new Set(imports.values())].sort().join('\n') + '\n\n' +
        (todos.length ? todos.join('\n') + '\n' : '') +
        (fields.length ? fields.join('\n\n') + '\n\n' : '') +
        'export const ' + named + ' = ' + factory +
        (generic ? '<' + generic.join(', ') + '>' : '') +
        '({\n' + props.join('\n') + '\n});\n';
    }
    if (production) {
      const details = Object.entries(production).filter(([key]) => key !== 'documentLanguage' && key !== 'pending');
      if (details.length) {
        const spec = details.map(([key, value]) => '# ' + key + '\n\n' +
          (typeof value === 'string' ? value.trimEnd() : JSON.stringify(value, null, 2))).join('\n\n') + '\n';
        addFile(path.posix.join(directory, 'specification.md'), spec, 'specification');
      }
    }
    addFile(path.posix.join(directory, 'index.ts'), body);
    return named;
  }

  const root = document.config;
  if (isRecord(root.params) && Array.isArray(root.params.languages) &&
      !root.params.languages.includes(language)) {
    fail('$.config.params.languages', 'source language not among planned languages');
  }
  const planned = isRecord(root.params) && Array.isArray(root.params.languages) ? root.params.languages : [language];
  if (planned.length > 1) warn('$.config.params.languages', 'pending-locales', 'Only source language will typecheck until translations are reviewed');
  addFile('languages.ts',
    "import type { SupportedLanguages } from '@svitlo/engine/build';\n\n" +
    (planned.length > 1 ? '// TODO (BLOCKER): Restore languages after review: ' + JSON.stringify(planned) + '\n' : '') +
    'export const languages = ' + JSON.stringify([language]) + ' as const satisfies SupportedLanguages;\n');
  const rootExport = emitNode(document, '', '$');
  // TypeScript syntax is an absolute precondition; deeper typechecking must use
  // the owning Engine declarations (or the explicit fixture declarations).
  for (const file of files.values()) {
    if (file.kind !== 'typescript') continue;
    const ast = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    if (ast.parseDiagnostics.length) fail(file.path, 'emitted invalid TypeScript syntax: ' + ast.parseDiagnostics[0].messageText);
  }
  return {
    rootExport,
    rootType,
    files: [...files.values()].sort((a, b) =>
      a.path === 'index.ts' ? 1 : b.path === 'index.ts' ? -1 : a.path.localeCompare(b.path)),
    diagnostics,
  };
}

/**
 * Apply a complete generated manifest, preserving every pre-existing human
 * source and specification. A present root index.ts owns the whole entity:
 * generate is a no-op and check compares all generated files.
 *
 * Preflight runs before the first write; a partial existing tree with changed
 * files is refused rather than mixing incompatible revisions.
 */
export function writeMaterialized(files, directory, mode = 'check') {
  if (!['check', 'generate'].includes(mode)) throw new Error('Expected check or generate mode');
  const root = path.resolve(directory);
  const seen = new Set();
  for (const item of files) {
    if (!isRecord(item) || typeof item.content !== 'string' || typeof item.path !== 'string')
      throw new Error('Invalid generated file manifest');
    const relativePath = safeOutput(item.path);
    if (seen.has(relativePath)) throw new Error('Duplicate generated path: ' + relativePath);
    seen.add(relativePath);
    checkNoSymlinks(path.join(root, ...relativePath.split('/')));
  }
  if (mode === 'generate' && fs.existsSync(root) &&
      (fs.existsSync(path.join(root, 'index.ts')) ||
        fs.readdirSync(root).some(filename => filename.endsWith('.data.ts'))))
    return { changed: 0, skipped: true };
  for (const item of files) {
    const dest = path.join(root, ...item.path.split('/'));
    if (fs.existsSync(dest)) {
      if (!fs.statSync(dest).isFile() || fs.readFileSync(dest, 'utf8') !== item.content)
        throw new Error('Existing authored file differs; refusing to overwrite: ' + dest);
    } else if (mode === 'check') throw new Error('Missing generated file: ' + dest);
  }
  let changed = 0;
  if (mode === 'generate') {
    for (const item of files) {
      const dest = path.join(root, ...item.path.split('/'));
      if (fs.existsSync(dest)) continue;
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, item.content, { flag: 'wx' });
      changed++;
    }
  }
  return { changed, skipped: false };
}
