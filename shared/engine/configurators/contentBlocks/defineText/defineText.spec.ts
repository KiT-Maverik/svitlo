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

test('Text exposes only the new build publication API', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });
  assert.equal('assemble' in text, false);
  assert.equal(typeof text.build.props, 'function');
  assert.equal(typeof text.build.overrides, 'function');
});

test('Text publishes invariant values in base and no locale files', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });
  const output = text.build.props();
  assert.deepEqual(output, {
    base: { ...identity, locale: { value: 'Welcome' } },
    locale: undefined,
  });
  assert.equal(text_Props_Schema.safeParse(output.base).success, true);
});

test('Text publishes translated values directly as language JSON bodies', () => {
  const text = defineText({ ...identity, locale: { value: { en: 'Welcome', uk: 'Привіт' } } });
  const output = text.build.props();
  assert.deepEqual(output, {
    base: { ...identity },
    locale: { en: { value: 'Welcome' }, uk: { value: 'Привіт' } },
  });
  assert.equal(text_Props_Schema.safeParse({ ...output.base, locale: output.locale?.uk }).success, true);
});

test('Text embeds translated values as Props-shaped locale fragments', () => {
  const text = defineText({ ...identity, locale: { value: { en: 'Welcome', uk: 'Привіт' } } });
  const publication = text.build.props();
  const embedded = text.build.props({ embed: true });

  assert.deepEqual(embedded, {
    base: publication.base,
    locale: {
      en: { locale: { value: 'Welcome' } },
      uk: { locale: { value: 'Привіт' } },
    },
  });
  assert.equal(text_Props_Schema.safeParse({ ...embedded.base, ...embedded.locale?.uk }).success, true);
  assert.deepEqual(text.build.props(), publication);

  if (embedded.locale?.en) embedded.locale.en.locale.value = 'Modified output';
  assert.deepEqual(text.build.props({ embed: true }).locale?.en, { locale: { value: 'Welcome' } });
});

test('Text embedding preserves invariant values without inventing locale files', () => {
  const text = defineText({ ...identity, locale: { value: 'Universal' } });
  assert.deepEqual(text.build.props({ embed: true }), {
    base: { ...identity, locale: { value: 'Universal' } },
    locale: undefined,
  });
});

test('Text publishes only the validated override patch, not inherited properties', () => {
  const text = defineText({ ...identity, locale: { value: { en: 'Welcome', uk: 'Привіт' } } });
  const before = text.build.props();
  const patch = { params: { disabled: true as const }, locale: { value: { uk: 'Вітаю' } } };

  assert.deepEqual(text.build.overrides(patch), {
    base: { params: { disabled: true } },
    locale: { uk: { value: 'Вітаю' } },
  });
  assert.deepEqual(text.build.overrides({}), { base: {}, locale: undefined });
  assert.deepEqual(text.build.props(), before);
  assert.deepEqual(patch, { params: { disabled: true }, locale: { value: { uk: 'Вітаю' } } });
  assert.equal('override' in text, false);
  assert.equal('disable' in text, false);
});

test('Text permits a one-language override of an invariant or localized text', () => {
  const localized = defineText({ ...identity, locale: { value: { en: 'Welcome', uk: 'Привіт' } } });
  const invariant = defineText({ ...identity, locale: { value: 'Welcome' } });
  for (const text of [localized, invariant]) {
    assert.deepEqual(text.build.overrides({ locale: { value: { uk: 'Вітаю' } } }), {
      base: {},
      locale: { uk: { value: 'Вітаю' } },
    });
  }
});

test('Text publishes invariant overrides as an intentional dictionary replacement', () => {
  const text = defineText({ ...identity, locale: { value: { en: 'Welcome', uk: 'Привіт' } } });
  assert.deepEqual(text.build.overrides({ locale: { value: 'Universal' } }), {
    base: { locale: { value: 'Universal' } },
    locale: undefined,
  });
  assert.deepEqual(text.build.props().locale, {
    en: { value: 'Welcome' },
    uk: { value: 'Привіт' },
  });
});

