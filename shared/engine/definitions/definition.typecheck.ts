import type { Definition } from './definition';
import { defineText } from './contentBlocks/defineText/defineText';
import type {
  ContentBlock_Text_Config,
  ContextBlock_Text_Props,
} from './contentBlocks/defineText/defineText.schema';

const languages = ['en', 'uk'] as const;
type TextConfig = ContentBlock_Text_Config<typeof languages>;

type RequiredTextDefinition = Definition<
  Partial<TextConfig>,
  Exclude<TextConfig['value'], string>,
  Partial<ContextBlock_Text_Props>,
  typeof languages
>;

const text = defineText<typeof languages>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d6a',
  type: 'text',
  slug: 'intro',
  params: {},
  value: { en: 'Hello', uk: 'Привіт' },
});

// Every Text definition fulfills the minimum interface.
const shared: RequiredTextDefinition = text;
const tested: boolean = shared.config.test.config(languages);
const propsTested: boolean = shared.config.test.props({});
// Its additional lifecycle API is still available.
text.disable();

// A structural Definition may also provide extra entity-specific methods.
const extended = { ...shared, custom: () => 'extra' };
const minimum: RequiredTextDefinition = extended;

// Omitting an expected method is a type error.
const missingOverrides = {
  config: {
    base: {},
    locales: () => null,
    test: { config: () => true, props: () => true },
  },
};
// @ts-expect-error A Definition must implement config.overrides().
const incomplete: Definition<object, never, never, typeof languages> = missingOverrides;

const missingPropsTest = {
  config: {
    base: {},
    locales: () => null,
    overrides: () => null,
    test: { config: () => true },
  },
};
// @ts-expect-error A Definition must implement config.test.props().
const invalidTest: Definition<object, never, never, typeof languages> = missingPropsTest;

void tested;
void propsTested;
void minimum;
void incomplete;
void invalidTest;
