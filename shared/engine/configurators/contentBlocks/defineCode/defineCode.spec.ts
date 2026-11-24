import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, test } from 'node:test';
import { pathToFileURL } from 'node:url';

import { defineCode, readCodeSource } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineCode', () => {
      const config = () => ({
        id,
        slug: 'sample' as const,
        type: 'code' as const,
        params: { language: 'python', codeAsText: 'print(%_%NAME%_%)' },
        locale: { variables: { NAME: { en: "'Ada'", uk: "'Ада'" } } },
      });

      test('reads the source-relative code file without persisting a path in Props', () => {
        const root = mkdtempSync(join(tmpdir(), 'code-file-'));
        try {
          writeFileSync(join(root, 'code.py'), 'print("Світло")\n');
          const moduleUrl = pathToFileURL(join(root, 'index.ts')).href;
          const source = readCodeSource(moduleUrl, 'py');
          assert.equal(source, 'print("Світло")\n');
          const block = defineCode<'sample', ['uk']>({
            ...config(),
            params: { language: 'python', codeAsText: source },
            locale: {},
          });
          assert.equal(block.build.props(scope).base.params.codeAsText, source);
          assert.equal(JSON.stringify(block.build.props(scope)).includes('code.py'), false);
        } finally {
          rmSync(root, { recursive: true, force: true });
        }
      });

      test('Code source reader rejects missing, empty and unsafe paths', () => {
        const root = mkdtempSync(join(tmpdir(), 'code-file-errors-'));
        try {
          const moduleUrl = pathToFileURL(join(root, 'index.ts')).href;
          assert.throws(() => readCodeSource(moduleUrl, '../unsafe'), /Invalid authored Code file extension/);
          assert.throws(() => readCodeSource(moduleUrl, 'py'), /Missing, empty or unreadable Code source/);
          writeFileSync(join(root, 'code.py'), '  \n');
          assert.throws(() => readCodeSource(moduleUrl, 'py'), /Missing, empty or unreadable Code source/);
        } finally {
          rmSync(root, { recursive: true, force: true });
        }
      });

      test('publishes original source and requested replacement values', () => {
        const code = defineCode<'sample', ['en', 'uk']>(config());
        const resource = code.build.props(scope);
        assert.equal(resource.base.params.codeAsText, 'print(%_%NAME%_%)');
        assert.deepEqual(resource.locale, { uk: { locale: { variables: { NAME: "'Ада'" } } } });
        assert.equal(JSON.stringify(resource).includes("'Ada'"), false);
      });

      test('validates placeholder references against the effective overridden template', () => {
        const code = defineCode<'sample', ['en', 'uk']>(config());
        assert.throws(
          () => code.build.overrides({ params: { codeAsText: 'print(%_%UNKNOWN%_%)' } }, scope),
          /Invalid Code overrides/,
        );
        const patch = code.build.overrides({ locale: { variables: { NAME: { uk: "'Оля'" } } } }, scope);
        assert.deepEqual(patch.locale, { uk: { locale: { variables: { NAME: "'Оля'" } } } });
        assert.equal(code.build.props(scope).locale?.uk?.locale.variables?.NAME, "'Ада'");
      });
    });
  });
});
