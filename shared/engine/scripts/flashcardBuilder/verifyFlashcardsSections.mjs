/** Validate the actual static Lesson Flashcards Section selections without editing authored sources. */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
/**
 * Keep Flashcards-only static Section checks self-contained. The Questions
 * verifier was retired in PR #759; Flashcards retains its existing Stage 5
 * source check without importing deleted Questions tooling.
 */
function property(node, key) {
  if (!node || !ts.isObjectLiteralExpression(node)) return undefined;
  const entry = node.properties.find(
    item =>
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
      item.name.text === key,
  );
  return entry?.initializer;
}

function literal(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}

function stringArray(node) {
  if (!node || !ts.isArrayLiteralExpression(node)) return undefined;
  const values = node.elements.map(literal);
  return values.every(value => value !== undefined) ? values : undefined;
}

function parse(file) {
  if (fs.lstatSync(file).isSymbolicLink()) throw new Error('Refusing symlink: ' + file);
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw new Error('Invalid TypeScript: ' + file);
  return source;
}

function registered(sectionIndex, sectionSlug) {
  const source = parse(sectionIndex);
  const imported = source.statements.some(
    statement => ts.isImportDeclaration(statement) && literal(statement.moduleSpecifier) === './' + sectionSlug,
  );
  if (!imported) return false;
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

/** Parse a single, literal defineFlashcardsSection expression. Dynamic sections require independent review. */
function inspect(file) {
  const source = parse(file);
  const sections = [];
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const call = declaration.initializer;
      if (!call || !ts.isCallExpression(call) || !ts.isIdentifier(call.expression)) continue;
      if (call.expression.text !== 'defineFlashcardsSection') continue;
      const config = call.arguments[0];
      const selection = property(property(config, 'params'), 'selection');
      sections.push({
        id: literal(property(config, 'id')),
        slug: literal(property(config, 'slug')),
        ids: stringArray(property(selection, 'flashcardIds')),
      });
    }
  }
  if (sections.length !== 1) throw new Error('Expected one literal defineFlashcardsSection in ' + file);
  return sections[0];
}

/** The complete bank is independent; having zero embedded Sections is legitimate. */
export function verifyFlashcardsSelections(lessonFolder, bankIds) {
  const root = path.join(lessonFolder, 'sections');
  if (!fs.existsSync(root)) return { sections: 0, selectedCards: 0 };
  if (fs.lstatSync(root).isSymbolicLink()) throw new Error('Refusing symlinked Sections directory');
  const registry = path.join(root, 'index.ts');
  const known = new Set();
  const ids = new Set(bankIds);
  let sectionCount = 0;
  let selectedCards = 0;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('Refusing symlinked Section: ' + entry.name);
    if (!entry.isDirectory()) continue;
    const file = path.join(root, entry.name, 'index.ts');
    if (!fs.existsSync(file)) continue;
    if (fs.lstatSync(file).isSymbolicLink()) throw new Error('Refusing symlinked Section source: ' + file);
    if (!fs.readFileSync(file, 'utf8').includes('defineFlashcardsSection')) continue;
    const section = inspect(file);
    if (!section.id || !section.slug || section.slug !== entry.name)
      throw new Error('Unverifiable Flashcards Section identity/slug: ' + file);
    if (known.has(section.id)) throw new Error('Duplicate Flashcards Section UUID: ' + section.id);
    known.add(section.id);
    if (!section.ids?.length) throw new Error('Missing literal Flashcard selection: ' + section.slug);
    if (new Set(section.ids).size !== section.ids.length)
      throw new Error('Duplicate selected Flashcard UUID in Section: ' + section.slug);
    for (const id of section.ids) {
      if (!ids.has(id)) throw new Error('Selected Flashcard absent from complete bank: ' + id);
    }
    if (!fs.existsSync(registry) || !registered(registry, section.slug))
      throw new Error('Flashcards Section absent from static Lesson registry/order: ' + section.slug);
    sectionCount++;
    selectedCards += section.ids.length;
  }
  return { sections: sectionCount, selectedCards };
}
