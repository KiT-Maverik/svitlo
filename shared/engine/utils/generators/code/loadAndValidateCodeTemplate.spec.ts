import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { loadAndValidateCodeTemplate } from './loadAndValidateCodeTemplate.utils';
import type { ContentBlock_Code_Config } from '../../../configurators/contentBlocks/defineCode/defineCode.schemas';

const config: ContentBlock_Code_Config = {
  id: '17d3efaf-d27e-418e-b0d6-e3c635587abd',
  type: 'code',
  slug: 'staticCode',
  params: { language: 'python', fileLocation: 'examples/hello.py' },
  locale: { variables: [{ id: 'USER_NAME', value: 'Maria' }] },
};

test('loads UTF-8 static code and validates its declared replacements', t => {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-code-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, 'examples'));
  const template = 'print("%_%USER_NAME%_%")';
  writeFileSync(path.join(root, 'examples/hello.py'), template, 'utf8');

  assert.equal(loadAndValidateCodeTemplate(config, root), template);

  assert.throws(
    () => loadAndValidateCodeTemplate({ ...config, locale: { variables: [{ id: 'WRONG', value: 'x' }] } }, root),
    /variable "USER_NAME" is not declared/,
  );
});

test('requires a real readable source file even when no variables are configured', t => {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-code-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  assert.throws(
    () => loadAndValidateCodeTemplate({ ...config, locale: {} }, root),
    /Code source file does not exist/,
  );
  mkdirSync(path.join(root, 'examples'));
  assert.throws(
    () => loadAndValidateCodeTemplate({ ...config, locale: {} }, root),
    /does not exist/,
  );
  writeFileSync(path.join(root, 'examples/hello.py'), 'print("Hello!")', 'utf8');
  assert.equal(loadAndValidateCodeTemplate({ ...config, locale: {} }, root), 'print("Hello!")');
});

test('rejects missing variables, malformed syntax and invalid path traversal', t => {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-code-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, 'examples'));

  const filename = path.join(root, 'examples/hello.py');
  writeFileSync(filename, 'print("%_%WRONG%_%")');
  assert.throws(() => loadAndValidateCodeTemplate(config, root), /variable "WRONG" is not declared/);

  writeFileSync(filename, 'print("%_%user_name%_%")');
  assert.throws(() => loadAndValidateCodeTemplate(config, root), /invalid UPPER_SNAKE_CASE/);

  writeFileSync(filename, 'print("%_%USER_NAME")');
  assert.throws(() => loadAndValidateCodeTemplate(config, root), /unmatched/);

  assert.throws(
    () => loadAndValidateCodeTemplate({ ...config, params: { ...config.params, fileLocation: '../outside.py' } }, root),
    /escapes baseDirectory/,
  );
  assert.throws(
    () => loadAndValidateCodeTemplate({ ...config, params: { ...config.params, fileLocation: filename } }, root),
    /must be relative/,
  );
});

test('rejects symlinks resolving outside the base directory', t => {
  const root = mkdtempSync(path.join(tmpdir(), 'svitlo-code-'));
  const external = mkdtempSync(path.join(tmpdir(), 'svitlo-code-external-'));
  t.after(() => {
    rmSync(root, { recursive: true, force: true });
    rmSync(external, { recursive: true, force: true });
  });
  mkdirSync(path.join(root, 'examples'));
  const externalFile = path.join(external, 'hello.py');
  writeFileSync(externalFile, 'print("%_%USER_NAME%_%")');
  symlinkSync(externalFile, path.join(root, 'examples/hello.py'));
  assert.throws(() => loadAndValidateCodeTemplate(config, root), /resolves outside baseDirectory/);
});
