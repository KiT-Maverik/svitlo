/**
 * Read the canonical build-time Engine YAML factory registry without requiring
 * an already-compiled Engine. Both draft scaffolders use the same mapping.
 *
 * This is only type-to-factory dispatch, not input schema validation.
 */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const registryPath = fileURLToPath(new URL('../../configurators/yaml/yamlFactoryByType.ts', import.meta.url));

export function loadFactoryRegistry(filename = registryPath) {
  const source = fs.readFileSync(filename, 'utf8');
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = ast.statements
    .filter(ts.isVariableStatement)
    .flatMap(statement => [...statement.declarationList.declarations])
    .find(item => ts.isIdentifier(item.name) && item.name.text === 'yamlFactoryByType');
  if (!declaration?.initializer) throw new Error('Missing Engine yamlFactoryByType registry: ' + filename);
  let expression = declaration.initializer;
  while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression)) expression = expression.expression;
  if (!ts.isObjectLiteralExpression(expression)) throw new Error('Expected a literal yamlFactoryByType registry');
  const factories = Object.create(null);
  for (const entry of expression.properties) {
    if (
      !ts.isPropertyAssignment(entry) ||
      !(ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) ||
      !ts.isStringLiteral(entry.initializer)
    ) {
      throw new Error('yamlFactoryByType must use literal type-to-factory entries');
    }
    factories[entry.name.text] = entry.initializer.text;
  }
  if (factories.lesson !== 'defineLesson' || factories.course !== 'defineCourse') {
    throw new Error('Engine factory registry must expose defineLesson and defineCourse');
  }
  return factories;
}
