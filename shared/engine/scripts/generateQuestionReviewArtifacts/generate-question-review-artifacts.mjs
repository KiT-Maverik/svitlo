/**
 * Read-only Question Code → localized Markdown for independent translation review.
 * Statically parses canonical select-one-answer banks; never executes authored TS.
 * Unsupported block types/shapes fail explicitly instead of silently omitting copy.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const NAME = /^[A-Za-z][A-Za-z0-9]*$/;
const BOOK = /^[a-z][a-z0-9-]*$/;
const orderGroups = ['question', 'hint', 'explanation'];
const answerGroups = ['correct', 'distractors', 'incorrect'];

function requireDirectory(folder) {
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory() || fs.lstatSync(folder).isSymbolicLink()) {
    throw new Error('Missing or unsafe Question directory: ' + folder);
  }
}
function parseFile(filename) {
  if (fs.lstatSync(filename).isSymbolicLink()) throw new Error('Symlinked Question source: ' + filename);
  const ast = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error('Invalid TypeScript Question source: ' + filename);
  return ast;
}
function unwrap(node) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node))) {
    node = node.expression;
  }
  return node;
}
function literal(node, context) {
  node = unwrap(node);
  if (!node) throw new Error('Missing Question value: ' + context);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((entry, i) => literal(entry, context + '.' + i));
  if (ts.isObjectLiteralExpression(node)) {
    const result = Object.create(null);
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) throw new Error('Non-static Question property: ' + context);
      const name = property.name;
      if (!ts.isIdentifier(name) && !ts.isStringLiteral(name)) throw new Error('Computed Question key: ' + context);
      if (Object.hasOwn(result, name.text)) throw new Error('Duplicate Question field: ' + context + '.' + name.text);
      result[name.text] = literal(property.initializer, context + '.' + name.text);
    }
    return result;
  }
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.arguments.length === 1 &&
      (node.expression.text === 'defineSelectOneAnswer' || node.expression.text === 'defineText')) {
    return literal(node.arguments[0], context);
  }
  throw new Error('Non-static/unsupported Question expression at ' + context + ': ' + ts.SyntaxKind[node.kind]);
}
function exactKeys(object, required, context, allowed = required) {
  if (!object || typeof object !== 'object' || Array.isArray(object)) throw new Error('Expected record at ' + context);
  const unknown = Object.keys(object).filter(k => !allowed.includes(k));
  const missing = required.filter(k => !Object.hasOwn(object, k));
  if (unknown.length || missing.length) {
    throw new Error('Invalid ' + context + ': missing [' + missing.join(',') + '], unexpected [' + unknown.join(',') + ']');
  }
}
function readBankIndex(directory) {
  const ast = parseFile(path.join(directory, 'index.ts'));
  const imported = new Map();
  const listed = [];
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement)) {
      if (!ts.isStringLiteral(statement.moduleSpecifier) || !/^\.\/[A-Za-z][A-Za-z0-9]*$/.test(statement.moduleSpecifier.text)) {
        throw new Error('Non-local Question import');
      }
      const name = statement.moduleSpecifier.text.slice(2);
      const elements = statement.importClause?.namedBindings;
      if (!elements || !ts.isNamedImports(elements) || elements.elements.length !== 1 ||
          elements.elements[0].name.text !== name || elements.elements[0].propertyName) {
        throw new Error('Unexpected Question import: ' + name);
      }
      if (imported.has(name)) throw new Error('Duplicate Question import: ' + name);
      imported.set(name, true);
    } else if (ts.isVariableStatement(statement)) {
      for (const d of statement.declarationList.declarations) {
        if (!ts.isIdentifier(d.name) || !d.name.text.endsWith('Questions')) continue;
        const config = unwrap(d.initializer);
        if (!ts.isObjectLiteralExpression(config) || listed.length) throw new Error('Ambiguous Question bank');
        exactKeys(Object.fromEntries(config.properties.map(p => {
          if (!ts.isPropertyAssignment(p) || !ts.isIdentifier(p.name)) throw new Error('Invalid Question kind');
          return [p.name.text, p.initializer];
        })), ['selectOneAnswer'], 'Question bank kind');
        const entries = unwrap(config.properties[0].initializer);
        if (!ts.isObjectLiteralExpression(entries)) throw new Error('Invalid Question bank items');
        for (const entry of entries.properties) {
          if (!ts.isShorthandPropertyAssignment(entry) || !NAME.test(entry.name.text)) {
            throw new Error('Question bank must list canonical shorthand imports');
          }
          if (listed.includes(entry.name.text)) throw new Error('Repeated Question: ' + entry.name.text);
          listed.push(entry.name.text);
        }
      }
    }
  }
  if (!listed.length || listed.length !== imported.size || listed.some(name => !imported.has(name))) {
    throw new Error('Question index is missing canonical entries or imports: ' + directory);
  }
  const realFiles = fs.readdirSync(directory).filter(file => file.endsWith('.ts') && file !== 'index.ts');
  if (realFiles.length !== listed.length || realFiles.some(file => !listed.includes(file.slice(0, -3)))) {
    throw new Error('Question index and canonical Question files disagree');
  }
  return listed;
}
function loadQuestion(directory, name) {
  const filename = path.join(directory, name + '.ts');
  const ast = parseFile(filename);
  let config;
  for (const stmt of ast.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const d of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(d.name) || d.name.text !== name) continue;
      if (config !== undefined) throw new Error('Duplicate Question export: ' + name);
      const call = unwrap(d.initializer);
      if (!ts.isCallExpression(call) || !ts.isIdentifier(call.expression) ||
          call.expression.text !== 'defineSelectOneAnswer' || call.arguments.length !== 1) {
        throw new Error('Unsupported Question type for ' + name);
      }
      config = literal(call.arguments[0], name);
    }
  }
  if (!config || config.slug !== name || config.type !== 'selectOneAnswer' ||
      typeof config.id !== 'string' || !UUID.test(config.id) ||
      typeof config.params?.assessmentMethod !== 'string') {
    throw new Error('Invalid canonical Question metadata: ' + name);
  }
  exactKeys(config.content, ['question','explanation','answers'], name + '.content',
    ['question','hint','explanation','answers']);
  exactKeys(config.content.answers, answerGroups, name + '.answers');
  for (const group of orderGroups) {
    if (config.content[group]) verifyCollection(config.content[group], name + '.' + group);
  }
  for (const group of answerGroups) verifyCollection(config.content.answers[group], name + '.answers.' + group);
  if (config.content.answers.correct.order.length !== 1) throw new Error('Exactly one correct answer required: ' + name);
  return { ...config, source: filename };
}
function verifyCollection(group, context) {
  exactKeys(group, ['items','order'], context);
  if (!Array.isArray(group.order) || !group.order.length || new Set(group.order).size !== group.order.length ||
      Object.keys(group.items).length !== group.order.length || group.order.some(key => !Object.hasOwn(group.items, key))) {
    throw new Error('Invalid ordered Question blocks: ' + context);
  }
  for (const key of group.order) {
    const block = group.items[key];
    if (block.type !== 'text' || !UUID.test(block.id ?? '') || block.slug !== key || !block.locale?.value ||
        typeof block.locale.value.en !== 'string' || !block.locale.value.en.trim()) {
      throw new Error('Unsupported or missing English Question Text block: ' + context + '.' + key);
    }
  }
}
function safeText(s) {
  // Keep the value readable without interpreting authored Markdown/HTML as instructions.
  return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('|', '\\|').replaceAll('\r', '').replaceAll('\n', ' ⏎ ');
}
function entries(group, label, locale, outputLines) {
  let missing = 0, strings = 0;
  for (const key of group.order) {
    const block = group.items[key];
    const original = block.locale.value.en;
    const localized = block.locale.value[locale];
    const valid = typeof localized === 'string' && Boolean(localized.trim());
    if (!valid) missing++;
    strings++;
    outputLines.push('#### ' + label + ' / ' + key + ' (' + block.id + ')');
    outputLines.push('- English: ' + safeText(original));
    outputLines.push('- ' + locale + ': ' + (valid ? safeText(localized) : '%%MISSING%%'));
    outputLines.push('');
  }
  return { missing, strings };
}
function readLessons(root, book, lessonId) {
  if (!BOOK.test(book)) throw new Error('Invalid textbook name');
  const lessonsRoot = path.join(root, 'content', book, 'data/lessons');
  requireDirectory(lessonsRoot);
  const results = [];
  for (const bucket of fs.readdirSync(lessonsRoot).sort()) {
    if (!/^[0-9a-f]$/.test(bucket)) continue;
    const bDir = path.join(lessonsRoot, bucket);
    if (fs.lstatSync(bDir).isSymbolicLink()) continue;
    for (const id of fs.readdirSync(bDir).sort()) {
      if (!UUID.test(id) || id.slice(-1) !== bucket || (lessonId && id !== lessonId)) continue;
      const parent = path.join(bDir, id);
      if (fs.lstatSync(parent).isSymbolicLink()) continue;
      const questions = path.join(parent, 'questions');
      if (!fs.existsSync(questions)) continue;
      requireDirectory(questions);
      results.push({ id, bucket, questions });
    }
  }
  if (lessonId && !results.length) throw new Error('No canonical Question bank for Lesson ' + lessonId);
  return results;
}
export function generateQuestionReviewArtifacts({ root, output, manifest, saveManifest,
  packageName, lessonId = null, languages }) {
  if (!/^content\/[a-z][a-z0-9-]*$/.test(packageName) || !Array.isArray(languages) || !languages.length ||
      languages.some(code => !/^[a-z]{2,4}$/.test(code))) throw new Error('Invalid Question review scope');
  const book = packageName.slice('content/'.length);
  const lessons = readLessons(root, book, lessonId);
  if (!lessons.length) throw new Error('No authored Question banks in ' + packageName);
  for (const lesson of lessons) {
    for (const locale of languages) {
      try {
        const order = readBankIndex(lesson.questions);
        const questions = order.map(name => loadQuestion(lesson.questions, name));
        const unique = new Set(questions.map(q => q.id.toLowerCase()));
        if (unique.size !== questions.length) throw new Error('Duplicate Question UUIDs in bank');
        let missing = 0, strings = 0;
        const result = [
          '<!-- GENERATED FROM CODE; DO NOT EDIT. -->',
          '# Question translation reference — ' + book + ' / ' + lesson.id + ' / ' + locale,
          '',
          'Lesson UUID: ' + lesson.id, '',
          'Questions: ' + questions.length, '',
        ];
        for (const q of questions) {
          const relPath = path.posix.join('content', book, 'data/lessons', lesson.bucket, lesson.id, 'questions', q.slug + '.ts');
          const dest = path.join(output, 'questions', book, lesson.bucket, lesson.id, locale + '.md');
          const href = path.relative(path.dirname(dest), path.join(root, relPath)).split(path.sep).join('/');
          if (!href.startsWith('../')) throw new Error('Unsafe canonical Question link');
          result.push('## ' + q.slug, '');
          result.push('- Question UUID: ' + q.id);
          result.push('- Type: ' + q.type);
          result.push('- Assessment method: ' + safeText(q.params.assessmentMethod));
          result.push('- Canonical Code: [' + q.slug + '.ts](' + encodeURI(href) + ')', '');
          for (const key of orderGroups) {
            if (!q.content[key]) continue;
            result.push('### ' + key, '');
            const values = entries(q.content[key], key, locale, result);
            missing += values.missing; strings += values.strings;
          }
          for (const key of answerGroups) {
            result.push('### answers / ' + key, '');
            const values = entries(q.content.answers[key], 'answers.' + key, locale, result);
            missing += values.missing; strings += values.strings;
          }
        }
        result.splice(5, 0, 'Localized text fields: ' + strings, 'Missing translations: ' + missing, '');
        const relative = path.posix.join('questions', book, lesson.bucket, lesson.id, locale + '.md');
        const destination = path.join(output, relative);
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, result.join('\n').trimEnd() + '\n');
        manifest.generated.push({
          kind: 'question', textbook: packageName, lesson: lesson.bucket + '/' + lesson.id, locale,
          path: '.agent-ci-artifacts/' + relative, questions: questions.length, strings, missing,
          reviewReady: missing === 0,
        });
        process.stdout.write('Generated .agent-ci-artifacts/' + relative + '\n');
      } catch (error) {
        const message = String(error.message || error).slice(0, 1500);
        manifest.failures.push({
          kind: 'question', textbook: packageName, lesson: lesson.bucket + '/' + lesson.id, locale, error: message,
        });
        process.stderr.write('::warning::Question ' + lesson.id + '/' + locale + ': ' + message.replaceAll('\n', ' ') + '\n');
      }
      saveManifest();
    }
  }
}
