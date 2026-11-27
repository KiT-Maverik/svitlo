import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const requiredLanguages = ['lt', 'lv', 'et', 'be', 'ka', 'kk'] as const;

function collectFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

function property(object: ts.ObjectLiteralExpression, key: string, file: string): ts.Expression {
  const field = object.properties.find(
    entry =>
      ts.isPropertyAssignment(entry) &&
      (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) &&
      entry.name.text === key,
  );
  if (!field || !ts.isPropertyAssignment(field)) throw new Error(file + ': missing ' + key);
  return field.initializer;
}

function objectProperty(object: ts.ObjectLiteralExpression, key: string, file: string): ts.ObjectLiteralExpression {
  const value = property(object, key, file);
  if (!ts.isObjectLiteralExpression(value)) throw new Error(file + ': expected literal object for ' + key);
  return value;
}

function optionalObjectProperty(object: ts.ObjectLiteralExpression, key: string, file: string) {
  const present = object.properties.some(
    entry =>
      ts.isPropertyAssignment(entry) &&
      (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) &&
      entry.name.text === key,
  );
  return present ? objectProperty(object, key, file) : undefined;
}

describe('Math Skills taxonomy locale completeness', () => {
  it('has nonempty localized names and learner descriptions in every authored taxonomy entity', () => {
    const files = collectFiles(join(process.cwd(), 'data/skills')).filter(
      file =>
        file.endsWith('.ts') &&
        !file.endsWith('/review.ts') &&
        !file.endsWith('/_review.ts') &&
        file !== join(process.cwd(), 'data/skills/index.ts'),
    );
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
      const calls = source.statements
        .filter(ts.isVariableStatement)
        .flatMap(statement => statement.declarationList.declarations)
        .map(declaration => declaration.initializer)
        .filter((value): value is ts.CallExpression =>
          !!value && ts.isCallExpression(value) && ts.isIdentifier(value.expression) &&
          ['defineSkillDomain', 'defineSkillGroup', 'defineSkill'].includes(value.expression.text),
        );

      expect(calls, file + ': expected exactly one authored Skill entity').toHaveLength(1);
      const call = calls[0];
      const config = call.arguments[0];
      if (!ts.isObjectLiteralExpression(config)) throw new Error(file + ': Skill config must be a literal object');
      const kind = (call.expression as ts.Identifier).text;
      const fieldName = kind === 'defineSkillDomain' ? 'title' : 'name';
      const name = objectProperty(config, fieldName, file);
      const description = objectProperty(config, 'description', file);
      // The Engine schema requires learner text for Skills, but allows
      // SkillDomain and SkillGroup descriptions to be methodological-only.
      const frontend = kind === 'defineSkill'
        ? objectProperty(description, 'frontend', file)
        : optionalObjectProperty(description, 'frontend', file);
      const dictionaries: [string, ts.ObjectLiteralExpression][] = [[fieldName, name]];
      if (frontend) dictionaries.push(['description.frontend', frontend]);

      for (const language of requiredLanguages) {
        for (const [field, object] of dictionaries) {
          const value = property(object, language, file);
          expect(
            ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value),
            file + ': ' + field + '.' + language + ' must be a string literal',
          ).toBe(true);
          if (!ts.isStringLiteral(value) && !ts.isNoSubstitutionTemplateLiteral(value)) continue;
          expect(value.text.trim(), file + ': empty ' + field + '.' + language).not.toBe('');
          expect(value.text.trim(), file + ': placeholder ' + field + '.' + language).not.toBe('%%MISSING%%');
        }
      }
    }
  });
});
