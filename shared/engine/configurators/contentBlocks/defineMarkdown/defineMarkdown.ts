import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared__configurators';

import {
  markdown_Config_Schema,
  type ContentBlock_Markdown_Config,
  type ContentBlock_Markdown_Locale,
} from './defineMarkdown.schemas';

const validate = (config: ContentBlock_Markdown_Config) => {
  markdown_Config_Schema.parse(config);
};

export const defineMarkdown = <const Slug extends string>(
  config: Omit<ContentBlock_Markdown_Config, 'slug'> & { slug: Slug },
) => {
  validate(config);

  const { id, type, slug, locale, params } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Markdown_Config>;

  const overrides: DeepPartial<ContentBlock_Markdown_Config> = {};

  return {
    id,
    slug,
    type,
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Markdown_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
      validate,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Markdown_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Markdown_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
  } as const;
};

export type ContentBlock_Markdown_Configurator = ReturnType<typeof defineMarkdown>;
