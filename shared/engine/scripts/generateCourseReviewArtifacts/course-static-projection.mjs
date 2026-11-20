/**
 * Static, non-executing projection of Stage 5 modular Course TypeScript.
 * Standalone Lesson imports remain opaque: Stage 5 can precede Lesson TS production.
 * Supports the exact, literal source form emitted by renderModularCourse.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const safeSlug = /^[a-z][a-zA-Z0-9]*$/;
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const missing = '%%MISSING%%';

function safeFile(file, root) {
  if (!file.startsWith(root + path.sep) ||
      !fs.existsSync(file) || !fs.lstatSync(file).isFile() || fs.lstatSync(file).isSymbolicLink() ||
      !fs.realpathSync(file).startsWith(fs.realpathSync(root) + path.sep))
    throw new Error('Missing or unsafe Course-owned TypeScript: ' + file);
}
function propertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  throw new Error('Computed Course Config keys are not supported in static references');
}

/** Only literal TypeScript expression values are accepted, never arbitrary execution. */
function parseModule(filename, root, languages) {
  safeFile(filename, root);
  const text = fs.readFileSync(filename, 'utf8');
  const ast = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length) throw new Error('Invalid Course TypeScript: ' + filename);
  const variables = new Map();
  const imports = new Map();
  for (const statement of ast.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const source = statement.moduleSpecifier.text;
      if (statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) {
        for (const element of statement.importClause.namedBindings.elements) {
          imports.set(element.name.text, {
            export: element.propertyName?.text ?? element.name.text,
            source,
          });
        }
      }
    }
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.initializer) {
          variables.set(declaration.name.text, declaration.initializer);
        }
      }
    }
  }
  const seen = new Set();
  const evaluate = node => {
    if (!node) throw new Error('Empty Course Config expression');
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) ||
        ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node)) return evaluate(node.expression);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken &&
        ts.isNumericLiteral(node.operand)) return -Number(node.operand.text);
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(evaluate);
    if (ts.isObjectLiteralExpression(node)) {
      const result = Object.create(null);
      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop)) {
          const key = propertyName(prop.name);
          if (['__proto__', 'prototype', 'constructor'].includes(key))
            throw new Error('Unsafe Course source key: ' + key);
          result[key] = evaluate(prop.initializer);
        } else if (ts.isShorthandPropertyAssignment(prop)) {
          result[prop.name.text] = evaluate(prop.name);
        } else throw new Error('Unsupported dynamic Course property in ' + filename);
      }
      return result;
    }
    if (ts.isIdentifier(node)) {
      if (node.text === 'undefined') return undefined;
      if (node.text === 'languages') return languages;
      if (imports.has(node.text)) return { __courseImport: imports.get(node.text) };
      const value = variables.get(node.text);
      if (!value) throw new Error('Unresolved Course expression: ' + node.text);
      if (seen.has(node.text)) throw new Error('Circular Course expression: ' + node.text);
      seen.add(node.text);
      try { return evaluate(value); } finally { seen.delete(node.text); }
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
        /^define[A-Z][A-Za-z0-9_]*$/.test(node.expression.text) &&
        node.arguments.length >= 1) {
      return evaluate(node.arguments[0]);
    }
    throw new Error('Non-literal Course source expression in ' + filename +
      ': ' + node.getText(ast).slice(0, 120));
  };
  const declarations = [...variables].filter(([,value]) => {
    const n = ts.isAsExpression(value) ? value.expression : value;
    return ts.isCallExpression(n) && ts.isIdentifier(n.expression) &&
      ['defineCourse', 'defineModule', 'defineChapter', 'defineEpisode'].includes(n.expression.text);
  });
  if (declarations.length !== 1) throw new Error('Expected one Course-owned configurator in ' + filename);
  const [name, expression] = declarations[0];
  const config = evaluate(expression);
  const kind = expression.expression.text.slice('define'.length).toLowerCase();
  if (config.type !== kind || !UUID.test(config.id) || !safeSlug.test(config.slug))
    throw new Error('Course-owned configurator identity mismatch: ' + name);
  return config;
}

function declaredLanguages(root) {
  const file = path.join(root, 'constants.ts');
  safeFile(file, root);
  const source = fs.readFileSync(file, 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const constants = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(decl => ts.isIdentifier(decl.name) && decl.name.text === 'languages');
  if (!constants) throw new Error('Missing Course languages constant');
  let node = constants.initializer;
  while (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node))) node = node.expression;
  if (!node || !ts.isArrayLiteralExpression(node)) throw new Error('Nonliteral Course languages constant');
  const values = node.elements.map(item => {
    if (!ts.isStringLiteral(item)) throw new Error('Course languages must be literal');
    return item.text;
  });
  if (!values.length || values.length !== new Set(values).size)
    throw new Error('Empty or duplicate Course languages');
  return values;
}

