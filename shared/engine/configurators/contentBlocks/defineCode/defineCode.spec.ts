import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineCode } from './index';

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
