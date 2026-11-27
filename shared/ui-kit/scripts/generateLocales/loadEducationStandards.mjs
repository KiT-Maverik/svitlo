/**
 * Read UI Kit's build-time EducationStandard definitions without publishing authored JS.
 * Each immutable definition is compiled in memory from its own TypeScript source.
 */
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Module } from 'node:module';
import ts from 'typescript';

const repositoryRoot = fileURLToPath(new URL('../../../../', import.meta.url));

export function loadEducationStandards(root = repositoryRoot) {
  const directory = join(root, 'shared/ui-kit/data/definitions/educationStandards/data');
  const definitions = [];
  for (const country of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!country.isDirectory() || country.isSymbolicLink()) continue;
    const countryDir = join(directory, country.name);
    if (lstatSync(countryDir).isSymbolicLink()) throw new Error('Unsafe EducationStandard directory: ' + country.name);
    for (const file of readdirSync(countryDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (!file.name.endsWith('.data.ts')) continue;
      if (!file.isFile() || file.isSymbolicLink()) throw new Error('Unsafe EducationStandard file: ' + file.name);
      const slug = file.name.slice(0, -'.data.ts'.length);
      const filepath = join(countryDir, file.name);
      const javascript = ts.transpileModule(readFileSync(filepath, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      }).outputText;
      const compiled = new Module(filepath);
      compiled.filename = filepath;
      compiled.paths = Module._nodeModulePaths(dirname(filepath));
      compiled._compile(javascript, filepath);
      const definition = compiled.exports[slug];
      if (
        Object.keys(compiled.exports).length !== 1 ||
        definition?.slug !== slug ||
        definition.type !== 'educationStandard' ||
        typeof definition.build?.data !== 'function'
      ) {
        throw new Error('Invalid EducationStandard declaration: ' + filepath);
      }
      definitions.push(definition);
    }
  }
  if (!definitions.length) throw new Error('Empty EducationStandard catalog');
  return definitions;
}
