/**
 * Read-only, Code-derived Question/Quiz translation references.
 * Resolve literal TypeScript modules statically; authored code is never executed.
 * Missing translations are visible preview gaps, while unsafe or incomplete
 * source structures fail the whole requested Lesson/locale reference.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const NAME = /^[A-Za-z][A-Za-z0-9]*$/;
const BOOK = /^[a-z][a-z0-9-]*$/;
const groups = ['question', 'hint', 'explanation'];
const answerGroups = ['correct', 'distractors', 'incorrect'];
// Matches the canonical Engine questionTypes discriminator list.
const questionTypes = [
  'selectOneAnswer',
  'selectMultipleAnswers',
  'matchBlocks',
  'answerWithText',
  'answerWithNumber',
  'orderSequence',
  'buildAnswerWithBlocks',
  'fillBlanksWithBlocks',
  'fillBlanksWithText',
];
const factories = new Set([
  ...questionTypes.map(type => 'define' + type[0].toUpperCase() + type.slice(1)),
  'defineText',
  'defineQuizSection',
  'defineMarkdown',
]);
const sourceOf = Symbol('canonical source');
const markdownOf = Symbol('Markdown file sources');

function record(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
function exactKeys(value, required, context, allowed = required) {
  if (!record(value)) throw Error('Expected record at ' + context);
  const absent = required.filter(k => !Object.hasOwn(value, k));
  const unknown = Object.keys(value).filter(k => !allowed.includes(k));
  if (absent.length || unknown.length) {
    throw Error(`Invalid ${context}: missing [${absent}], unexpected [${unknown}]`);
  }
}
function unwrap(node) {
  while (
    node &&
    (ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isNonNullExpression(node))
  )
    node = node.expression;
  return node;
}
function propName(node, context) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  throw Error('Computed key is unsupported: ' + context);
}
function validDirectory(folder) {
  if (!fs.existsSync(folder) || fs.lstatSync(folder).isSymbolicLink() || !fs.statSync(folder).isDirectory()) {
    throw Error('Missing or unsafe Question directory: ' + folder);
  }
}
function safePath(boundary, candidate) {
  const relative = path.relative(boundary, candidate);
  if (!relative || relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    throw Error('Import escapes owned source tree: ' + candidate);
  }
  let current = boundary;
  for (const segment of relative.split(path.sep)) {
    current = path.join(current, segment);
    if (!fs.existsSync(current)) throw Error('Unresolved canonical import: ' + current);
    if (fs.lstatSync(current).isSymbolicLink()) throw Error('Symlinked authored source: ' + current);
  }
  return candidate;
}

/** Only relative, explicit and extensionless imports within the owning Lesson. */
class StaticModules {
  constructor(lessonRoot) {
    this.root = lessonRoot;
    this.cache = new Map();
    validDirectory(lessonRoot);
  }
  module(file) {
    safePath(this.root, file);
    if (!fs.statSync(file).isFile() || !file.endsWith('.ts')) throw Error('Expected TypeScript module: ' + file);
    if (this.cache.has(file)) return this.cache.get(file);
    const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    if (ast.parseDiagnostics.length) throw Error('Invalid TypeScript: ' + file);
    const state = { file, ast, bindings: new Map(), imports: new Map(), exports: new Set(), resolving: new Set() };
    this.cache.set(file, state);
    for (const stmt of ast.statements) {
      if (ts.isImportDeclaration(stmt)) {
        if (stmt.importClause?.isTypeOnly) continue;
        if (!ts.isStringLiteral(stmt.moduleSpecifier)) throw Error('Dynamic import in ' + file);
        const spec = stmt.moduleSpecifier.text;
        if (spec === '@svitlo/engine/build') continue;
        if (!spec.startsWith('.') || !/^(?:\.\.?(?:\/))+[A-Za-z][A-Za-z0-9/_-]*$/.test(spec)) {
          // Nonlocal type-only imports are ignored above, never evaluated.
          throw Error('Unsupported runtime import: ' + spec);
        }
        const imported = stmt.importClause?.namedBindings;
        if (!imported || !ts.isNamedImports(imported) || stmt.importClause.name) {
          throw Error('Unsupported canonical import binding: ' + spec);
        }
        const resolved = path.resolve(path.dirname(file), spec);
        const moduleFile =
          fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()
            ? path.join(resolved, 'index.ts')
            : resolved + '.ts';
        safePath(this.root, moduleFile);
        for (const element of imported.elements) {
          if (element.isTypeOnly) continue;
          const name = element.name.text;
          if (state.imports.has(name)) throw Error('Duplicate import: ' + name);
          state.imports.set(name, { file: moduleFile, exportName: element.propertyName?.text ?? name });
        }
      } else if (ts.isVariableStatement(stmt)) {
        const exported = stmt.modifiers?.some(x => x.kind === ts.SyntaxKind.ExportKeyword) ?? false;
        for (const d of stmt.declarationList.declarations) {
          if (!ts.isIdentifier(d.name) || !d.initializer) throw Error('Unsupported declaration in ' + file);
          if (state.bindings.has(d.name.text)) throw Error('Duplicate declaration: ' + d.name.text);
          state.bindings.set(d.name.text, d.initializer);
          if (exported) state.exports.add(d.name.text);
        }
      } else if (ts.isExportDeclaration(stmt) && !stmt.isTypeOnly) {
        // The canonical type index has explicit, named re-exports of
        // <type>/<slug>.ts; there is no star export or runtime execution.
        if (
          !stmt.moduleSpecifier ||
          !ts.isStringLiteral(stmt.moduleSpecifier) ||
          !stmt.exportClause ||
          !ts.isNamedExports(stmt.exportClause) ||
          !/^\.[/][A-Za-z][A-Za-z0-9]*$/.test(stmt.moduleSpecifier.text)
        ) {
          throw Error('Unsupported Question re-export: ' + file);
        }
        const target = path.resolve(path.dirname(file), stmt.moduleSpecifier.text) + '.ts';
        safePath(this.root, target);
        for (const entry of stmt.exportClause.elements) {
          if (entry.isTypeOnly) continue;
          const localName = entry.propertyName?.text ?? entry.name.text;
          const exportedName = entry.name.text;
          if (state.exports.has(exportedName) || state.imports.has(exportedName))
            throw Error('Duplicate Question re-export: ' + exportedName);
          state.exports.add(exportedName);
          state.imports.set(exportedName, { file: target, exportName: localName });
        }
      }
    }
    return state;
  }
  value(state, name, exported = false) {
    if (exported && !state.exports.has(name)) throw Error('Missing canonical export ' + name + ' in ' + state.file);
    const dependency = state.imports.get(name);
    if (dependency) return this.value(this.module(dependency.file), dependency.exportName, true);
    const initializer = state.bindings.get(name);
    if (!initializer) throw Error('Unresolved identifier ' + name + ' in ' + state.file);
    if (state.resolving.has(name)) throw Error('Cyclic static reference: ' + state.file + ':' + name);
    state.resolving.add(name);
    try {
      return this.literal(initializer, state, name);
    } finally {
      state.resolving.delete(name);
    }
  }
  literal(raw, state, context) {
    const node = unwrap(raw);
    if (!node) throw Error('Missing value: ' + context);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isIdentifier(node)) return this.value(state, node.text);
    if (ts.isArrayLiteralExpression(node))
      return node.elements.map((item, i) => this.literal(item, state, context + '.' + i));
    if (ts.isObjectLiteralExpression(node)) {
      const value = Object.create(null);
      for (const p of node.properties) {
        if (ts.isSpreadAssignment(p)) throw Error('Spread is not a static canonical value: ' + context);
        if (ts.isShorthandPropertyAssignment(p)) {
          const key = p.name.text;
          if (Object.hasOwn(value, key)) throw Error('Duplicate key: ' + context + '.' + key);
          value[key] = this.value(state, key);
        } else if (ts.isPropertyAssignment(p)) {
          const key = propName(p.name, context);
          if (Object.hasOwn(value, key)) throw Error('Duplicate key: ' + context + '.' + key);
          value[key] = this.literal(p.initializer, state, context + '.' + key);
        } else throw Error('Unsupported object member: ' + context);
      }
      return value;
    }
    if (ts.isPropertyAccessExpression(node)) {
      const container = this.literal(node.expression, state, context + '.owner');
      if (!record(container) || !Object.hasOwn(container, node.name.text)) {
        throw Error('Unresolved static property: ' + context);
      }
      return container[node.name.text];
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const name = node.expression.text;
      if (factories.has(name) && node.arguments.length === 1) {
        const value = this.literal(node.arguments[0], state, context);
        if (!record(value)) throw Error('Invalid ' + name + ' config: ' + context);
        Object.defineProperty(value, sourceOf, { value: state.file });
        return value;
      }
      if (
        name === 'readMarkdown' &&
        node.arguments.length === 2 &&
        node.arguments[0].getText(state.ast) === 'import.meta.url'
      ) {
        const locales = this.literal(node.arguments[1], state, context + '.locales');
        if (
          !Array.isArray(locales) ||
          !locales.length ||
          new Set(locales).size !== locales.length ||
          locales.some(code => typeof code !== 'string' || !/^[a-z]{2,4}$/.test(code))
        ) {
          throw Error('Invalid readMarkdown locale list: ' + state.file);
        }
        const values = Object.create(null),
          sources = Object.create(null);
        for (const locale of locales) {
          const file = path.join(path.dirname(state.file), locale + '.md');
          safePath(this.root, file);
          const markdown = fs.readFileSync(file, 'utf8');
          if (!markdown.trim()) throw Error('Empty Markdown source: ' + file);
          values[locale] = markdown;
          sources[locale] = file;
        }
        Object.defineProperty(values, markdownOf, { value: sources });
        return values;
      }
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text.startsWith('defineSelect')
    ) {
      throw Error('Unsupported Question type: ' + node.expression.text);
    }
    throw Error(
      'Non-static/unsupported expression at ' + state.file + ':' + context + ' (' + ts.SyntaxKind[node.kind] + ')',
    );
  }
}

