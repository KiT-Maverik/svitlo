import type { Locale_Languages } from '@svitlo/contracts';

import type { ContentBlock_Text_Config, ContextBlock_Text_Props } from './defineText.types';
import { ContentBlock_Text_Schema } from './defineText.schema';

export const defineText = <SupportedLanguages extends Locale_Languages>(
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

  return {
    config: {
      base,
      overrides: () => (Object.values(overrides).length ? { ...overrides } : null),
      locales: () => (typeof value === 'string' ? null : value),
      test: {
        config: (supportedLanguages: SupportedLanguages) =>
          ContentBlock_Text_Schema.config(supportedLanguages).safeParse(config).success,
        props: (props: unknown) => ContentBlock_Text_Schema.props.safeParse(props).success,
      },
    },
    disable,
  };
};

export type ContentBlock_Text_Definition = ReturnType<typeof defineText>;
