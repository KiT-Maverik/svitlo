import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText, text_Props_Schema, type ContentBlock_Text_Config } from './index';

const identity = {
  id: 'c2cc84f3-f057-493d-b1b6-1880aad8023b',
  slug: 'intro',
  type: 'text' as const,
  params: {},
};

test('Text assembles an invariant value into base and no locale files', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });
  const assembled = text.assemble.resource();

  assert.deepEqual(assembled, {
    base: { ...identity, locale: { value: 'Welcome' } },
    locales: undefined,
  });
  assert.equal(text_Props_Schema.safeParse(assembled.base).success, true);
});

test('Text assembles translations as deep-mergeable, language-keyed fragments', () => {
  const text = defineText({
    ...identity,
    locale: { value: { en: 'Welcome', uk: 'Ласкаво просимо' } },
  });
  const assembled = text.assemble.resource();

  assert.deepEqual(assembled, {
    base: { ...identity },
    locales: {
      en: { value: 'Welcome' },
      uk: { value: 'Ласкаво просимо' },
    },
  });
  assert.equal(text_Props_Schema.safeParse({ ...assembled.base, locale: assembled.locales?.uk }).success, true);
});

test('Text requires a base value when resource locales are absent', () => {
  const config: ContentBlock_Text_Config = {
    ...identity,
    locale: { value: { en: 'Welcome' } },
  };
  const text = defineText(config);
  config.locale.value = 'Universal text';

  assert.throws(() => text.assemble.resource(), /neither a base value nor localized values/);
});

test('Text publishes only sparse overrides without mutating the original', () => {
  const text = defineText({
    ...identity,
    locale: { value: { en: 'Welcome', uk: 'Привіт' } },
  });
  const before = text.assemble.resource();
  const patch = { params: { disabled: true as const }, locale: { value: { uk: 'Вітаю' } } };

  assert.deepEqual(text.assemble.overrides(patch), {
    base: { params: { disabled: true } },
    locales: { uk: { value: 'Вітаю' } },
  });
  assert.deepEqual(text.assemble.resource(), before);
  assert.deepEqual(patch, { params: { disabled: true }, locale: { value: { uk: 'Вітаю' } } });
  assert.equal('override' in text, false);
  assert.equal('disable' in text, false);
});

test('Text permits an invariant override and leaves the source untouched', () => {
  const text = defineText({
    ...identity,
    locale: { value: { en: 'Welcome', uk: 'Привіт' } },
  });

  assert.deepEqual(text.assemble.overrides({ locale: { value: 'Universal text' } }), {
    base: { locale: { value: 'Universal text' } },
    locales: undefined,
  });
  assert.throws(() => text.assemble.overrides({ locale: { value: {} } }), /neither a base value nor localized values/);
  assert.deepEqual(text.assemble.resource().locales, {
    en: { value: 'Welcome' },
    uk: { value: 'Привіт' },
  });
});

test('Text validates the resolved override without publishing the resolved resource', () => {
  const text = defineText({
    ...identity,
    params: { variables: { personName: { applyStyle: ['bold'] } } },
    locale: {
      value: {
        en: 'Hi %_%id: personName; value: Ada%_%',
        uk: 'Привіт %_%id: personName; value: Ада%_%',
      },
    },
  });

  assert.deepEqual(
    text.assemble.overrides({
      locale: { value: { uk: 'Вітаю %_%id: personName; value: Оля%_%' } },
    }),
    {
      base: {},
      locales: { uk: { value: 'Вітаю %_%id: personName; value: Оля%_%' } },
    },
  );
  assert.throws(
    () => text.assemble.overrides({ locale: { value: { uk: 'Вітаю' } } }),
    /missing configured Text fragment "personName"/,
  );
  assert.throws(() => text.assemble.overrides({ locale: { value: { uk: '' } } }));
  assert.throws(() => text.assemble.overrides({ params: { variables: { anotherName: { applyColor: 'red' } } } }));
  assert.doesNotThrow(() =>
    text.validate({
      ...identity,
      params: { variables: { personName: { applyStyle: ['bold'] } } },
      locale: { value: 'Hi %_%id: personName; value: Ada%_%' },
    }),
  );
});

test('Text validates deep partial parameter patches against the full config', () => {
  const text = defineText({
    ...identity,
    params: { wrap: { enabled: true, typographyProps: { weight: 'normal' } } },
    locale: { value: 'Welcome' },
  });

  assert.deepEqual(
    text.assemble.overrides({
      params: { wrap: { typographyProps: { weight: 'bold' } } },
    }),
    {
      base: { params: { wrap: { typographyProps: { weight: 'bold' } } } },
      locales: undefined,
    },
  );
});