/**
 * Sole canonical layout:
 * questions/index.ts → questions/<type>/index.ts → questions/<type>/<slug>.ts.
 * Each index is complete. Flat files, Question-folder index.ts and hidden
 * unregistered Questions are intentionally rejected.
 */
function readBank(resolver, directory) {
  const index = resolver.module(path.join(directory, 'index.ts'));
  if (!index.exports.has('questions')) throw Error('Missing canonical questions export');
  const bank = resolver.value(index, 'questions', true);
  if (!record(bank) || !Object.keys(bank).length) throw Error('Empty canonical Question registry');
  for (const type of Object.keys(bank)) {
    if (!questionTypes.includes(type)) throw Error('Unsupported Question type: ' + type);
  }
  const rootEntries = fs.readdirSync(directory, { withFileTypes: true }).filter(e => e.name !== 'index.ts');
  if (
    rootEntries.length !== Object.keys(bank).length ||
    rootEntries.some(e => e.isSymbolicLink() || !e.isDirectory() || !Object.hasOwn(bank, e.name))
  ) {
    throw Error('Legacy or unregistered root Question bank entry: ' + directory);
  }
  const questions = [];
  for (const [type, members] of Object.entries(bank)) {
    const dir = path.join(directory, type);
    validDirectory(dir);
    if (!record(members) || !Object.keys(members).length) throw Error('Empty Question type: ' + type);
    const typeIndex = resolver.module(path.join(dir, 'index.ts'));
    const names = Object.keys(members);
    if (
      names.some(n => !NAME.test(n)) ||
      typeIndex.exports.size !== names.length ||
      names.some(n => !typeIndex.exports.has(n))
    ) {
      throw Error('Question type index does not export every Question: ' + type);
    }
    const physical = new Set();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const candidate = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) throw Error('Symlinked Question member: ' + candidate);
      if (entry.name === 'index.ts' && entry.isFile()) continue;
      if (entry.isFile() && entry.name.endsWith('.ts') && NAME.test(entry.name.slice(0, -3))) {
        physical.add(entry.name.slice(0, -3));
      } else if (entry.isDirectory() && names.includes(entry.name)) {
        // ContentBlocks may be nested beside Question files under <slug>/,
        // but these directories must not contain old Question entrypoints.
        if (fs.existsSync(path.join(candidate, 'index.ts')))
          throw Error('Legacy nested Question entrypoint: ' + candidate);
      } else throw Error('Unexpected Question type entry: ' + candidate);
    }
    if (physical.size !== names.length || names.some(name => !physical.has(name))) {
      throw Error('Question registry and physical type members disagree: ' + type);
    }
    for (const slug of names) {
      const leaf = path.join(dir, slug + '.ts');
      const typeExport = typeIndex.imports.get(slug);
      if (!typeExport || typeExport.file !== leaf || !NAME.test(typeExport.exportName)) {
        throw Error('Question type index must re-export ' + type + '/' + slug + '.ts');
      }
      // The bank root must consume that type-level index, not leaf files.
      const imports = [...index.imports.values()].filter(
        e => e.file === path.join(dir, 'index.ts') && e.exportName === slug,
      );
      if (imports.length !== 1) throw Error('Question bank index bypasses type index: ' + type + '/' + slug);
      const question = members[slug];
      if (
        !record(question) ||
        question[sourceOf] !== leaf ||
        question.slug !== slug ||
        question.type !== type ||
        !UUID.test(question.id ?? '') ||
        typeof question.params?.assessmentMethod !== 'string'
      ) {
        throw Error('Invalid canonical Question metadata: ' + type + '/' + slug);
      }
      questions.push(question);
    }
  }
  return questions;
}

