/**
 * Lesson Config → modular, deterministic TypeScript draft sources.
 *
 * This module does not validate/complete Config, publish Props, infer editorial
 * slugs, produce media, or overwrite any existing authored file. Consumers
 * decide the creation-only write policy. All paths returned are relative to
 * the canonical Lesson UUID folder.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { loadFactoryRegistry, sourceAuthoringCopy } from '../yamlScaffolding/yamlScaffolding.mjs';
import { renderReviewDraft } from './reviewTemplate.mjs';

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const safeSlug = /^[a-z][A-Za-z0-9]*$/;
const identifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const factoryContexts = new Set([
  'lesson',
  'section',
  'stage',
  'task',
  'block',
  'slide',
  'checkpointItem',
  'checkpointAnswer',
  'question',
  'flashcard',
]);
const sectionTypes = new Set(['content', 'quiz', 'practice', 'learningFlow', 'codingTask', 'flashcards']);
const compositeTypes = new Set(['carousel', 'checkpoint']);
const localMediaTypes = new Set(['image', 'video', 'audio', 'subtitles']);
const mediaFields = {
  image: ['src'],
  video: ['fileLocation', 'poster'],
  audio: ['fileLocation'],
  subtitles: ['fileLocation'],
};

const reserved = new Set([
  'content',
  'slides',
  'stages',
  'tasks',
  'question',
  'answer',
  'parameters',
  'section',
  'flashcards',
  'questions',
  'languages',
]);

export function childContext(parent, key, owner = {}) {
  const collections = {
    sectionCollection: 'sectionItems',
    flashcardCollection: 'flashcardItems',
    blockCollection: 'blockItems',
    slideCollection: 'slideItems',
    checkpointCollection: 'checkpointItems',
    pairsCollection: 'pairItems',
    slotsCollection: 'slotItems',
  };
  if (collections[parent] && key === 'items') return collections[parent];
  const members = {
    sectionItems: 'section',
    flashcardItems: 'flashcard',
    blockItems: 'block',
    slideItems: 'slide',
    checkpointItems: 'checkpointItem',
    questionGroup: 'question',
    pairItems: 'pair',
    slotItems: 'slot',
  };
  if (members[parent]) return members[parent];
  if (parent === 'questionBank') return 'questionGroup';
  if (parent === 'lesson') {
    if (key === 'section') return 'sectionCollection';
    if (key === 'flashcards') return 'flashcardCollection';
    if (key === 'questions') return 'questionBank';
  }
  if (parent === 'section' && owner.type === 'quest') {
    if (key === 'stages') return 'questStages';
    if (key === 'tasks') return 'questTasks';
  }
  if (parent === 'questStages') return 'stage';
  if (parent === 'questTasks') return 'task';
  if (parent === 'stage' && key === 'content') return 'questStageContent';
  if (parent === 'questStageContent') {
    if (key === 'video') return 'questVideoTracks';
    if (key === 'audio') return 'questAudioTracks';
    if (key === 'image' || key === 'subtitles') return 'block';
  }
  if (parent === 'questVideoTracks') return 'block';
  if (parent === 'questAudioTracks') return 'nullableBlock';
  if (parent === 'task' && key === 'scene') return 'block';
  if (parent === 'section' && key === 'content') return 'blockCollection';
  if (parent === 'block') {
    if (owner.type === 'carousel' && key === 'slides') return 'slideCollection';
    if (owner.type === 'checkpoint' && key === 'content') return 'checkpointCollection';
  }
  if (parent === 'checkpointItem') {
    if (key === 'question') return 'block';
    if (key === 'answer') return 'checkpointAnswer';
  }
  if (parent === 'checkpointAnswer' && key === 'content') return 'blockCollection';
  if (parent === 'question' && key === 'content') return 'questionContent';
  if (parent === 'flashcard' && key === 'content') return 'flashcardContent';
  if (parent === 'flashcardContent' && ['front', 'back', 'hint'].includes(key)) return 'blockCollection';
  if (parent === 'questionContent') {
    if (key === 'answers') return 'questionAnswers';
    if (key === 'pairs') return 'pairsCollection';
    if (key === 'slots') return 'slotsCollection';
    if (['question', 'hint', 'explanation', 'correctSequence', 'distractors', 'sequence'].includes(key))
      return 'blockCollection';
  }
  if (parent === 'questionAnswers' && ['correct', 'incorrect', 'distractors'].includes(key)) return 'blockCollection';
  if (parent === 'pair' && ['left', 'right'].includes(key)) return 'block';
  if (parent === 'slot' && key === 'correctAnswer') return 'block';
  return 'plain';
}

const asProperty = key => (identifier.test(key) ? key : JSON.stringify(key));
// Canonical file extensions for Code's display language. The authored YAML
// keeps the language name; source modules read the adjacent code.<extension>.
const codeExtensions = {
  typescript: 'ts',
  ts: 'ts',
  tsx: 'tsx',
  javascript: 'js',
  js: 'js',
  jsx: 'jsx',
  python: 'py',
  py: 'py',
  html: 'html',
  css: 'css',
  scss: 'scss',
  json: 'json',
  yaml: 'yaml',
  yml: 'yml',
  bash: 'sh',
  shell: 'sh',
  sh: 'sh',
  sql: 'sql',
  java: 'java',
  kotlin: 'kt',
  swift: 'swift',
  rust: 'rs',
  go: 'go',
  c: 'c',
  cpp: 'cpp',
  csharp: 'cs',
  cs: 'cs',
  php: 'php',
  ruby: 'rb',
  rb: 'rb',
  dart: 'dart',
  xml: 'xml',
  markdown: 'md',
  md: 'md',
};
const rawExpression = Symbol('generated TypeScript expression');
const expression = source => ({ [rawExpression]: source });

const indent = level => '  '.repeat(level);
const javascriptKeywords = new Set([
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
]);
// Folder names come from Config slugs AND unvalidated collection keys,
// including Question kinds and pair/slot keys. Check every dynamic segment
// before using posix.join, which would otherwise normalize ../ traversal.
const join = (...parts) => {
  for (const segment of parts.slice(1)) {
    if (segment !== 'index.ts' && !safeSlug.test(segment))
      throw new Error('Unsafe Lesson source path segment: ' + JSON.stringify(segment));
  }
  return path.posix.join(...parts);
};
const relativeImport = (fromDirectory, toDirectory) => {
  const value = path.posix.relative(fromDirectory || '.', toDirectory || '.');
  return value.startsWith('.') ? value : './' + value;
};

function skillIndex(bookRoot) {
  const root = path.join(bookRoot, 'data/skills');
  const found = new Map();
  function visit(directory) {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs
      .readdirSync(directory, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Refusing symlinked Skill path: ' + absolute);
      if (entry.isDirectory()) {
        visit(absolute);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith('.data.ts')) continue;
      const ast = ts.createSourceFile(absolute, fs.readFileSync(absolute, 'utf8'), ts.ScriptTarget.Latest, true);
      if (ast.parseDiagnostics.length) throw new Error('Invalid Skill source: ' + absolute);
      for (const statement of ast.statements) {
        if (
          !ts.isVariableStatement(statement) ||
          !statement.modifiers?.some(x => x.kind === ts.SyntaxKind.ExportKeyword)
        )
          continue;
        for (const declaration of statement.declarationList.declarations) {
          if (
            !ts.isIdentifier(declaration.name) ||
            !declaration.initializer ||
            !ts.isCallExpression(declaration.initializer)
          )
            continue;
          const call = declaration.initializer;
          if (!ts.isIdentifier(call.expression) || call.expression.text !== 'defineSkill' || !call.arguments.length)
            continue;
          const object = call.arguments[0];
          if (!ts.isObjectLiteralExpression(object)) continue;
          const id = object.properties.find(
            prop =>
              ts.isPropertyAssignment(prop) &&
              (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) &&
              prop.name.text === 'id',
          );
          if (!id || !ts.isStringLiteral(id.initializer)) continue;
          const uuid = id.initializer.text;
          if (found.has(uuid)) throw new Error('Duplicate Skill UUID ' + uuid + ' in ' + absolute);
          found.set(uuid, { symbol: declaration.name.text, file: absolute });
        }
      }
    }
  }
  visit(root);
  return found;
}

/**
 * @param {object} lesson - Config-only Lesson object from splitScaffoldDocument
 * @param {string} language - source document language
 * @param {object} options - textbook and UUID destination for Skill import resolution
 * @returns {Map<string,string>} relative path → unwrapped TypeScript source
 */
