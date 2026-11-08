import {createTextConfigSchema, textProps_Schema, type TextLanguages, TextConfig, TextProps} from './defineText.schema';

export const defineText = <SupportedLanguages extends TextLanguages>(config: TextConfig<SupportedLanguages>) => {
  const { id, type, value, params, slug } = config;

  const base: Partial<TextConfig<SupportedLanguages>> = {
    id,
    type,
    slug,
    params: {
      styling: params.styling,
      wrap: params.wrap,
    },
  } as const;

  if (typeof value === 'string') base.value = value;

  const overrides: Partial<TextProps> = {};

  const disable = () => {
    overrides.params = { disabled: true };
  };

  return {
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
};

export type ContentBlock_Text_Definition = ReturnType<typeof defineText>;
