import {
  createTextConfigSchema,
  textProps_Schema,
  type TextLanguages,
  ContentBlock_Text_Config,
  ContextBlock_Text_Props,
} from './defineText.schema';
import type { Definition } from '../../definition';

export const defineText = <SupportedLanguages extends TextLanguages>(
  config: ContentBlock_Text_Config<SupportedLanguages>,
) => {
  const { id, type, value, params, slug } = config;

  const base: Partial<ContentBlock_Text_Config<SupportedLanguages>> = {
    id,
    type,
    slug,
    params: {
      styling: params.styling,
      wrap: params.wrap,
    },
  } as const;

  if (typeof value === 'string') base.value = value;

  const overrides: Partial<ContextBlock_Text_Props> = {};

  const disable = () => {
    overrides.params = { disabled: true };
  };

  const definition = {
    config: {
      base,
      overrides: () => (Object.values(overrides).length ? { ...overrides } : null),
      locales: () => (typeof value === 'string' ? null : value),
      test: {
        config: (supportedLanguages: SupportedLanguages) =>
          createTextConfigSchema(supportedLanguages).safeParse(config).success,
        props: (props: unknown) => textProps_Schema.safeParse(props).success,
      },
    },
    disable,
  };

  // Enforce the common methods without erasing Text-specific methods such as disable().
  return definition satisfies Definition<
    Partial<ContentBlock_Text_Config<SupportedLanguages>>,
    NonNullable<ReturnType<typeof definition.config.locales>>,
    Partial<ContextBlock_Text_Props>,
    SupportedLanguages
  >;
};

export type ContentBlock_Text_Definition = ReturnType<typeof defineText>;
