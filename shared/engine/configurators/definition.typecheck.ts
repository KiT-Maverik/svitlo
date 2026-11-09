import type { Definition } from './definition';
import { defineText } from './contentBlocks/defineText/defineText';
import { defineCheckpoint } from './contentBlocks/defineCheckpoint/defineCheckpoint';
import type { ContentBlock_Text_Config, ContentBlock_Text_Props } from './contentBlocks/defineText/defineText.schemas';

const languages = ['en', 'uk'] as const;
const text = defineText({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  type: 'text',
  slug: 'intro',
  params: {},
  value: { en: 'Hello', uk: 'Привіт' },
});

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Expect<T extends true> = T;
type TextSlug = Expect<Equal<typeof text.config.base.slug, 'intro'>>;

// The props schema describes resolved text, while the config schema accepts sparse locale maps.
const authored: ContentBlock_Text_Config = {
  id: text.config.base.id,
  type: 'text',
  slug: 'intro',
  params: {},
  value: { en: 'Hello', uk: 'Привіт' },
};
const resolved: ContentBlock_Text_Props = { ...authored, value: 'Hello' };

// A Checkpoint accepts actual nested configurators rather than raw child configs.
const checkpoint = defineCheckpoint({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6b',
  type: 'checkpoint',
  slug: 'review',
  title: 'Review',
  items: [{ question: 'What?', answer: [text] }],
});
type CheckpointSlug = Expect<Equal<typeof checkpoint.config.base.slug, 'review'>>;
const nestedText: typeof text = checkpoint.items[0].answer[0];
void nestedText;

defineCheckpoint({
  id: authored.id,
  type: 'checkpoint',
  slug: 'bad',
  title: 'Bad',
  // @ts-expect-error Raw authored Text config is not a nested configurator.
  items: [{ question: 'Q', answer: [authored] }],
});

// The older Definition contract remains available to legacy structured entities.
const complete: Definition<object, object, object, typeof languages> = {
  config: {
    base: {},
    locales: () => null,
    overrides: () => null,
    test: { config: () => true, props: () => true },
  },
};
const extended = { ...complete, custom: () => 'extra' };
const minimum: typeof complete = extended;

const missingOverrides = {
  config: {
    base: {},
    locales: () => null,
    test: { config: () => true, props: () => true },
  },
};
// @ts-expect-error The legacy Definition must implement config.overrides().
const incomplete: Definition<object, never, never, typeof languages> = missingOverrides;

const missingPropsTest = {
  config: {
    base: {},
    locales: () => null,
    overrides: () => null,
    test: { config: () => true },
  },
};
// @ts-expect-error The legacy Definition must implement config.test.props().
const invalidTest: Definition<object, never, never, typeof languages> = missingPropsTest;

void resolved;
void minimum;
void incomplete;
void invalidTest;
