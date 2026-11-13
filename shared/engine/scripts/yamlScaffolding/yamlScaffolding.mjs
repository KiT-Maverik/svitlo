/**
 * Shared build-time helpers for YAML -> TypeScript draft scaffolders.
 * Nothing here validates authoring configs or publishes Props.
 */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const registryPath = fileURLToPath(new URL('../../configurators/yaml/yamlFactoryByType.ts', import.meta.url));
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

/** Read the canonical, literal Engine factory registry without importing its TS source. */
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
    ) throw new Error('yamlFactoryByType must use literal type-to-factory entries');
    factories[entry.name.text] = entry.initializer.text;
  }
  if (factories.lesson !== 'defineLesson' || factories.course !== 'defineCourse')
    throw new Error('Engine factory registry must contain Lesson and Course');
  return factories;
}

/** Restrict a *known localized dictionary* to the explicitly authored language. */
function sourceDictionary(value, language) {
  if (Array.isArray(value)) return value.map(item => sourceDictionary(item, language));
  if (!isRecord(value)) return value;
  const entries = Object.entries(value);
  if (entries.length && entries.every(([key]) => /^[a-z]{2}(?:-[A-Z]{2})?$/.test(key)))
    return Object.hasOwn(value, language) ? { [language]: sourceDictionary(value[language], language) } : {};
  return Object.fromEntries(entries.map(([key, child]) => [key, sourceDictionary(child, language)]));
}

/**
 * Copy actual authoring data; prune only locale dictionaries and localized
 * Flashcard flag values. Identifiers, params.languages, and ordinary `type`
 * fields must remain untouched. Does not add translations or defaults.
 */
export function sourceAuthoringCopy(value, language) {
  if (!language) return value;
  if (Array.isArray(value)) return value.map(item => sourceAuthoringCopy(item, language));
  if (!isRecord(value)) return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => {
    if (key === 'locale') return [key, sourceDictionary(child, language)];
    if (key === 'value' && ['acronym', 'custom'].includes(value.type))
      return [key, sourceDictionary(child, language)];
    return [key, sourceAuthoringCopy(child, language)];
  }));
}