test('Text checks semantic variable rules against the temporarily merged config', () => {
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
    text.build.overrides({
      locale: { value: { uk: 'Вітаю %_%id: personName; value: Оля%_%' } },
    }),
    {
      base: {},
      locale: { uk: { value: 'Вітаю %_%id: personName; value: Оля%_%' } },
    },
  );
  assert.throws(
    () => text.build.overrides({ locale: { value: { uk: 'Вітаю' } } }),
    /missing configured Text fragment "personName"/,
  );
  assert.throws(
    () => text.build.overrides({ params: { variables: { anotherName: { applyStyle: ['bold'] } } } }),
    /Text variables validation failed/,
  );
  assert.doesNotThrow(() =>
    text.validate({
      ...identity,
      params: { variables: { personName: { applyStyle: ['bold'] } } },
      locale: { value: 'Hi %_%id: personName; value: Ada%_%' },
    }),
  );
});

test('Text allows deep-partial nested patches and publishes only those keys', () => {
  const text = defineText({
    ...identity,
    params: {
      wrap: { enabled: true, typographyProps: { weight: 'normal' } },
      variables: { personName: { applyStyle: ['bold'], applyColor: 'red' } },
    },
    locale: { value: 'Hi %_%id: personName; value: Ada%_%' },
  });
  assert.deepEqual(
    text.build.overrides({
      params: {
        wrap: { typographyProps: { weight: 'bold' } },
        variables: { personName: { applyColor: 'blue' } },
      },
    }),
    {
      base: {
        params: {
          wrap: { typographyProps: { weight: 'bold' } },
          variables: { personName: { applyColor: 'blue' } },
        },
      },
      locale: undefined,
    },
  );
});

test('Text strictly rejects unknown override fields with cause and identity', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });
  for (const input of [
    { id: identity.id },
    { unknown: true },
    { params: { disabeld: true } },
    { params: { wrap: { unexpected: 1 } } },
    { params: { variables: { personName: { unexpected: true } } } },
    { locale: { unknown: true } },
    { locale: { value: { wrongLanguage: 'Bonjour' } } },
  ]) {
    assert.throws(
      () => text.build.overrides(input as never),
      error => {
        assert.ok(error instanceof Error);
        assert.match(error.message, new RegExp(`Invalid Text overrides for ${identity.id}`));
        assert.ok(error.cause instanceof z.ZodError);
        return true;
      },
    );
  }
});

test('Text requires typographyProps to be a JSON-compatible object', () => {
  const text = defineText({ ...identity, locale: { value: 'Welcome' } });
  assert.deepEqual(
    text.build.overrides({
      params: { wrap: { enabled: true, typographyProps: { customMUIProp: 42 } } },
    }),
    {
      base: { params: { wrap: { enabled: true, typographyProps: { customMUIProp: 42 } } } },
      locale: undefined,
    },
  );
  for (const value of ['not-an-object', { onClick: () => 42 }, { nested: { invalid: undefined } }, { nested: 1n }]) {
    assert.throws(() => text.build.overrides({ params: { wrap: { typographyProps: value as never } } }));
  }
});

test('Text keeps snapshots and assembled JSON independent of caller mutations', () => {
  const props = { nested: { weight: 'normal' } };
  const config: ContentBlock_Text_Config = {
    ...identity,
    params: { wrap: { enabled: true, typographyProps: props } },
    locale: { value: { en: 'Welcome' } },
  };
  const text = defineText(config);
  props.nested.weight = 'mutated caller';
  config.locale.value = 'Other';
  config.params.disabled = true;

  assert.deepEqual(text.build.props(), {
    base: {
      ...identity,
      params: { wrap: { enabled: true, typographyProps: { nested: { weight: 'normal' } } } },
    },
    locale: { en: { value: 'Welcome' } },
  });

  const assembled = text.build.props();
  (assembled.base.params.wrap?.typographyProps as { nested: { weight: string } }).nested.weight = 'mutated output';
  assert.deepEqual(text.build.props().base.params.wrap?.typographyProps, { nested: { weight: 'normal' } });

  const patch = { params: { wrap: { typographyProps: { nested: { weight: 'bold' } } } } };
  const first = text.build.overrides(patch);
  (first.base.params?.wrap?.typographyProps as { nested: { weight: string } }).nested.weight =
    'mutated override output';
  assert.deepEqual(text.build.overrides(patch), {
    base: { params: { wrap: { typographyProps: { nested: { weight: 'bold' } } } } },
    locale: undefined,
  });
  assert.deepEqual(patch, { params: { wrap: { typographyProps: { nested: { weight: 'bold' } } } } });
});
