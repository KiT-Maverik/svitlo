import assert from 'node:assert/strict';
import test from 'node:test';

import { defineCode, defineText } from './contentBlocks';
import type { ContentBlock_Code_Config } from './contentBlocks/defineCode/defineCode.schemas';
import type { ContentBlock_Text_Config } from './contentBlocks/defineText/defineText.schemas';

const textConfig: ContentBlock_Text_Config = {
  id: 'd20cb256-3a15-4ae2-924e-3f2d01ee937b',
  type: 'text',
  slug: 'exampleText',
  params: { styling: [{ id: 'personName', applyStyle: ['variable'] }] },
  locale: {
    value: {
      en: 'Hi %_%id: personName; value: Maria%_%!',
      uk: 'Привіт, %_%id: personName; value: Марія%_%!',
    },
  },
};

const codeConfig: ContentBlock_Code_Config = {
  id: '69d1e14d-4238-4d52-a99c-c19094903e40',
  type: 'code',
  slug: 'exampleCode',
  params: { language: 'typescript', fileLocation: 'templates/example.ts' },
  locale: { variables: [{ id: 'USER_NAME', value: { en: 'Maria' } }] },
};

test('Text validates all declared styling IDs in every provided locale', () => {
  const text = defineText(textConfig);
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

test('Text rejects undeclared, duplicate and missing styling identifiers', () => {
  const text = defineText(textConfig);
  assert.throws(
    () =>
      text.config.validate({
        ...textConfig,
        locale: { value: 'Hi %_%id: otherName; value: Jane%_%' },
      }),
    /Text fragment "otherName" is not declared/,
  );
  assert.throws(
    () =>
      text.config.validate({ ...textConfig, locale: { value: 'No marked fragments.' } }),
    /missing configured Text fragment "personName"/,
  );
  assert.throws(
    () =>
      text.config.validate({
        ...textConfig,
        params: {
          styling: [
            { id: 'personName', applyStyle: ['variable'] },
            { id: 'personName', applyStyle: ['bold'] },
          ],
        },
      }),
    /Duplicate Text styling ID "personName"/,
  );
});

test('Text rejects malformed marker syntax, empty values and non-camelCase IDs', () => {
  const text = defineText(textConfig);
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

test('Text skips fragment integrity checks when no styling is configured', () => {
  assert.doesNotThrow(() =>
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
  const code = defineCode(codeConfig);
  assert.doesNotThrow(() => code.config.validate(codeConfig));
  assert.doesNotThrow(() =>
    code.config.validate(codeConfig, 'const a = "%_%USER_NAME%_%"; const b = "%_%USER_NAME%_%";'),
  );
  assert.throws(
    () => code.config.validate(codeConfig, 'const a = "%_%EXTRA%_%";'),
    /variable "EXTRA" is not declared in locale\.variables/,
  );
  assert.throws(
    () => code.config.validate(codeConfig, 'console.log("missing");'),
    /missing configured variable "USER_NAME"/,
  );
});

test('Code rejects duplicate declared IDs and malformed source markers', () => {
  const code = defineCode(codeConfig);
  assert.throws(
    () =>
      code.config.validate({
        ...codeConfig,
        locale: {
          variables: [
            { id: 'USER_NAME', value: 'Maria' },
            { id: 'USER_NAME', value: 'Jane' },
          ],
        },
      }),
    /Duplicate Code variable ID "USER_NAME"/,
  );
  for (const source of ['%_%user_name%_%', '%_%USER_NAME', '%_%id: personName; value: Maria%_%']) {
    assert.throws(
      () => code.config.validate(codeConfig, source),
      /Code variables validation failed/,
      source,
    );
  }
});

test('Code skips placeholder integrity checks when no variables are configured', () => {
  const config: ContentBlock_Code_Config = {
    ...codeConfig,
    locale: {},
  };
  const code = defineCode(config);
  assert.doesNotThrow(() => code.config.validate(config, '%_%BROKEN'));
});
