/**
 * Read the canonical Engine language-code roster statically from its authoring schema.
 * This build-time helper never executes TypeScript and does not infer supported locales.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');

export function readSupportedLanguageCodes(root = repoRoot) {
  const file = path.join(root, 'shared/engine/schemas/languages.schemas.ts');
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  if (source.parseDiagnostics.length) throw new Error('Invalid canonical Engine language registry');
  let definitions;
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const entry of statement.declarationList.declarations) {
      if (!ts.isIdentifier(entry.name) || entry.name.text !== 'DEFAULT_SUPPORTED_LANGUAGES') continue;
      let node = entry.initializer;
      while (
        node &&
        (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))
      ) {
        node = node.expression;
      }
      if (!node || !ts.isArrayLiteralExpression(node)) throw new Error('Unsupported Engine registry expression');
      definitions = node.elements.map(element => {
        if (!ts.isObjectLiteralExpression(element)) throw new Error('Invalid Engine language entry');
        const language = element.properties.find(
          property =>
            ts.isPropertyAssignment(property) &&
            (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
            property.name.text === 'language',
        );
        if (!language || !ts.isStringLiteral(language.initializer)) throw new Error('Missing language code');
        return language.initializer.text;
      });
    }
  }
  if (
    !definitions?.length ||
    definitions.some(value => !/^[a-z]{2,3}$/.test(value)) ||
    new Set(definitions).size !== definitions.length
  ) {
    throw new Error('Invalid Engine language registry');
  }
  return definitions;
}
