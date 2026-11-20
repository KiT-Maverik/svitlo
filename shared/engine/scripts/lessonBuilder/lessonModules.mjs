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
const sceneSlug = /^[A-Za-z][A-Za-z0-9]*$/;
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
// Reserved pending identity; never allocate physical resource UUIDs while scaffolding.
const UNRESOLVED_RESOURCE_UUID = '00000000-0000-0000-0000-000000000000';
const pendingMediaExtensions = { image: 'webp', audio: 'mp3', video: 'mp4', subtitles: 'vtt' };
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
    if (segment !== 'index.ts' && !sceneSlug.test(segment))
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
      // Current Skill authoring uses <slug>.ts; legacy *.data.ts remains readable.
      if (!entry.isFile() || !entry.name.endsWith('.ts') || entry.name.endsWith('.d.ts')) continue;
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
  const questionBankOnly = options.questionBankOnly === true;
  if (!record(filtered) || filtered.type !== 'lesson')
    throw new Error('lesson.yaml:config.type: expected lesson type for the Lesson entrypoint');
  // The root export is exactly config.slug; unlike the former _Lesson suffix,
  // it must not shadow built-in imports or be a JavaScript keyword.
  if (
    !safeSlug.test(filtered.slug) ||
    reserved.has(filtered.slug) ||
    javascriptKeywords.has(filtered.slug) ||
    filtered.slug === 'defineLesson'
  )
    throw new Error('lesson.yaml:config.slug: reserved or invalid Lesson export identifier');
  for (const field of ['questions', 'flashcards']) {
    if (Object.hasOwn(filtered, field) && !(questionBankOnly && field === 'questions'))
      throw new Error(
        'lesson.yaml:config.' +
          field +
          ': embedded banks are no longer supported; author ' +
          field +
          '.yaml at the Lesson root',
      );
  }
  const files = new Map();
  const nodeLocations = options.nodeLocations;
  const pendingSections = new Map((options.pendingAssessments ?? []).filter(item => item.slug).map(item => [item.slug, item]));

  /**
   * Extract only actually authored learner text. There is no mechanical
   * synthesis from production.specification (which is not lesson copy).
   * Markdown's invariant and localized shapes are mutually exclusive.
   */
  function fileBackedNode(node, context, directory) {
    if (context !== 'block' && context !== 'slide') return node;
    if (localMediaTypes.has(node.type)) {
      const locale = record(node.locale) ? node.locale : {};
      const fields = node.type === 'video' ? ['fileName', 'posterFileName'] : ['fileName'];
      for (const field of fields) {
        if (Object.hasOwn(locale, field)) {
          throw new Error(
            'lesson.yaml: media ' + field + ' belongs in generated TypeScript, not technical YAML: ' + directory,
          );
        }
      }
      return {
        ...node,
        locale: { ...locale, ...Object.fromEntries(fields.map(field => [field, null])) },
      };
    }
    if (node.type === 'markdown' && record(node.locale) && node.locale.value !== undefined) {
      const source = node.locale.value;
      const authored = { ...node, locale: { ...node.locale } };
      if (typeof source === 'string') {
        if (!source.trim()) throw new Error('Empty authored Markdown source: ' + directory);
        put(path.posix.join(directory, 'markdown.md'), source);
        authored.locale.value = expression('readMarkdown(import.meta.url)');
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
          put(path.posix.join(directory, language + '.md'), source[language]);
        }
        authored.locale.value = expression('readMarkdown(import.meta.url, ' + JSON.stringify([language]) + ')');
      } else {
        throw new Error('Invalid authored Markdown value: ' + directory);
      }
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
  const constantsSpecifier = '#lessonsData/' + filtered.id?.at(-1) + '/' + filtered.id + '/constants';
  if (hasLanguages && !questionBankOnly) {
    files.set(
      'constants.ts',
      "import type { SupportedLanguages } from '@svitlo/engine/build';\n\n" +
        '// TODO (BLOCKER): Restore the complete language set when translations are ready:\n' +
        '// export const languages = ' +
        JSON.stringify(languageValues) +
        ' as const satisfies SupportedLanguages;\n\n' +
        'export const languages = ' +
        JSON.stringify([language]) +
        ' as const satisfies SupportedLanguages;\n' +
        'export type LessonLanguages = typeof languages;\n',
    );
  }

  const skillIds = filtered.skills;
  const skills =
    Array.isArray(skillIds) && skillIds.length && options.bookRoot && options.outputFolder
      ? skillIndex(options.bookRoot)
      : new Map();

  // Keep package imports, textbook aliases and relative dependencies in distinct groups.
  // Empty groups are omitted so leaf modules and root-only drafts stay compact.
  const groupedImports = (...groups) =>
    groups
      .filter(group => group.length)
      .map(group => group.join('\n'))
      .join('\n\n') + '\n\n';

  function moduleImports(directory, names, factory, needsLanguages, languageValue = false) {
    const factoryImports = [
      factory,
      ...(factory === 'defineCode' ? ['readCodeSource'] : factory === 'defineMarkdown' ? ['readMarkdown'] : []),
    ].join(', ');
    const packageImports = ['import { ' + factoryImports + " } from '@svitlo/engine/build';"];
    const aliasImports = [];
    const localImports = [];
    if (needsLanguages && languagesType) {
      aliasImports.push('import type { LessonLanguages } from ' + JSON.stringify(constantsSpecifier) + ';');
      if (languageValue) aliasImports.push('import { languages } from ' + JSON.stringify(constantsSpecifier) + ';');
    }
    for (const [alias, { symbol, location }] of [...names.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      const binding = symbol === alias ? symbol : symbol + ' as ' + alias;
      localImports.push('import { ' + binding + ' } from ' + JSON.stringify(relativeImport(directory, location)) + ';');
    }
    return groupedImports(packageImports, aliasImports, localImports);
  }

  function put(relative, content) {
    if (files.has(relative)) throw new Error('Duplicate generated Lesson destination: ' + relative);
    files.set(relative, content);
  }

  // Render plain source values and move every Configurator position into a
  // child module. Its containing object's ordinary metadata remains untouched.
  function render(value, context, ownerDirectory, imported, depth = 0, field = '$', pending = null) {
    if (value && typeof value === 'object' && value[rawExpression]) return value[rawExpression];
    if (value === null && context.startsWith('pendingMedia:')) {
      const kind = context.slice('pendingMedia:'.length);
      return JSON.stringify(UNRESOLVED_RESOURCE_UUID + '.' + pendingMediaExtensions[kind]);
    }
    if (context === 'nullableBlock') {
      return value === null ? 'null' : render(value, 'block', ownerDirectory, imported, depth, field);
    }
    if (factoryContexts.has(context)) {
      if (!record(value) || typeof value.type !== 'string')
        throw new Error(
          'lesson.yaml:' + field + '.type: missing type discriminator for ' + context + ' factory dispatch',
        );
      if (context === 'slide' && !['image', 'scene'].includes(value.type))
        throw new Error('lesson.yaml:' + field + '.type: Carousel slides must be image or scene');
      if (!factories[value.type])
        throw new Error('lesson.yaml:' + field + '.type: unknown type "' + value.type + '"; no Engine define* factory');
      if (typeof value.slug !== 'string' || !(value.type === 'scene' ? sceneSlug : safeSlug).test(value.slug))
        throw new Error('lesson.yaml:' + field + '.slug: unsafe or missing camelCase slug');
      const symbol = symbolFor(value, context);
      // The mandatory Text question and the Answer Configurator have fixed
      // semantic role paths. Their own authored slugs still live in Config.
      const roleRoot =
        (context === 'checkpointAnswer' && field === '$.answer') ||
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
              indent(depth + 1) + render(item, 'plain', ownerDirectory, imported, depth + 1, field + '[' + index + ']', pending),
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
      throw new Error('lesson.yaml:' + field + ': unsupported YAML value');
    }
    const entries = Object.entries(value);
    if (!entries.length) return '{}';
    return (
      '{\n' +
      entries
        .map(([key, child]) => {
          const nextContext = context.startsWith('pendingMedia:')
            ? context
            : context.startsWith('mediaLocale:') && (key === 'fileName' || key === 'posterFileName')
              ? 'pendingMedia:' + (key === 'posterFileName' ? 'image' : context.slice('mediaLocale:'.length))
              : childContext(context, key, value);
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
          if (context === 'flashcardContent' && ['front', 'back', 'hint'].includes(key)) {
            if (!record(child)) throw new Error('lesson.yaml:' + field + '.' + key + ': expected Flashcard side');
            emitFlashcardSide(key, child, nextDirectory);
            imported.set(key, { symbol: key, location: nextDirectory });
            return indent(depth + 1) + key;
          }
          const nextField = field + '.' + key;
          const rendered = render(child, nextContext, nextDirectory, imported, depth + 1, nextField, pending);
          const assessmentComment = pending?.provisionalFields?.includes(nextField)
            ? indent(depth + 1) + '// TODO (BLOCKER): Provisional assessment ' + nextField + '; specialist must approve and replace before publication.\n'
            : '';
          const pendingComment =
            child === null && nextContext.startsWith('pendingMedia:')
              ? indent(depth + 1) +
                '// TODO(asset): Auto-generated unresolved media placeholder; no physical asset exists.\n' +
                indent(depth + 1) +
                '// Replace with actual UUID.extension before production.\n'
              : '';
          return (
            assessmentComment +
            pendingComment +
            indent(depth + 1) +
            (identifier.test(key) && rendered === key ? key : asProperty(key) + ': ' + rendered)
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
    if (value.type === 'scene') return stem[0].toUpperCase() + stem.slice(1) + 'Config';
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
    if (context === 'checkpointAnswer') return '<' + [slug, 'typeof content.items', languagesType].join(', ') + '>';
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

  // Flashcard sides have no UUID. The role-local barrel owns the ordered block map.
  function emitFlashcardSide(role, side, directory) {
    const reservedImports = new Set([role, 'sideItems', 'defineFlashcardSide', 'LessonLanguages']);
    const imports = new Map([...reservedImports].map(name => [name, { symbol: name, location: '__reserved__' }]));
    const sideItems = render(side.items, 'blockItems', directory, imports, 0, '$.content.' + role + '.items');
    const fields = Object.entries(side).map(([key, value]) =>
      key === 'items'
        ? '  items: sideItems'
        : '  ' +
          asProperty(key) +
          ': ' +
          render(value, 'plain', directory, imports, 1, '$.content.' + role + '.' + key),
    );
    const usedImports = new Map([...imports].filter(([, entry]) => entry.location !== '__reserved__'));
    put(
      join(directory, 'index.ts'),
      moduleImports(directory, usedImports, 'defineFlashcardSide', true) +
        'const sideItems = ' +
        sideItems +
        ';\n\n' +
        'export const ' +
        role +
        ' = defineFlashcardSide<' +
        (languagesType ? 'typeof sideItems, LessonLanguages' : 'typeof sideItems') +
        '>({\n' +
        fields.join(',\n') +
        '\n});\n',
    );
  }

  function emitNode(node, context, directory) {
    if (nodeLocations && (node.type === 'scene' || localMediaTypes.has(node.type))) {
      if (nodeLocations.has(node.id) && nodeLocations.get(node.id) !== directory)
        throw new Error('Duplicate Lesson media/Scene UUID: ' + node.id);
      nodeLocations.set(node.id, directory);
    }
    const authored = fileBackedNode(node, context, directory);
    const factory = factories[node.type];
    if (!factory) throw new Error('lesson.yaml: unknown factory for ' + node.type);
    const imports = new Map();
    const bindings = generateParameters(authored, context, directory, imports);
    const pending = context === 'section' ? pendingSections.get(authored.slug) : null;
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
      else
        rendered = render(
          value,
          key === 'locale' && localMediaTypes.has(authored.type)
            ? 'mediaLocale:' + authored.type
            : childContext(context, key, authored),
          directory,
          imports,
          1,
          '$.' + key,
          key === 'params' ? pending : null,
        );
      if (key === 'id' && pending?.generatedIdentity)
        fields.push('  // TODO (BLOCKER): Generated Section UUID needs explicit editorial ownership before publication.');
      fields.push('  ' + (identifier.test(key) && rendered === key ? key : asProperty(key) + ': ' + rendered));
    }
    const content = fields.length ? '{\n' + fields.join(',\n') + '\n}' : '{}';
    const name = symbolFor(node, context);
    const importHead = moduleImports(directory, imports, factory, true, false);
    // Every assessment Section starts blocked until its independent bank is verified.
    // UUID-shaped strings alone are not evidence of approval; do not auto-remove the blocker.
    const assessmentBlocker =
      context === 'section' && node.type === 'quiz'
        ? '// TODO (BLOCKER): This Quiz Section is required by the Methodologist.\n' +
          '// Integrate reviewed Question UUIDs and complete Quiz parameters before merge.\n'
        : context === 'section' && node.type === 'flashcards'
          ? '// TODO (BLOCKER): This Flashcards Section is required by the Methodologist.\n' +
            '// Integrate reviewed Flashcard UUIDs and verify their selection before merge.\n'
          : '';
    // Nil UUID filenames identify unfinished assets. Keep per-field TODO(asset)
    // hints and emit one CI-visible blocker for each media Configurator.
    const mediaBlocker = localMediaTypes.has(node.type)
      ? '// TODO (BLOCKER): ' +
        node.type +
        ' media resource(s) unresolved.\n' +
        '// Produce or reuse verified asset files and replace Nil UUID filename(s) before merge.\n'
      : '';
    const result =
      importHead +
      (extra.length ? extra.join('') + '\n' : '') +
      assessmentBlocker +
      mediaBlocker +
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

  if (questionBankOnly) {
    if (!record(filtered.questions) || !Object.keys(filtered.questions).length)
      throw new Error('questions.yaml:questions: expected nonempty Question type groups');
    emitCollection('questions', 'questionBank', 'questions');
    return new Map(
      [...files.entries()].sort((a, b) =>
        a[0] === 'questions/index.ts' ? 1 : b[0] === 'questions/index.ts' ? -1 : a[0].localeCompare(b[0]),
      ),
    );
  }

  emitCollection('section', 'sectionCollection', 'sections');

  const rootImports = ["import { defineLesson } from '@svitlo/engine/build';"];
  for (const [field, directory] of [['section', 'sections']]) {
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
    if (key === 'section') {
      const blockers = options.pendingAssessments ?? [];
      const comments = blockers.map(
        ({ type, slug }) =>
          '  // TODO (BLOCKER): ' +
          (type === 'quiz' ? 'Quiz' : 'Flashcards') +
          ' Section ' + JSON.stringify(slug) +
          ' awaits independently reviewed resources and approved selection before Lesson publication.',
      );
      rootFields.push((comments.length ? comments.join('\n') + '\n' : '') + '  section');
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
      ].join(', ') +
      '>'
    : '';
  const root =
    groupedImports([rootImports[0]], rootImports.slice(1)) +
    'export const ' +
    filtered.slug +
    ' = defineLesson' +
    langArgs +
    '({\n' +
    rootFields.join(',\n') +
    '\n});\n';
  put('review.ts', renderReviewDraft(language));
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
