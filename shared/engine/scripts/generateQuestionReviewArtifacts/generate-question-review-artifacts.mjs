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
const factories = new Set(['defineSelectOneAnswer', 'defineText', 'defineQuizSection', 'defineMarkdown']);
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
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) ||
    ts.isNonNullExpression(node))) node = node.expression;
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
        const moduleFile = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory() ? path.join(resolved, 'index.ts') : resolved + '.ts';
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
        throw Error('Re-export is not a canonical authored module: ' + file);
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
    try { return this.literal(initializer, state, name); }
    finally { state.resolving.delete(name); }
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
    if (ts.isArrayLiteralExpression(node)) return node.elements.map((item, i) => this.literal(item, state, context + '.' + i));
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
    // Current flat Playground Quiz selects all bank entries using this one
    // explicit static expression. Model that expression, not arbitrary JS.
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === 'map' && node.arguments.length === 1 &&
        ts.isArrowFunction(node.arguments[0])) {
      const values = node.expression.expression;
      const arrow = node.arguments[0];
      const param = arrow.parameters[0]?.name;
      if (ts.isCallExpression(values) && values.expression.getText(state.ast) === 'Object.values' &&
          values.arguments.length === 1 && arrow.parameters.length === 1 && ts.isIdentifier(param) &&
          ts.isPropertyAccessExpression(arrow.body) && ts.isIdentifier(arrow.body.expression) &&
          arrow.body.expression.text === param.text && arrow.body.name.text === 'id') {
        const registry = this.literal(values.arguments[0], state, context + '.registry');
        if (!record(registry)) throw Error('Invalid static Object.values registry: ' + context);
        return Object.values(registry).map(value => {
          if (!record(value) || !UUID.test(value.id ?? '')) throw Error('Invalid static Question ID: ' + context);
          return value.id;
        });
      }
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
      if (name === 'readMarkdown' && node.arguments.length === 2 &&
          node.arguments[0].getText(state.ast) === 'import.meta.url') {
        const locales = this.literal(node.arguments[1], state, context + '.locales');
        if (!Array.isArray(locales) || !locales.length || new Set(locales).size !== locales.length ||
            locales.some(code => typeof code !== 'string' || !/^[a-z]{2,4}$/.test(code))) {
          throw Error('Invalid readMarkdown locale list: ' + state.file);
        }
        const values = Object.create(null), sources = Object.create(null);
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
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text.startsWith('defineSelect')) {
      throw Error('Unsupported Question type: ' + node.expression.text);
    }
    throw Error('Non-static/unsupported expression at ' + state.file + ':' + context + ' (' + ts.SyntaxKind[node.kind] + ')');
  }
}

