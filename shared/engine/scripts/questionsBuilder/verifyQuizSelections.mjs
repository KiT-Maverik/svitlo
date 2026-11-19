/**
 * Read-only verification that reviewed Question UUID selections have been
 * materialized in actual modular Quiz Sections. Never edits Lesson-owned TS.
 * Non-literal or custom Section composition needs manual specialist review.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export function property(node, key) {
  if (!node || !ts.isObjectLiteralExpression(node)) return undefined;
  const entry = node.properties.find(
    item =>
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
      item.name.text === key,
  );
  return entry?.initializer;
}

export function literal(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}

export function stringArray(node) {
  if (!node || !ts.isArrayLiteralExpression(node)) return undefined;
  const values = node.elements.map(literal);
  return values.every(value => value !== undefined) ? values : undefined;
}

export function parse(file) {
  if (fs.lstatSync(file).isSymbolicLink()) throw new Error('Refusing symlink: ' + file);
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw new Error('Invalid TypeScript: ' + file);
  return source;
}

function questionSelection(file) {
  const source = parse(file);
  const matches = [];
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const variable of statement.declarationList.declarations) {
      const call = variable.initializer;
      if (!call || !ts.isCallExpression(call)) continue;
      if (!ts.isIdentifier(call.expression) || call.expression.text !== 'defineQuizSection') continue;
      const body = call.arguments[0];
      const params = property(body, 'params');
      const selection = property(params, 'selection');
      matches.push({
        id: literal(property(body, 'id')),
        slug: literal(property(body, 'slug')),
        mode: literal(property(selection, 'mode')),
        questionIds: stringArray(property(selection, 'questionIds')),
        count: property(selection, 'count'),
      });
    }
  }
  if (matches.length !== 1) throw new Error('Expected one literal defineQuizSection in ' + file);
  return matches[0];
}

export function registered(sectionIndex, sectionSlug) {
  const source = parse(sectionIndex);
  const imported = source.statements.some(
    statement => ts.isImportDeclaration(statement) && literal(statement.moduleSpecifier) === './' + sectionSlug,
  );
  if (!imported) return false;
  // The registry's static order is an additional safeguard against an
  // unrendered Section. Dynamic registries need a separate manual review.
  const hasOrder = source.statements.some(
    statement =>
      ts.isVariableStatement(statement) &&
      statement.declarationList.declarations.some(
        item =>
          ts.isIdentifier(item.name) &&
          item.name.text === 'section' &&
          (stringArray(property(item.initializer, 'order')) ?? []).includes(sectionSlug) &&
          (() => {
            const items = property(item.initializer, 'items');
            return (
              !!items &&
              ts.isObjectLiteralExpression(items) &&
              items.properties.some(
                entry =>
                  (ts.isPropertyAssignment(entry) || ts.isShorthandPropertyAssignment(entry)) &&
                  (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) &&
                  entry.name.text === sectionSlug,
              )
            );
          })(),
      ),
  );
  return hasOrder;
}

/** Verify exact IDs but do not claim automatic Skill/Method stratification. */
export function verifyQuizSelections(lessonFolder, selections) {
  const sectionRoot = path.join(lessonFolder, 'sections');
  const sectionIndex = path.join(sectionRoot, 'index.ts');
  const expected = Object.entries(selections);
  if (!expected.length) return { sections: 0, questionIds: 0 };
  if (!fs.existsSync(sectionIndex)) throw new Error('Missing Lesson Section registry: ' + sectionIndex);
  const found = new Map();
  for (const entry of fs.readdirSync(sectionRoot, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('Refusing symlinked Section: ' + entry.name);
    if (!entry.isDirectory()) continue;
    const file = path.join(sectionRoot, entry.name, 'index.ts');
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('defineQuizSection')) continue;
    const parsed = questionSelection(file);
    if (!parsed.id || !parsed.slug || parsed.slug !== entry.name)
      throw new Error('Quiz identity/slug not statically verifiable: ' + file);
    if (found.has(parsed.id)) throw new Error('Duplicate Quiz Section UUID: ' + parsed.id);
    found.set(parsed.id, parsed);
  }
  for (const [id, ids] of expected) {
    const actual = found.get(id);
    if (!actual) throw new Error('Missing Quiz Section for reviewed selection ' + id);
    if (!registered(sectionIndex, actual.slug))
      throw new Error('Quiz Section absent from static Section registry/order: ' + actual.slug);
    if (!['all', 'sample'].includes(actual.mode))
      throw new Error('Missing or invalid Quiz selection mode: ' + actual.slug);
    if (JSON.stringify(actual.questionIds) !== JSON.stringify(ids))
      throw new Error('Quiz selection UUIDs differ from reviewed Question Bank: ' + actual.slug);
    if (actual.mode === 'sample') {
      if (
        !actual.count ||
        !ts.isNumericLiteral(actual.count) ||
        !Number.isInteger(Number(actual.count.text)) ||
        Number(actual.count.text) < 1 ||
        Number(actual.count.text) > ids.length
      )
        throw new Error('Unverifiable Quiz sample count: ' + actual.slug);
    }
  }
  return {
    sections: expected.length,
    questionIds: expected.reduce((sum, [, ids]) => sum + ids.length, 0),
  };
}
