import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';

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

test('Text assembly uses a snapshot of the authored config', () => {
  const config: ContentBlock_Text_Config = {
    ...identity,
    params: {},
    locale: { value: { en: 'Welcome' } },
  };
  const text = defineText(config);
  config.locale.value = 'Universal text';
  config.params.disabled = true;

  assert.deepEqual(text.assemble.resource(), {
    base: { ...identity },
    locales: { en: { value: 'Welcome' } },
  });
  const assembled = text.assemble.resource();
  assembled.base.params.disabled = true;
  assert.deepEqual(text.assemble.resource().base.params, {});
  text.config.base.params.disabled = true;
  assert.deepEqual(text.assemble.overrides({}).base.params, {});
});

test('Text publishes complete independent overrides without mutating the original', () => {
  const text = defineText({
    ...identity,
    locale: { value: { en: 'Welcome', uk: 'Привіт' } },
  });
  const before = text.assemble.resource();
  const patch = { params: { disabled: true as const }, locale: { value: { uk: 'Вітаю' } } };

  assert.deepEqual(text.assemble.overrides(patch), {
    base: { ...identity, params: { disabled: true } },
    locales: { en: { value: 'Welcome' }, uk: { value: 'Вітаю' } },
  });
  assert.deepEqual(text.assemble.resource(), before);
  const modified = text.assemble.overrides(patch);
  modified.base.params.disabled = undefined;
  assert.deepEqual(text.assemble.overrides(patch).base.params, { disabled: true });
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
    base: { ...identity, locale: { value: 'Universal text' } },
    locales: undefined,
  });
  assert.deepEqual(text.assemble.overrides({ locale: { value: {} } }), text.assemble.resource());
  assert.deepEqual(text.assemble.resource().locales, {
    en: { value: 'Welcome' },
    uk: { value: 'Привіт' },
  });
});

test('Text can replace an invariant value with localized values in a complete override', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });

  assert.deepEqual(text.assemble.overrides({ locale: { value: { uk: 'Привіт' } } }), {
    base: { ...identity },
    locales: { uk: { value: 'Привіт' } },
  });
  assert.deepEqual(text.assemble.resource(), {
    base: { ...identity, locale: { value: 'Welcome' } },
    locales: undefined,
  });
});

test('Text validates and publishes the resolved override', () => {
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
      base: {
        ...identity,
        params: { variables: { personName: { applyStyle: ['bold'] } } },
      },
      locales: {
        en: { value: 'Hi %_%id: personName; value: Ada%_%' },
        uk: { value: 'Вітаю %_%id: personName; value: Оля%_%' },
      },
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
      base: {
        ...identity,
        params: { wrap: { enabled: true, typographyProps: { weight: 'bold' } } },
        locale: { value: 'Welcome' },
      },
      locales: undefined,
    },
  );
});

test('Text rejects unknown override fields with its ID and Zod issues', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });

  for (const patch of [
    { unexpected: true },
    { params: { unexpected: true } },
    { params: { wrap: { enabled: true, unexpected: true } } },
    { locale: { value: 'Welcome', unexpected: true } },
  ]) {
    assert.throws(
      () => text.assemble.overrides(patch as never),
      error => {
        assert.ok(error instanceof Error);
        assert.match(error.message, new RegExp(`Invalid Text overrides for ${identity.id}`));
        assert.ok(error.cause instanceof z.ZodError);
        assert.ok(error.cause.issues.some(issue => issue.code === 'unrecognized_keys'));
        return true;
      },
    );
  }
});

test('Text leaves MUI typography props to the consuming app', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });

  assert.deepEqual(
    text.assemble.overrides({ params: { wrap: { enabled: true, typographyProps: { customMUIProp: 42 } } } }),
    {
      base: {
        ...identity,
        params: { wrap: { enabled: true, typographyProps: { customMUIProp: 42 } } },
        locale: { value: 'Welcome' },
      },
      locales: undefined,
    },
  );
});