export function renderLessonModules(lesson, language, options = {}) {
  const factories = options.factories ?? loadFactoryRegistry();
  const filtered = sourceAuthoringCopy(lesson, language);
  if (!record(filtered) || filtered.type !== 'lesson')
    throw new Error('config.yaml:config.type: expected lesson type for the Lesson entrypoint');
  const files = new Map();
  const nodeLocations = options.nodeLocations;

  /**
   * Extract only actually authored learner text. There is no mechanical
   * synthesis from production.specification (which is not lesson copy).
   * Markdown's invariant and localized shapes are mutually exclusive.
   */
  function fileBackedNode(node, context, directory) {
    if (context !== 'block' && context !== 'slide') return node;
    if (localMediaTypes.has(node.type) && record(node.locale)) {
      const locale = { ...node.locale };
      let changed = false;
      for (const field of mediaFields[node.type]) {
        const value = locale[field];
        const role = field === 'poster' ? 'poster' : 'source';
        const buildCall = language =>
          expression(
            'resolveLessonMedia(import.meta.url, ' +
              JSON.stringify(node.type) +
              ', ' +
              JSON.stringify(role) +
              (language === undefined ? '' : ', ' + JSON.stringify(language)) +
              ')',
          );
        if (value === null) {
          locale[field] = buildCall(undefined);
          changed = true;
        } else if (record(value)) {
          const next = { ...value };
          for (const [language, source] of Object.entries(next)) {
            if (source === null) {
              next[language] = buildCall(language);
              changed = true;
            }
          }
          locale[field] = next;
        }
      }
      if (changed) return { ...node, locale };
      return node;
    }
    if (node.type === 'markdown' && record(node.locale) && node.locale.value !== undefined) {
      const source = node.locale.value;
      const authored = { ...node, locale: { ...node.locale } };
      if (typeof source === 'string') {
        if (!source.trim()) throw new Error('Empty authored Markdown source: ' + directory);
        put(path.posix.join(directory, 'text.md'), source);
        authored.files = { moduleUrl: expression('import.meta.url') };
      } else if (record(source)) {
        const languages = Object.keys(source);
        if (languages.length === 0) throw new Error('Empty localized Markdown source: ' + directory);
        for (const language of languages) {
          if (
            !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(language) ||
            typeof source[language] !== 'string' ||
            !source[language].trim()
          )
            throw new Error('Invalid authored Markdown locale ' + JSON.stringify(language) + ': ' + directory);
          put(path.posix.join(directory, 'locale', language + '.md'), source[language]);
        }
        authored.files = { moduleUrl: expression('import.meta.url'), languages };
      } else {
        throw new Error('Invalid authored Markdown value: ' + directory);
      }
      delete authored.locale.value;
      return authored;
    }
    if (node.type === 'code' && record(node.params) && node.params.codeAsText !== undefined) {
      const language = node.params.language;
      const source = node.params.codeAsText;
      if (typeof source !== 'string' || !source.trim())
        throw new Error('Empty or invalid authored Code source: ' + directory);
      const extension = typeof language === 'string' ? codeExtensions[language.toLowerCase()] : undefined;
      if (!extension)
        throw new Error('Unsupported authored Code language ' + JSON.stringify(language) + ': ' + directory);
      put(path.posix.join(directory, 'code.' + extension), source);
      return {
        ...node,
        params: {
          ...node.params,
          codeAsText: expression('readCodeSource(import.meta.url, ' + JSON.stringify(extension) + ')'),
        },
      };
    }
    return node;
  }

  const languageValues = filtered.params?.languages;
  const hasLanguages =
    Array.isArray(languageValues) &&
    languageValues.length > 0 &&
    languageValues.every(value => typeof value === 'string');
  const languagesType = hasLanguages ? 'LessonLanguages' : null;
  if (hasLanguages) {
    files.set(
      'constants.ts',
      "import type { LanguageCode } from '@svitlo/engine/build';\n\n" +
        'export const languages = ' +
        JSON.stringify(languageValues) +
        ' as const satisfies readonly [LanguageCode, ...LanguageCode[]];\n' +
        'export type LessonLanguages = typeof languages;\n',
    );
  }

  const skillIds = filtered.skills;
  const skills =
    Array.isArray(skillIds) && skillIds.length && options.bookRoot && options.outputFolder
      ? skillIndex(options.bookRoot)
      : new Map();

  function moduleImports(directory, names, factory, needsLanguages, languageValue = false, needsMedia = false) {
    const factoryImports = [
      factory,
      ...(factory === 'defineCode' ? ['readCodeSource'] : []),
      ...(needsMedia ? ['resolveLessonMedia'] : []),
    ].join(', ');
    const output = ['import { ' + factoryImports + " } from '@svitlo/engine/build';"];
    for (const [alias, { symbol, location }] of [...names.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      const binding = symbol === alias ? symbol : symbol + ' as ' + alias;
      output.push('import { ' + binding + ' } from ' + JSON.stringify(relativeImport(directory, location)) + ';');
    }
    if (needsLanguages && languagesType) {
      const constantImport = relativeImport(directory, '');
      output.push(
        'import type { LessonLanguages } from ' +
          JSON.stringify(constantImport + (constantImport.endsWith('/') ? '' : '/') + 'constants') +
          ';',
      );
      if (languageValue)
        output.push(
          'import { languages } from ' +
            JSON.stringify(constantImport + (constantImport.endsWith('/') ? '' : '/') + 'constants') +
            ';',
        );
    }
    return output.join('\n') + '\n\n';
  }

  function put(relative, content) {
    if (files.has(relative)) throw new Error('Duplicate generated Lesson destination: ' + relative);
    files.set(relative, content);
  }

  // Render plain source values and move every Configurator position into a
  // child module. Its containing object's ordinary metadata remains untouched.
  function render(value, context, ownerDirectory, imported, depth = 0, field = '$') {
    if (value && typeof value === 'object' && value[rawExpression]) return value[rawExpression];
    if (context === 'nullableBlock') {
      return value === null ? 'null' : render(value, 'block', ownerDirectory, imported, depth, field);
    }
    if (factoryContexts.has(context)) {
      if (!record(value) || typeof value.type !== 'string')
        throw new Error(
          'config.yaml:' + field + '.type: missing type discriminator for ' + context + ' factory dispatch',
        );
      if (context === 'slide' && !['image', 'scene'].includes(value.type))
        throw new Error('config.yaml:' + field + '.type: Carousel slides must be image or scene');
      if (!factories[value.type])
        throw new Error('config.yaml:' + field + '.type: unknown type "' + value.type + '"; no Engine define* factory');
      if (typeof value.slug !== 'string' || !safeSlug.test(value.slug))
        throw new Error('config.yaml:' + field + '.slug: unsafe or missing camelCase slug');
      const symbol = symbolFor(value, context);
      // The mandatory Text question and the Answer Configurator have fixed
      // semantic role paths. Their own authored slugs still live in Config.
      const roleRoot = (context === 'checkpointAnswer' && field === '$.answer') ||
        (context === 'block' && field === '$.question' && ownerDirectory.endsWith('/question'));
      const childDirectory = roleRoot ? ownerDirectory : join(ownerDirectory, value.slug);
      emitNode(value, context, childDirectory);
      let alias = symbol;
      if (imported.has(alias) && imported.get(alias).location !== childDirectory) {
        // Different semantic roles can legitimately contain blocks with the
        // same slug. Keep each child export short; alias only at the importer.
        const suffix = childDirectory.split('/').slice(-3).join('_');
        alias = symbol + '_' + suffix;
        let index = 2;
        while (imported.has(alias)) alias = symbol + '_' + suffix + '_' + index++;
      }
      imported.set(alias, { symbol, location: childDirectory });
      return alias;
    }
    if (Array.isArray(value)) {
      if (!value.length) return '[]';
      return (
        '[\n' +
        value
          .map(
            (item, index) =>
              indent(depth + 1) + render(item, 'plain', ownerDirectory, imported, depth + 1, field + '[' + index + ']'),
          )
          .join(',\n') +
        '\n' +
        indent(depth) +
        ']'
      );
    }
    if (!record(value)) {
      if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
        // Flashcard flag discriminants are inferred from a standalone const
        // parameters declaration. Preserve their literal types without freezing
        // mutable { items, order } collections via a blanket "as const".
        if (
          typeof value === 'string' &&
          /^\$\.parameters\.(?:flags|relationships)\.items\.[^.]+\.(?:type|color)$/.test(field)
        )
          return JSON.stringify(value) + ' as const';
        return JSON.stringify(value);
      }
      throw new Error('config.yaml:' + field + ': unsupported YAML value');
    }
    const entries = Object.entries(value);
    if (!entries.length) return '{}';
    return (
      '{\n' +
      entries
        .map(([key, child]) => {
          const nextContext = childContext(context, key, value);
          let nextDirectory = ownerDirectory;
          if (context === 'questionBank') nextDirectory = join(ownerDirectory, key);
          if (context === 'flashcardContent' && ['front', 'back', 'hint'].includes(key))
            nextDirectory = join(ownerDirectory, key);
          if (context === 'questionAnswers' && ['correct', 'incorrect', 'distractors'].includes(key))
            nextDirectory = join(ownerDirectory, key);
          if (context === 'questStageContent' && ['video', 'audio'].includes(key))
            nextDirectory = join(ownerDirectory, key);
          // Pair/Slot entries are plain named records rather than Configurators.
          // Their map key still owns a directory, so repeated child slugs in
          // different pairs never compete for the same generated file.
          if (
            context === 'pairItems' ||
            context === 'slotItems' ||
            (context === 'pair' && ['left', 'right'].includes(key)) ||
            (context === 'slot' && key === 'correctAnswer')
          )
            nextDirectory = join(ownerDirectory, key);
          const rendered = render(child, nextContext, nextDirectory, imported, depth + 1, field + '.' + key);
          return (
            indent(depth + 1) + (identifier.test(key) && rendered === key ? key : asProperty(key) + ': ' + rendered)
          );
        })
        .join(',\n') +
      '\n' +
      indent(depth) +
      '}'
    );
  }

  function symbolFor(value, context) {
    const stem = value.slug;
    if (context === 'stage') return 'stage_' + stem;
    if (context === 'task') return 'task_' + stem;
    if (context === 'question') return value.type + '_' + stem;
    return reserved.has(stem) || javascriptKeywords.has(stem) ? 'item_' + stem : stem;
  }

  function generateParameters(node, context, directory, imports) {
    const bindings = new Map();
    const uses =
      context === 'section' && node.type === 'quest'
        ? ['stages', 'tasks']
        : context === 'section' && sectionTypes.has(node.type)
          ? ['content']
          : context === 'block' && compositeTypes.has(node.type)
            ? [node.type === 'carousel' ? 'slides' : 'content']
            : context === 'checkpointItem'
              ? ['question', 'answer']
              : context === 'checkpointAnswer'
                ? ['content']
              : context === 'question'
                ? ['content']
                : context === 'flashcard'
                  ? ['content', 'parameters']
                  : context === 'stage'
                    ? ['content']
                    : context === 'task'
                      ? ['scene']
                      : [];
    for (const key of uses) {
      if (!Object.hasOwn(node, key)) continue;
      const owner =
        (context === 'section' && node.type === 'quest' && ['stages', 'tasks'].includes(key)) ||
        (context === 'checkpointItem' && ['question', 'answer'].includes(key))
          ? join(directory, key)
          : directory;
      bindings.set(key, render(node[key], childContext(context, key, node), owner, imports, 0, '$.' + key));
    }
    return bindings;
  }

  function genericFor(node, context, bindings) {
    if (!languagesType) return '';
    const slug = JSON.stringify(node.slug);
    const typeOf = key => (bindings.has(key) ? 'typeof ' + key : '{}');
    if (context === 'section' && node.type === 'quest')
      return '<' + [slug, typeOf('stages'), typeOf('tasks'), languagesType].join(', ') + '>';
    if (
      (context === 'section' && sectionTypes.has(node.type)) ||
      (context === 'block' && compositeTypes.has(node.type))
    )
      return (
        '<' +
        [slug, 'typeof ' + (node.type === 'carousel' ? 'slides' : 'content') + '.items', languagesType].join(', ') +
        '>'
      );
    if (context === 'checkpointItem')
      return '<' + [slug, typeOf('answer'), typeOf('question'), languagesType].join(', ') + '>';
    if (context === 'checkpointAnswer')
      return '<' + [slug, 'typeof content.items', languagesType].join(', ') + '>';
    if (context === 'question') return '<' + [slug, typeOf('content'), languagesType].join(', ') + '>';
    if (context === 'flashcard') {
      const content = name =>
        bindings.has('content') && node.content?.[name] ? 'typeof content.' + name + '.items' : '{}';
      const params = name =>
        bindings.has('parameters') && node.parameters?.[name] ? 'typeof parameters.' + name + '.items' : '{}';
      return (
        '<' +
        [
          slug,
          content('front'),
          content('back'),
          content('hint'),
          params('flags'),
          params('relationships'),
          languagesType,
        ].join(', ') +
        '>'
      );
    }
    return '<' + [slug, languagesType].join(', ') + '>';
  }

  function emitNode(node, context, directory) {
    if (nodeLocations && (node.type === 'scene' || localMediaTypes.has(node.type))) {
      if (nodeLocations.has(node.id) && nodeLocations.get(node.id) !== directory)
        throw new Error('Duplicate Lesson media/Scene UUID: ' + node.id);
      nodeLocations.set(node.id, directory);
    }
    const authored = fileBackedNode(node, context, directory);
    const factory = factories[node.type];
    if (!factory) throw new Error('config.yaml: unknown factory for ' + node.type);
    const imports = new Map();
    const bindings = generateParameters(authored, context, directory, imports);
    // All bound children are rendered with real source names but are never
    // inserted as an extra authored field into the Config.
    const extra = [];
    for (const [key, expression] of bindings) {
      if (key === 'scene' || key === 'question') {
        // A single nested Configurator is imported under its actual symbol;
        // bind the field name through a local alias only when needed.
        extra.push('const ' + key + ' = ' + expression + ';\n');
      } else extra.push('const ' + key + ' = ' + expression + ';\n');
    }
    const fields = [];
    for (const [key, value] of Object.entries(authored)) {
      let rendered;
      if (bindings.has(key)) rendered = key;
      else rendered = render(value, childContext(context, key, authored), directory, imports, 1, '$.' + key);
      fields.push('  ' + (identifier.test(key) && rendered === key ? key : asProperty(key) + ': ' + rendered));
    }
    const content = fields.length ? '{\n' + fields.join(',\n') + '\n}' : '{}';
    const name = symbolFor(node, context);
    const importHead = moduleImports(
      directory,
      imports,
      factory,
      true,
      false,
      authored !== node && localMediaTypes.has(node.type),
    );
    const result =
      importHead +
      (extra.length ? extra.join('') + '\n' : '') +
      'export const ' +
      name +
      ' = ' +
      factory +
      genericFor(node, context, bindings) +
      '(' +
      content +
      ');\n';
    put(join(directory, 'index.ts'), result);
  }

  function emitCollection(field, context, directory) {
    if (!Object.hasOwn(filtered, field)) return;
    const imports = new Map();
    const collection = render(filtered[field], context, directory, imports, 0, '$.' + field);
    const lines = [];
    for (const [alias, { symbol, location }] of [...imports.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      const binding = symbol === alias ? symbol : symbol + ' as ' + alias;
      lines.push('import { ' + binding + ' } from ' + JSON.stringify(relativeImport(directory, location)) + ';');
    }
    put(
      join(directory, 'index.ts'),
      (lines.length ? lines.join('\n') + '\n\n' : '') + 'export const ' + field + ' = ' + collection + ';\n',
    );
  }

  emitCollection('section', 'sectionCollection', 'sections');
  emitCollection('flashcards', 'flashcardCollection', 'flashcards');
  emitCollection('questions', 'questionBank', 'questions');

  const rootImports = ["import { defineLesson } from '@svitlo/engine/build';"];
  for (const [field, directory] of [
    ['section', 'sections'],
    ['flashcards', 'flashcards'],
    ['questions', 'questions'],
  ]) {
    if (Object.hasOwn(filtered, field))
      rootImports.push('import { ' + field + ' } from ' + JSON.stringify('./' + directory) + ';');
  }
  if (hasLanguages) {
    rootImports.push("import { languages } from './constants';");
    rootImports.push("import type { LessonLanguages } from './constants';");
  }
  const skillNames = new Map();
  if (Array.isArray(skillIds)) {
    for (const id of skillIds) {
      const match = skills.get(id);
      if (!match) throw new Error('Unresolved Skill ID ' + JSON.stringify(id) + ' in Lesson ' + filtered.slug);
      if (skillNames.has(match.symbol) && skillNames.get(match.symbol) !== match.file)
        throw new Error('Ambiguous Skill export ' + match.symbol);
      skillNames.set(match.symbol, match.file);
    }
  }
  for (const [symbol, absolute] of [...skillNames.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const target = path.relative(options.outputFolder, absolute).split(path.sep).join('/').replace(/\.ts$/, '');
    rootImports.push(
      'import { ' + symbol + ' } from ' + JSON.stringify(target.startsWith('.') ? target : './' + target) + ';',
    );
  }
  const rootFields = [];
  for (const [key, value] of Object.entries(filtered)) {
    if (key === 'skills' && Array.isArray(value)) {
      rootFields.push('  skills: [' + value.map(id => skills.get(id).symbol + '.id').join(', ') + ']');
      continue;
    }
    if (['section', 'flashcards', 'questions'].includes(key)) {
      rootFields.push('  ' + key);
      continue;
    }
    if (key === 'params' && record(value) && hasLanguages) {
      const entries = Object.entries(value);
      rootFields.push(
        '  params: {\n' +
          entries
            .map(
              ([name, v]) =>
                '    ' +
                (name === 'languages'
                  ? 'languages'
                  : asProperty(name) + ': ' + render(v, 'plain', '', new Map(), 2, '$.params.' + name)),
            )
            .join(',\n') +
          '\n  }',
      );
      continue;
    }
    rootFields.push(
      '  ' +
        asProperty(key) +
        ': ' +
        render(value, childContext('lesson', key, filtered), '', new Map(), 1, '$.' + key),
    );
  }
  const langArgs = hasLanguages
    ? '<' +
      [
        JSON.stringify(filtered.slug),
        'LessonLanguages',
        Object.hasOwn(filtered, 'section') ? 'typeof section.items' : '{}',
        Object.hasOwn(filtered, 'flashcards') ? 'typeof flashcards.items' : '{}',
        Object.hasOwn(filtered, 'questions') ? 'typeof questions' : '{}',
      ].join(', ') +
      '>'
    : '';
  const root =
    rootImports.join('\n') +
    '\n\n' +
    'export const ' +
    filtered.slug +
    '_Lesson = defineLesson' +
    langArgs +
    '({\n' +
    rootFields.join(',\n') +
    '\n});\n';
  put('review.ts', renderReviewDraft());
  put('index.ts', root);
  // Write the entrypoint last. A process interruption before this point
  // leaves an orphan tree, which runOne rejects rather than treating it as a
  // complete Lesson on the next creation-only run.
  return new Map(
    [...files.entries()].sort((a, b) =>
      a[0] === 'index.ts' ? 1 : b[0] === 'index.ts' ? -1 : a[0].localeCompare(b[0]),
    ),
  );
}