function addId(seen, uuid, context) {
  if (typeof uuid !== 'string' || !UUID.test(uuid)) throw Error('Invalid UUID at ' + context);
  const id = uuid.toLowerCase();
  if (seen.has(id)) throw Error('Duplicate UUID ' + uuid + ' at ' + context + ' (was ' + seen.get(id) + ')');
  seen.set(id, context);
}
function verifyLocalized(locale, origin, context) {
  if (!record(locale) || typeof locale[origin] !== 'string' || !locale[origin].trim())
    throw Error('Missing original-language Question text at ' + context);
}
function verifyBlock(block, origin, seen, context) {
  if (
    !record(block) ||
    !['text', 'markdown'].includes(block.type) ||
    !NAME.test(block.slug ?? '') ||
    !record(block.locale) ||
    !record(block.locale.value)
  ) {
    throw Error('Unsupported Question ContentBlock: ' + context);
  }
  verifyLocalized(block.locale.value, origin, context);
  addId(seen, block.id, context);
}
function verifyCollection(group, context, origin, seen, { empty = false, item } = {}) {
  exactKeys(group, ['items', 'order'], context);
  if (
    !record(group.items) ||
    !Array.isArray(group.order) ||
    (!empty && !group.order.length) ||
    new Set(group.order).size !== group.order.length ||
    Object.keys(group.items).length !== group.order.length ||
    group.order.some(key => !NAME.test(key) || !Object.hasOwn(group.items, key))
  ) {
    throw Error('Invalid ordered Question collection: ' + context);
  }
  for (const slug of group.order) {
    const value = group.items[slug];
    if (item) item(value, context + '.' + slug);
    else {
      if (value?.slug !== slug) throw Error('Question ContentBlock slug mismatch: ' + context + '.' + slug);
      verifyBlock(value, origin, seen, context + '.' + slug);
    }
  }
}
function verifyQuestions(questions, seen, origin) {
  const specialized = {
    selectOneAnswer: ['answers'],
    selectMultipleAnswers: ['answers'],
    matchBlocks: ['pairs'],
    answerWithText: [],
    answerWithNumber: [],
    orderSequence: ['sequence'],
    buildAnswerWithBlocks: ['correctSequence', 'distractors'],
    fillBlanksWithBlocks: ['slots', 'distractors'],
    fillBlanksWithText: ['slots'],
  };
  for (const q of questions) {
    const context = q.type + '/' + q.slug;
    addId(seen, q.id, 'Question ' + context);
    exactKeys(q.content, ['question', ...specialized[q.type]], context + '.content', [
      'question',
      'hint',
      'explanation',
      ...specialized[q.type],
    ]);
    for (const field of groups) {
      if (q.content[field])
        verifyCollection(q.content[field], context + '.' + field, origin, seen, { empty: field !== 'question' });
    }
    if (q.type === 'selectOneAnswer' || q.type === 'selectMultipleAnswers') {
      exactKeys(q.content.answers, answerGroups, context + '.answers');
      for (const field of answerGroups)
        verifyCollection(q.content.answers[field], context + '.answers.' + field, origin, seen, {
          empty: field !== 'correct',
        });
      const correct = q.content.answers.correct.order.length;
      if ((q.type === 'selectOneAnswer' && correct !== 1) || (q.type === 'selectMultipleAnswers' && correct < 1)) {
        throw Error('Incorrect answer cardinality: ' + context);
      }
    } else if (q.type === 'matchBlocks') {
      verifyCollection(q.content.pairs, context + '.pairs', origin, seen, {
        item: (pair, location) => {
          exactKeys(pair, ['left', 'right'], location);
          verifyBlock(pair.left, origin, seen, location + '.left');
          verifyBlock(pair.right, origin, seen, location + '.right');
        },
      });
    } else if (q.type === 'orderSequence') {
      verifyCollection(q.content.sequence, context + '.sequence', origin, seen);
    } else if (q.type === 'buildAnswerWithBlocks') {
      verifyCollection(q.content.correctSequence, context + '.correctSequence', origin, seen);
      verifyCollection(q.content.distractors, context + '.distractors', origin, seen, { empty: true });
    } else if (q.type === 'fillBlanksWithText' || q.type === 'fillBlanksWithBlocks') {
      verifyCollection(q.content.slots, context + '.slots', origin, seen, {
        item: (slot, location) => {
          if (q.type === 'fillBlanksWithBlocks') {
            exactKeys(slot, ['correctAnswer'], location);
            verifyBlock(slot.correctAnswer, origin, seen, location + '.correctAnswer');
          } else {
            exactKeys(slot, ['correctAnswers'], location);
            if (!record(slot.correctAnswers) || !Object.keys(slot.correctAnswers).length) {
              throw Error('Missing slot text answers: ' + location);
            }
            for (const [key, locale] of Object.entries(slot.correctAnswers)) {
              if (!NAME.test(key)) throw Error('Unsafe slot key: ' + location);
              verifyLocalized(locale, origin, location + '.' + key);
            }
          }
        },
      });
      if (q.type === 'fillBlanksWithBlocks') {
        verifyCollection(q.content.distractors, context + '.distractors', origin, seen, { empty: true });
      }
    }
    if (q.type === 'answerWithText') {
      if (!record(q.locale?.correctAnswers) || !Object.keys(q.locale.correctAnswers).length) {
        throw Error('Missing localized correct answers: ' + context);
      }
      for (const [key, locale] of Object.entries(q.locale.correctAnswers)) {
        if (!NAME.test(key)) throw Error('Unsafe correct answer key: ' + context);
        verifyLocalized(locale, origin, context + '.correctAnswers.' + key);
      }
    }
    if (
      q.type === 'answerWithNumber' &&
      (!Array.isArray(q.params?.correctAnswers) ||
        !q.params.correctAnswers.length ||
        q.params.correctAnswers.some(value => typeof value !== 'number' || !Number.isFinite(value)))
    ) {
      throw Error('Invalid numeric answers: ' + context);
    }
    if (
      [
        'answerWithText',
        'answerWithNumber',
        'fillBlanksWithText',
        'fillBlanksWithBlocks',
        'buildAnswerWithBlocks',
      ].includes(q.type)
    ) {
      verifyLocalized(q.locale?.placeholder, origin, context + '.placeholder');
    }
  }
}
function readQuizSections(resolver, lessonRoot, questionIds, seen) {
  const sectionDir = path.join(lessonRoot, 'sections');
  if (!fs.existsSync(sectionDir)) return [];
  validDirectory(sectionDir);
  const result = [];
  for (const dir of fs.readdirSync(sectionDir, { withFileTypes: true })) {
    if (dir.isSymbolicLink()) throw Error('Symlinked Quiz Section: ' + dir.name);
    if (!dir.isDirectory() || !NAME.test(dir.name)) continue;
    const file = path.join(sectionDir, dir.name, 'index.ts');
    if (!fs.existsSync(file)) continue;
    // Inspect only Quiz factories: unrelated Section imports are outside this reference family.
    const preview = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    if (preview.parseDiagnostics.length) throw Error('Invalid TypeScript Section: ' + file);
    const hasQuiz = preview.statements.some(
      stmt =>
        ts.isVariableStatement(stmt) &&
        stmt.declarationList.declarations.some(d => {
          const init = unwrap(d.initializer);
          return (
            init &&
            ts.isCallExpression(init) &&
            ts.isIdentifier(init.expression) &&
            init.expression.text === 'defineQuizSection'
          );
        }),
    );
    if (!hasQuiz) continue;
    const state = resolver.module(file);
    const exportName = [...state.exports].find(name => {
      const init = unwrap(state.bindings.get(name));
      return (
        init &&
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        init.expression.text === 'defineQuizSection'
      );
    });
    if (!exportName) continue;
    const section = resolver.value(state, exportName, true);
    if (section.type !== 'quiz' || section.slug !== dir.name || !UUID.test(section.id ?? '')) {
      throw Error('Invalid Quiz Section ' + dir.name);
    }
    const ids = section.params?.selection?.questionIds;
    if (!Array.isArray(ids) || new Set(ids).size !== ids.length || ids.some(id => !UUID.test(id))) {
      throw Error('Invalid Quiz question selection: ' + dir.name);
    }
    if (!ids.some(id => questionIds.has(id.toLowerCase()))) continue;
    addId(seen, section.id, 'Quiz ' + dir.name);
    if (!record(section.locale?.title) || !record(section.locale?.navigationLabel)) {
      throw Error('Missing localized Quiz labels: ' + dir.name);
    }
    exactKeys(section.content, ['items', 'order'], 'Quiz ' + dir.name + '.content');
    if (
      !record(section.content.items) ||
      !Array.isArray(section.content.order) ||
      section.content.order.length !== Object.keys(section.content.items).length ||
      new Set(section.content.order).size !== section.content.order.length ||
      section.content.order.some(key => !Object.hasOwn(section.content.items, key))
    ) {
      throw Error('Invalid Quiz Section content: ' + dir.name);
    }
    for (const name of section.content.order) {
      const item = section.content.items[name];
      if (
        !item ||
        !['markdown', 'text'].includes(item.type) ||
        item.slug !== name ||
        !UUID.test(item.id ?? '') ||
        !record(item.locale?.value)
      )
        throw Error('Unsupported Quiz ContentBlock: ' + dir.name + '.' + name);
      addId(seen, item.id, 'Quiz ' + dir.name + '.' + name);
    }
    result.push(section);
  }
  return result;
}
function text(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('|', '\\|')
    .replaceAll('\r', '')
    .replaceAll('\n', ' ⏎ ');
}
function link(outputFile, root, source) {
  if (!source || !source.startsWith(root + path.sep)) throw Error('Missing/unsafe canonical source reference');
  const href = path.relative(path.dirname(outputFile), source).split(path.sep).join('/');
  if (!href.startsWith('../')) throw Error('Unsafe generated Markdown link: ' + href);
  return '[' + path.basename(source) + '](' + encodeURI(href) + ')';
}
function emitField(lines, block, label, origin, locale, outputFile, root) {
  const values = block.locale.value;
  const source = values[origin];
  if (typeof source !== 'string' || !source.trim()) throw Error('Missing source locale ' + origin + ': ' + label);
  const value = values[locale];
  const present = typeof value === 'string' && Boolean(value.trim());
  lines.push('#### ' + label + ' (' + block.id + ')');
  lines.push('- ' + (origin === 'en' ? 'English' : 'Source (' + origin + ')') + ': ' + text(source));
  lines.push('- ' + locale + ': ' + (present ? text(value) : '%%MISSING%%'));
  lines.push('- Code: ' + link(outputFile, root, block[sourceOf]));
  if (block.type === 'markdown') {
    const sources = values[markdownOf];
    if (!sources || !sources[origin] || (present && !sources[locale])) {
      throw Error('Missing verified Markdown file sources: ' + label);
    }
    lines.push('- Source Markdown: ' + link(outputFile, root, sources[origin]));
    if (present) lines.push('- ' + locale + ' Markdown: ' + link(outputFile, root, sources[locale]));
    const fence = '~'.repeat(
      Math.max(4, ...[source, value ?? ''].flatMap(v => [...String(v).matchAll(/~+/g)].map(m => m[0].length + 1))),
    );
    lines.push(
      'Source Markdown (' + origin + '):',
      fence,
      source.trimEnd(),
      fence,
      '',
      locale + ' Markdown:',
      fence,
      present ? value.trimEnd() : '%%MISSING%%',
      fence,
    );
  }
  lines.push('');
  return { strings: 1, missing: Number(!present) };
}
function emitLocalized(lines, values, label, id, origin, locale, sourceFile, outputFile, root) {
  const original = values[origin];
  if (typeof original !== 'string' || !original.trim()) throw Error('Missing source Quiz field: ' + label);
  const target = values[locale];
  const present = typeof target === 'string' && Boolean(target.trim());
  lines.push('#### ' + label + ' (' + id + ')');
  lines.push('- Source (' + origin + '): ' + text(original));
  lines.push('- ' + locale + ': ' + (present ? text(target) : '%%MISSING%%'));
  lines.push('- Code: ' + link(outputFile, root, sourceFile));
  lines.push('');
  return { strings: 1, missing: Number(!present) };
}
function sourceLanguage(_resolver, lessonRoot) {
  const file = path.join(lessonRoot, 'constants.ts');
  if (!fs.existsSync(file)) return 'en';
  safePath(lessonRoot, file);
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw Error('Invalid Lesson constants TypeScript: ' + file);
  // An older Playground Lesson exports a dynamic all-language roster under a
  // different name and imports Engine runtime. No code is executed or imported
  // just to determine the original language of its English Question bank.
  const registrations = [];
  for (const stmt of ast.statements) {
    if (!ts.isVariableStatement(stmt) || !stmt.modifiers?.some(x => x.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === 'languages') registrations.push(decl.initializer);
    }
  }
  if (!registrations.length) return 'en';
  if (registrations.length !== 1) throw Error('Duplicate source language declarations: ' + file);
  const value = unwrap(registrations[0]);
  if (!ts.isArrayLiteralExpression(value)) throw Error('Non-static source language declaration: ' + file);
  if (value.elements.length !== 1) return 'en';
  const code = unwrap(value.elements[0]);
  if (!ts.isStringLiteral(code) || !/^[a-z]{2,4}$/.test(code.text)) {
    throw Error('Unsupported source language: ' + file);
  }
  return code.text;
}
function readLessons(root, book, lessonId) {
  if (!BOOK.test(book)) throw Error('Invalid textbook name');
  const base = path.join(root, 'content', book, 'data/lessons');
  validDirectory(base);
  if (lessonId) {
    // UUID scoped mode must not enumerate or parse unrelated Lesson banks.
    if (!UUID.test(lessonId)) throw Error('Invalid Lesson UUID for Question reference');
    const id = lessonId.toLowerCase();
    const bucket = id.slice(-1);
    const bucketDirectory = path.join(base, bucket);
    const lesson = path.join(bucketDirectory, id);
    const questions = path.join(lesson, 'questions');
    validDirectory(bucketDirectory);
    validDirectory(lesson);
    validDirectory(questions);
    return [{ id, bucket, lesson, questions }];
  }
  const results = [];
  for (const bucket of fs.readdirSync(base).sort()) {
    if (!/^[0-9a-f]$/.test(bucket)) continue;
    const dir = path.join(base, bucket);
    if (fs.lstatSync(dir).isSymbolicLink()) throw Error('Symlinked Lesson bucket: ' + dir);
    for (const id of fs.readdirSync(dir).sort()) {
      if (!UUID.test(id) || id.slice(-1) !== bucket || (lessonId && lessonId !== id)) continue;
      const lesson = path.join(dir, id);
      validDirectory(lesson);
      const questions = path.join(lesson, 'questions');
      if (!fs.existsSync(questions)) continue;
      validDirectory(questions);
      results.push({ id, bucket, lesson, questions });
    }
  }
  if (lessonId && !results.length) throw Error('No canonical Question bank for Lesson ' + lessonId);
  return results;
}

