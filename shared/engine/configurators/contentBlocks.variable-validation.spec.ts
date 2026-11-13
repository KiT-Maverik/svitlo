import { describe } from 'node:test';
import assert from 'node:assert/strict';
import test from 'node:test';

import { code_Config_Schema, code_Props_Schema, defineCode, defineText } from './contentBlocks';
import type { ContentBlock_Code_Config } from './contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Text_Config } from './contentBlocks/defineText/defineText.schemas';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('variable validation', () => {
      const textConfig = {
        id: 'd20cb256-3a15-4ae2-924e-3f2d01ee937b',
        type: 'text',
        slug: 'exampleText' as const,
        params: { variables: { personName: { applyStyle: ['variable'] } } },
        locale: {
          value: {
            en: 'Hi %_%id: personName; value: Maria%_%!',
            uk: 'Привіт, %_%id: personName; value: Марія%_%!',
          },
        },
      } satisfies ContentBlock_Text_Config;

      const codeConfig = {
        id: '69d1e14d-4238-4d52-a99c-c19094903e40',
        type: 'code',
        slug: 'exampleCode' as const,
        params: { language: 'typescript', codeAsText: 'const user = "%_%USER_NAME%_%";' },
        locale: { variables: { USER_NAME: { en: 'Maria' } } },
      } satisfies ContentBlock_Code_Config;

      test('Text validates all declared variable IDs in every provided locale', () => {
        const text = defineText<'exampleText', ['en', 'uk']>(textConfig);
        assert.doesNotThrow(() => text.config.validate(textConfig));
        assert.doesNotThrow(() =>
          text.config.validate({
            ...textConfig,
            locale: { value: 'Hi %_%id: personName; value: Maria%_% and %_%id: personName; value: Jane%_%' },
          }),
        );
        assert.throws(
          () =>
            text.config.validate({
              ...textConfig,
              locale: { value: { en: 'Hi %_%id: personName; value: Maria%_%!', uk: 'Привіт!' } },
            }),
          /locale\.value\.uk: missing configured Text fragment "personName"/,
        );
      });

      test('Text rejects undeclared and missing variable identifiers', () => {
        const text = defineText<'exampleText', ['en', 'uk']>(textConfig);
        assert.throws(
          () =>
            text.config.validate({
              ...textConfig,
              locale: { value: 'Hi %_%id: otherName; value: Jane%_%' },
            }),
          /Text fragment "otherName" is not declared/,
        );
        assert.throws(
          () => text.config.validate({ ...textConfig, locale: { value: 'No marked fragments.' } }),
          /missing configured Text fragment "personName"/,
        );
      });

      test('Text variable names must be camelCase object keys', () => {
        const text = defineText<'exampleText', ['en', 'uk']>(textConfig);
        assert.doesNotThrow(() => text.config.validate(textConfig));
        assert.throws(
          () =>
            text.config.validate({
              ...textConfig,
              params: { variables: { PERSON_NAME: { applyStyle: ['variable'] } } },
            }),
          /Invalid|invalid|regular expression/i,
        );
      });

      test('Text rejects malformed marker syntax, empty values and non-camelCase IDs', () => {
        const text = defineText<'exampleText', ['en', 'uk']>(textConfig);
        for (const source of [
          'Hi %_%id: PERSON_NAME; value: Maria%_%',
          'Hi %_%id: person_name; value: Maria%_%',
          'Hi %_%id: personName%_%',
          'Hi %_%value: Maria%_%',
          'Hi %_%id: personName; value: %_%',
          'Hi %_%id: personName; value: Maria',
        ]) {
          assert.throws(
            () => text.config.validate({ ...textConfig, locale: { value: source } }),
            /Text variables validation failed/,
            source,
          );
        }
      });

      test('Text rejects malformed or undeclared fragments even without configured variables', () => {
        assert.throws(() =>
          defineText({
            id: textConfig.id,
            slug: 'plainText',
            type: 'text',
            params: {},
            locale: { value: 'Literal %_%id: notValid' },
          }),
        );
      });

      test('Code validates declared IDs and checks source when resolved text is provided', () => {
        const code = defineCode<'exampleCode', ['en']>(codeConfig);
        assert.doesNotThrow(() => code.config.validate(codeConfig));
        assert.doesNotThrow(() =>
          code.config.validate({
            ...codeConfig,
            params: { ...codeConfig.params, codeAsText: 'const a = "%_%USER_NAME%_%"; const b = "%_%USER_NAME%_%";' },
          }),
        );
        assert.throws(
          () =>
            code.config.validate({
              ...codeConfig,
              params: { ...codeConfig.params, codeAsText: 'const a = "%_%EXTRA%_%";' },
            }),
          /variable "EXTRA" is not declared in locale\.variables/,
        );
        assert.throws(
          () =>
            code.config.validate({
              ...codeConfig,
              params: { ...codeConfig.params, codeAsText: 'console.log("missing");' },
            }),
          /missing configured variable "USER_NAME"/,
        );
      });

      test('Code rejects invalid variable keys and malformed source markers', () => {
        const code = defineCode<'exampleCode', ['en']>(codeConfig);
        assert.equal(
          code_Config_Schema.safeParse({ ...codeConfig, locale: { variables: { user_name: 'Maria' } } }).success,
          false,
        );
        assert.equal(
          code_Config_Schema.safeParse({ ...codeConfig, locale: { variables: { GREETING: 123 } } }).success,
          false,
        );
        for (const source of ['%_%user_name%_%', '%_%USER_NAME', '%_%id: personName; value: Maria%_%']) {
          assert.throws(
            () => code.config.validate({ ...codeConfig, params: { ...codeConfig.params, codeAsText: source } }),
            /Code variables validation failed/,
            source,
          );
        }
      });

      test('Code projects localized values by variable key and validates resolved props', () => {
        const config = {
          ...codeConfig,
          params: { ...codeConfig.params, codeAsText: 'const name = "%_%USER_NAME%_%"; const suffix = "%_%FIXED%_%";' },
          locale: { variables: { USER_NAME: { en: 'Maria', uk: 'Марія' }, FIXED: '!' } },
        } satisfies ContentBlock_Code_Config;
        const code = defineCode<'exampleCode', ['en', 'uk']>(config);
        assert.deepEqual(code.config.base.locale, { variables: { FIXED: '!' } });
        assert.deepEqual(code.config.locales(), {
          locale: { variables: { USER_NAME: { en: 'Maria', uk: 'Марія' } } },
        });
        assert.equal(
          code_Props_Schema.safeParse({
            ...config,
            locale: { variables: { USER_NAME: 'Марія', FIXED: '!' } },
          }).success,
          true,
        );
        assert.equal(code_Props_Schema.safeParse(config).success, false);
      });

      test('Code checks placeholder integrity even without configured variables', () => {
        const config = {
          ...codeConfig,
          params: { ...codeConfig.params, codeAsText: 'const a = 1;' },
          locale: {},
        } satisfies ContentBlock_Code_Config;
        const code = defineCode<'exampleCode', ['en']>(config);
        assert.throws(() => code.config.validate({ ...config, params: { ...config.params, codeAsText: '%_%BROKEN' } }));
        assert.throws(
          () => code.config.validate({ ...config, params: { ...config.params, codeAsText: '%_%UNKNOWN%_%' } }),
          /not declared/,
        );
      });

      test('Code validates static source text during definition', () => {
        assert.throws(
          () =>
            defineCode<'exampleCode', ['en']>({
              ...codeConfig,
              params: { ...codeConfig.params, codeAsText: '%_%UNDECLARED%_%' },
            }),
          /variable "UNDECLARED" is not declared/,
        );
        assert.throws(
          () => defineCode<'exampleCode', ['en']>({ ...codeConfig, params: { ...codeConfig.params, codeAsText: '' } }),
          /Too small|expected string|String must contain/i,
        );
        assert.doesNotThrow(() => defineCode<'exampleCode', ['en']>(codeConfig));
      });
    });
  });
});