function readBank(resolver, directory) {
  const index = resolver.module(path.join(directory, 'index.ts'));
  const candidates = [...index.exports].filter(name => name === 'questions' || name.endsWith('Questions'));
  if (candidates.length !== 1) throw Error('Expected one canonical Question bank export');
  const bank = resolver.value(index, candidates[0], true);
  exactKeys(bank, ['selectOneAnswer'], 'Question bank');
  if (!record(bank.selectOneAnswer)) throw Error('Invalid Question registry');
  const questions = [];
  const names = Object.keys(bank.selectOneAnswer);
  if (!names.length) throw Error('Empty canonical Question registry');
  for (const name of names) {
    if (!NAME.test(name)) throw Error('Unsafe Question slug: ' + name);
    const q = bank.selectOneAnswer[name];
    const modulePath = q?.[sourceOf];
    const flat = path.join(directory, name + '.ts');
    const modular = path.join(directory, 'selectOneAnswer', name, 'index.ts');
    if (modulePath !== flat && modulePath !== modular) throw Error('Noncanonical Question import for ' + name);
    if (!q || q.slug !== name || q.type !== 'selectOneAnswer' || !UUID.test(q.id ?? '') ||
        typeof q.params?.assessmentMethod !== 'string' || !q.params.assessmentMethod.trim()) {
      throw Error('Invalid canonical Question metadata: ' + name);
    }
    questions.push(q);
  }
  // No extra physical canonical entities can be omitted from the registry.
  const flat = fs.readdirSync(directory, { withFileTypes: true }).filter(e => e.name.endsWith('.ts') && e.name !== 'index.ts');
  for (const entry of flat) {
    if (!entry.isFile() || !names.includes(entry.name.slice(0, -3))) throw Error('Unlisted/unsafe Question module: ' + entry.name);
  }
  const types = path.join(directory, 'selectOneAnswer');
  if (fs.existsSync(types)) {
    validDirectory(types);
    for (const entry of fs.readdirSync(types, { withFileTypes: true })) {
      if (!entry.isDirectory() || !names.includes(entry.name) || !fs.existsSync(path.join(types, entry.name, 'index.ts'))) {
        throw Error('Unlisted/unsafe modular Question: ' + entry.name);
      }
    }
  }
  if (flat.length + (fs.existsSync(types) ? fs.readdirSync(types).length : 0) !== questions.length) {
    throw Error('Question index is missing canonical entries or canonical modules disagree');
  }
  return questions;
}
function verifyCollection(group, context, seen, { empty = false } = {}) {
  exactKeys(group, ['items', 'order'], context);
  if (!record(group.items) || !Array.isArray(group.order) || (!empty && !group.order.length) ||
      group.order.some(key => typeof key !== 'string' || !NAME.test(key)) ||
      new Set(group.order).size !== group.order.length || Object.keys(group.items).length !== group.order.length ||
      group.order.some(key => !Object.hasOwn(group.items, key))) {
    throw Error('Invalid ordered Question blocks: ' + context);
  }
  for (const key of group.order) {
    const block = group.items[key];
    if (!block || block.type !== 'text' || block.slug !== key || !UUID.test(block.id ?? '') ||
        !record(block.locale?.value) || typeof block.locale.value.en !== 'string' || !block.locale.value.en.trim()) {
      throw Error('Unsupported/missing English Question Text: ' + context + '.' + key);
    }
    addId(seen, block.id, context + '.' + key);
  }
}
function addId(seen, uuid, context) {
  if (typeof uuid !== 'string' || !UUID.test(uuid)) throw Error('Invalid UUID at ' + context);
  const id = uuid.toLowerCase();
  if (seen.has(id)) throw Error('Duplicate UUID ' + uuid + ' at ' + context + ' (was ' + seen.get(id) + ')');
  seen.set(id, context);
}
function verifyQuestions(questions, seen) {
  for (const q of questions) {
    addId(seen, q.id, 'Question ' + q.slug);
    exactKeys(q.content, ['question', 'explanation', 'answers'], q.slug + '.content',
      ['question', 'hint', 'explanation', 'answers']);
    exactKeys(q.content.answers, answerGroups, q.slug + '.answers');
    for (const key of groups) if (q.content[key]) verifyCollection(q.content[key], q.slug + '.' + key, seen);
    for (const key of answerGroups) verifyCollection(q.content.answers[key], q.slug + '.answers.' + key, seen,
      { empty: key !== 'correct' });
    if (q.content.answers.correct.order.length !== 1 ||
        q.content.answers.distractors.order.length + q.content.answers.incorrect.order.length === 0) {
      throw Error('Invalid select-one-answer choices: ' + q.slug);
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
    const hasQuiz = preview.statements.some(stmt => ts.isVariableStatement(stmt) &&
      stmt.declarationList.declarations.some(d => {
        const init = unwrap(d.initializer);
        return init && ts.isCallExpression(init) && ts.isIdentifier(init.expression) &&
          init.expression.text === 'defineQuizSection';
      }));
    if (!hasQuiz) continue;
    const state = resolver.module(file);
    const exportName = [...state.exports].find(name => {
      const init = unwrap(state.bindings.get(name));
      return init && ts.isCallExpression(init) && ts.isIdentifier(init.expression) &&
        init.expression.text === 'defineQuizSection';
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
    if (!record(section.content.items) || !Array.isArray(section.content.order) ||
        section.content.order.length !== Object.keys(section.content.items).length ||
        new Set(section.content.order).size !== section.content.order.length ||
        section.content.order.some(key => !Object.hasOwn(section.content.items, key))) {
      throw Error('Invalid Quiz Section content: ' + dir.name);
    }
    for (const name of section.content.order) {
      const item = section.content.items[name];
      if (!item || !['markdown', 'text'].includes(item.type) || item.slug !== name || !UUID.test(item.id ?? '') ||
          !record(item.locale?.value)) throw Error('Unsupported Quiz ContentBlock: ' + dir.name + '.' + name);
      addId(seen, item.id, 'Quiz ' + dir.name + '.' + name);
    }
    result.push(section);
  }
  return result;
}
function text(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('|', '\\|').replaceAll('\r', '').replaceAll('\n', ' ⏎ ');
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
    const fence = '~'.repeat(Math.max(4, ...[source, value ?? ''].flatMap(v => [...String(v).matchAll(/~+/g)].map(m => m[0].length + 1))));
    lines.push('Source Markdown (' + origin + '):', fence, source.trimEnd(), fence, '',
      locale + ' Markdown:', fence, present ? value.trimEnd() : '%%MISSING%%', fence);
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
function sourceLanguage(resolver, lessonRoot) {
  const file = path.join(lessonRoot, 'constants.ts');
  if (!fs.existsSync(file)) return 'en';
  const module = resolver.module(file);
  if (!module.exports.has('languages')) return 'en';
  const codes = resolver.value(module, 'languages', true);
  return Array.isArray(codes) && codes.length === 1 && /^[a-z]{2,4}$/.test(codes[0]) ? codes[0] : 'en';
}
function readLessons(root, book, lessonId) {
  if (!BOOK.test(book)) throw Error('Invalid textbook name');
  const base = path.join(root, 'content', book, 'data/lessons');
  validDirectory(base);
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

export function generateQuestionReviewArtifacts({ root, output, manifest, saveManifest, packageName,
  lessonId = null, languages }) {
  if (!/^content\/[a-z][a-z0-9-]*$/.test(packageName) || !Array.isArray(languages) || !languages.length ||
      languages.some(code => !/^[a-z]{2,4}$/.test(code))) throw Error('Invalid Question review scope');
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
        verifyQuestions(questions, seen);
        const quiz = readQuizSections(resolver, lesson.lesson, new Set(questions.map(q => q.id.toLowerCase())), seen);
        const origin = sourceLanguage(resolver, lesson.lesson);
        const lines = [
          '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
          '# Question and Quiz translation reference — ' + book + ' / ' + lesson.id + ' / ' + locale,
          '', 'Lesson UUID: ' + lesson.id, 'Source language: ' + origin,
          'Questions: ' + questions.length, 'Quiz Sections: ' + quiz.length, '',
        ];
        let strings = 0, missing = 0, quizStrings = 0;
        const accumulate = ({ strings: count, missing: gaps }, quizField = false) => {
          strings += count;
          missing += gaps;
          if (quizField) quizStrings += count;
        };
        for (const q of questions) {
          lines.push('## ' + q.slug, '', '- Question UUID: ' + q.id, '- Type: ' + q.type,
            '- Assessment method: ' + text(q.params.assessmentMethod),
            '- Code: ' + link(destination, root, q[sourceOf]), '',
            '- Correct option: ' + q.content.answers.correct.order[0] + ' (' +
            q.content.answers.correct.items[q.content.answers.correct.order[0]].id + ')', '');
          for (const group of groups) {
            if (!q.content[group]) continue;
            lines.push('### ' + group, '');
            for (const name of q.content[group].order) {
              accumulate(emitField(lines, q.content[group].items[name], group + '/' + name,
                origin, locale, destination, root));
            }
          }
          for (const group of answerGroups) {
            lines.push('### answers / ' + group, '');
            for (const name of q.content.answers[group].order) {
              accumulate(emitField(lines, q.content.answers[group].items[name], 'answers/' + group + '/' + name,
                origin, locale, destination, root));
            }
          }
        }
        for (const section of quiz) {
          lines.push('## Quiz Section / ' + section.slug, '', '- Section UUID: ' + section.id,
            '- Selected Question UUIDs: ' + section.params.selection.questionIds.join(', '),
            '- Code: ' + link(destination, root, section[sourceOf]), '');
          for (const key of ['title', 'navigationLabel']) {
            accumulate(emitLocalized(lines, section.locale[key], key, section.id, origin, locale,
              section[sourceOf], destination, root), true);
          }
          for (const name of section.content.order) {
            const block = section.content.items[name];
            accumulate(emitField(lines, block, 'Quiz content/' + name, origin, locale, destination, root), true);
          }
        }
        lines.splice(7, 0, 'Localized fields: ' + strings, 'Question fields: ' + (strings - quizStrings),
          'Quiz fields: ' + quizStrings, 'Missing translations: ' + missing, '');
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, lines.join('\n').trimEnd() + '\n');
        manifest.generated.push({ kind: 'question', textbook: packageName,
          lesson: lesson.bucket + '/' + lesson.id, locale,
          path: '.agent-ci-artifacts/' + relative, questions: questions.length,
          quizSections: quiz.length, questionStrings: strings - quizStrings, quizStrings,
          strings, missing, reviewReady: missing === 0 });
        process.stdout.write('Generated .agent-ci-artifacts/' + relative + '\n');
      } catch (error) {
        const message = String(error.message || error).slice(0, 1500);
        manifest.failures.push({ kind: 'question', textbook: packageName,
          lesson: lesson.bucket + '/' + lesson.id, locale, error: message });
        process.stderr.write('::warning::Question ' + lesson.id + '/' + locale + ': ' + message.replaceAll('\n', ' ') + '\n');
      }
      saveManifest();
    }
  }
}