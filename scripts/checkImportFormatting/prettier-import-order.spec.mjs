import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { format, resolveConfig } from 'prettier';

const filename = resolve('scripts/checkImportFormatting/sample.ts');
async function prettier(content) {
  const config = await resolveConfig(filename);
  assert(config, 'repository Prettier configuration must load');
  assert.deepEqual(config.plugins, ['@ianvs/prettier-plugin-sort-imports']);
  return format(content, { ...config, filepath: filename });
}

test('one pinned Prettier plugin sorts Node, external, Svitlo, aliases and relative imports', async () => {
  const input = [
    "import { local } from '../local';",
    "import { alias } from '#app';",
    "import { ui } from '@svitlo/ui-kit';",
    "import { z } from 'zod';",
    "import { readFileSync } from 'node:fs';",
    "export const answer = [readFileSync, z, ui, alias, local];",
  ].join('\n');
  const result = await prettier(input);
  const paths = ['node:fs', 'zod', '@svitlo/ui-kit', '#app', '../local'];
  const positions = paths.map(value => result.indexOf("from '" + value + "'"));
  assert(positions.every(position => position >= 0), 'all imports must be retained: ' + result);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.equal(await prettier(result), result, 'import sorting must be idempotent');
});

test('side-effect imports retain their relative order and act as barriers', async () => {
  const input = [
    "import { local } from './local';",
    "import 'first-side-effect';",
    "import { library } from 'zod';",
    "import 'second-side-effect';",
    "import { shared } from '@svitlo/engine/build';",
    "export const answer = [local, library, shared];",
  ].join('\n');
  const result = await prettier(input);
  assert(result.indexOf("'first-side-effect'") < result.indexOf("'second-side-effect'"));
  assert(result.indexOf("from './local'") < result.indexOf("'first-side-effect'"));
  assert(result.indexOf("'first-side-effect'") < result.indexOf("from 'zod'"));
  assert(result.indexOf("'second-side-effect'") < result.indexOf("from '@svitlo/engine/build'"));
});

test('import sorting applies only to TypeScript, leaving existing JavaScript tooling order intact', async () => {
  const jsFilename = resolve('scripts/checkImportFormatting/sample.mjs');
  const config = await resolveConfig(jsFilename);
  assert(config, 'JavaScript Prettier configuration must load');
  assert.equal(config.plugins?.includes('@ianvs/prettier-plugin-sort-imports') ?? false, false);
  const source = [
    "import { local } from './local';",
    "import { external } from 'node:fs';",
    'export const answer = [local, external];',
  ].join('\n');
  const formatted = await format(source, { ...config, filepath: jsFilename });
  assert(formatted.indexOf("from './local'") < formatted.indexOf("from 'node:fs'"));
});

test('quoteProps as-needed preserves quoted keys only when required', async () => {
  const result = await prettier('export const value = { "safe": 1, "needs-hyphen": 2 };\n');
  assert.match(result, /safe: 1/);
  assert.match(result, /'needs-hyphen': 2/);
});