/** Reconstitute only module-owned imports; never follow the #lessonsData specifier. */
export function readModularCourse(item, supportedLanguages) {
  const root = item.directory;
  const declared = declaredLanguages(root);
  // Stage 5 temporarily exposes only the source locale as executable TS, while
  // preserving the planned translation roster in this deterministic generator marker.
  // These languages are eligible for review previews, NOT production publication.
  const constants = fs.readFileSync(path.join(root, 'constants.ts'), 'utf8');
  const marker = constants.match(/\/\/ TODO \(BLOCKER\): Restore the complete language set when translations are ready:\s*\r?\n\s*\/\/ export const languages = (\[[^\n]*\]) as const satisfies SupportedLanguages;/);
  const planned = marker ? JSON.parse(marker[1]) : declared;
  if (!Array.isArray(planned) || !planned.length || new Set(planned).size !== planned.length ||
      declared.some(code => !planned.includes(code)) ||
      planned.some(code => !supportedLanguages.includes(code)))
    throw new Error('Invalid planned Course language roster');
  const coursePrefix = '#coursesData/' + item.id.slice(-1) + '/' + item.id + '/';
  const visit = (file, depth, ids = new Set()) => {
    if (depth > 20) throw new Error('Course hierarchy exceeds depth limit');
    const config = parseModule(file, root, declared);
    if (ids.has(config.id)) throw new Error('Duplicate Course-owned UUID: ' + config.id);
    ids.add(config.id);
    if (depth === 0 && (config.type !== 'course' || config.id !== item.id))
      throw new Error('Root Course identity mismatch');
    if (config.type === 'episode') return config;
    const { items, order } = config.content ?? {};
    if (!record(items) || !Array.isArray(order) ||
        order.length !== Object.keys(items).length || new Set(order).size !== order.length)
      throw new Error('Invalid ordered Course collection: ' + config.id);
    const children = [];
    for (const slug of order) {
      if (!safeSlug.test(slug) || !Object.hasOwn(items, slug) ||
          !record(items[slug]) || !record(items[slug].__courseImport))
        throw new Error('Invalid Course child import: ' + slug);
      const spec = items[slug].__courseImport.source;
      if (spec.startsWith('#lessonsData/')) {
        const match = spec.match(/^#lessonsData\/[0-9a-f]\/([0-9a-f-]{36})(?:\/.*)?$/);
        if (!match || !UUID.test(match[1]) || match[1].slice(-1) !== spec.split('/')[1])
          throw new Error('Unresolvable Lesson UUID reference: ' + spec);
        children.push({ type: 'lesson', id: match[1], slug });
      } else if (spec.startsWith(coursePrefix)) {
        const name = spec.slice(coursePrefix.length);
        if (!/^content\/[a-zA-Z0-9/]+\/index$/.test(name) || name.includes('//'))
          throw new Error('Unsafe Course-owned import: ' + spec);
        const nested = path.join(root, name + '.ts');
        const relative = path.relative(root, nested).split(path.sep);
        if (relative.includes('..') || path.isAbsolute(path.relative(root, nested)))
          throw new Error('Course import escapes own root');
        const child = visit(nested, depth + 1, ids);
        if (child.slug !== slug || !['module', 'chapter', 'episode'].includes(child.type))
          throw new Error('Course child slug/type mismatch: ' + slug);
        children.push(child);
      } else throw new Error('Unexpected external Course child: ' + spec);
    }
    return { ...config, content: children };
  };
  const full = visit(item.entry, 0);
  return {
    id: item.id, type: 'course',
    config: { base: { params: { languages: planned } } },
    project(locale) {
      if (!planned.includes(locale)) throw new Error('Locale not declared or planned by Course');
      let missingCount = 0;
      const localize = input => {
        if (Array.isArray(input)) return input.map(localize);
        if (!record(input)) return input;
        const keys = Object.keys(input);
        if (keys.length && keys.every(key => supportedLanguages.includes(key)) &&
            keys.every(key => typeof input[key] === 'string')) {
          if (Object.hasOwn(input, locale)) return input[locale];
          missingCount++;
          return missing;
        }
        return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, localize(value)]));
      };
      return { course: localize(full), missing: missingCount };
    },
  };
}
