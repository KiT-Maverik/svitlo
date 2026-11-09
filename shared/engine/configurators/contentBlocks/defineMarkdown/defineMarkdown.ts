import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { markdown_Config_Schema, type ContentBlock_Markdown_Config } from './defineMarkdown.schemas';

export function defineMarkdown<const Slug extends string>(
  config: Omit<ContentBlock_Markdown_Config, 'slug'> & { slug: Slug },
) {
  markdown_Config_Schema.parse(config);

  const { id, type, slug, locales } = config;

  const localeEntries = { locales } as const;

  const base = {
    id,
    type,
    slug,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Markdown_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Markdown_Config>,
    },
  };
}

export type ContentBlock_Markdown_Configurator = ReturnType<typeof defineMarkdown>;