export function generateQuestionReviewArtifacts({
  root,
  output,
  manifest,
  saveManifest,
  packageName,
  lessonId = null,
  languages,
}) {
  if (
    !/^content\/[a-z][a-z0-9-]*$/.test(packageName) ||
    !Array.isArray(languages) ||
    !languages.length ||
    languages.some(code => !/^[a-z]{2,4}$/.test(code))
  )
    throw Error('Invalid Question review scope');
  const book = packageName.slice('content/'.length);
  const lessons = readLessons(root, book, lessonId);
  if (!lessons.length) throw Error('No authored Question banks in ' + packageName);
  for (const lesson of lessons) {
    for (const locale of languages) {
      const relative = path.posix.join('questions', book, lesson.bucket, lesson.id, locale + '.md');
      const destination = path.join(output, relative);
      try {
        const resolver = new StaticModules(lesson.lesson);
        const questions = readBank(resolver, lesson.questions);
        const seen = new Map();
        const origin = sourceLanguage(resolver, lesson.lesson);
        verifyQuestions(questions, seen, origin);
        const quiz = readQuizSections(resolver, lesson.lesson, new Set(questions.map(q => q.id.toLowerCase())), seen);

        const lines = [
          '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
          '# Question and Quiz translation reference — ' + book + ' / ' + lesson.id + ' / ' + locale,
          '',
          'Lesson UUID: ' + lesson.id,
          'Source language: ' + origin,
          'Questions: ' + questions.length,
          'Quiz Sections: ' + quiz.length,
          '',
        ];
        let strings = 0,
          missing = 0,
          quizStrings = 0;
        const accumulate = ({ strings: count, missing: gaps }, quizField = false) => {
          strings += count;
          missing += gaps;
          if (quizField) quizStrings += count;
        };

        for (const q of questions) {
          const context = q.type + '/' + q.slug;
          lines.push(
            '## ' + context,
            '',
            '- Question UUID: ' + q.id,
            '- Type: ' + q.type,
            '- Assessment method: ' + text(q.params.assessmentMethod),
            '- Canonical Code: ' + link(destination, root, q[sourceOf]),
            '',
          );
          if (q.content.answers) {
            const answer = q.content.answers.correct;
            lines.push(
              '- Correct options (' +
                answer.order.length +
                '): ' +
                answer.order.map(slug => slug + ' (' + answer.items[slug].id + ')').join(', '),
              '',
            );
          }
          if (q.content.pairs) {
            lines.push('- Matching pairs (ordered): ' + q.content.pairs.order.length, '');
            for (const slug of q.content.pairs.order) {
              const pair = q.content.pairs.items[slug];
              lines.push('- Pair ' + slug + ': ' + pair.left.id + ' → ' + pair.right.id);
            }
            lines.push('');
          }
          if (q.params?.correctAnswers && q.type === 'answerWithNumber') {
            lines.push('- Correct numeric answers: ' + q.params.correctAnswers.join(', '), '');
          }
          // All localized text ContentBlocks and slot answer dictionaries are
          // traversed in their authored order; no unsupported type is skipped.
          const emitNode = (node, label) => {
            if (record(node) && (node.type === 'text' || node.type === 'markdown')) {
              accumulate(emitField(lines, node, label, origin, locale, destination, root));
              return;
            }
            if (record(node) && Object.hasOwn(node, 'items') && Object.hasOwn(node, 'order')) {
              for (const slug of node.order) emitNode(node.items[slug], label + '/' + slug);
              return;
            }
            if (record(node) && typeof node[origin] === 'string') {
              accumulate(emitLocalized(lines, node, label, q.id, origin, locale, q[sourceOf], destination, root));
              return;
            }
            if (record(node)) {
              for (const [key, child] of Object.entries(node)) {
                emitNode(child, label + '/' + key);
              }
              return;
            }
            throw Error('Unsupported Question review field: ' + context + '/' + label);
          };
          // Stable ordering: prompt/hint/explanation before answers or pairs.
          for (const name of groups) {
            if (q.content[name]) emitNode(q.content[name], name);
          }
          for (const [key, value] of Object.entries(q.content)) {
            if (!groups.includes(key)) emitNode(value, key);
          }
          if (q.locale?.placeholder) emitNode(q.locale.placeholder, 'locale/placeholder');
          if (q.locale?.correctAnswers) emitNode(q.locale.correctAnswers, 'locale/correctAnswers');
        }
        for (const section of quiz) {
          lines.push(
            '## Quiz Section / ' + section.slug,
            '',
            '- Section UUID: ' + section.id,
            '- Selected Question UUIDs: ' + section.params.selection.questionIds.join(', '),
            '- Code: ' + link(destination, root, section[sourceOf]),
            '',
          );
          for (const key of ['title', 'navigationLabel']) {
            accumulate(
              emitLocalized(
                lines,
                section.locale[key],
                key,
                section.id,
                origin,
                locale,
                section[sourceOf],
                destination,
                root,
              ),
              true,
            );
          }
          for (const name of section.content.order) {
            const block = section.content.items[name];
            accumulate(emitField(lines, block, 'Quiz content/' + name, origin, locale, destination, root), true);
          }
        }
        lines.splice(
          7,
          0,
          'Localized fields: ' + strings,
          'Question fields: ' + (strings - quizStrings),
          'Quiz fields: ' + quizStrings,
          'Missing translations: ' + missing,
          '',
        );
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, lines.join('\n').trimEnd() + '\n');
        manifest.generated.push({
          kind: 'question',
          textbook: packageName,
          lesson: lesson.bucket + '/' + lesson.id,
          locale,
          path: relative,
          questions: questions.length,
          quizSections: quiz.length,
          questionStrings: strings - quizStrings,
          quizStrings,
          strings,
          missing,
          reviewReady: missing === 0,
        });
        process.stdout.write('Generated ' + relative + '\n');
      } catch (error) {
        const message = String(error.message || error).slice(0, 1500);
        manifest.failures.push({
          kind: 'question',
          textbook: packageName,
          lesson: lesson.bucket + '/' + lesson.id,
          locale,
          error: message,
        });
        process.stderr.write(
          '::warning::Question ' + lesson.id + '/' + locale + ': ' + message.replaceAll('\n', ' ') + '\n',
        );
      }
      saveManifest();
    }
  }
}
