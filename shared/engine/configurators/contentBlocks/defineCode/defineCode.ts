import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { code_Config_Schema, type ContentBlock_Code_Config } from './defineCode.schemas';

export function defineCode<const Slug extends string>(config: Omit<ContentBlock_Code_Config, 'slug'> & { slug: Slug }) {
  code_Config_Schema.parse(config);

  const { id, slug, type, language, title, code, fileLocation, variables } = config;

  const localeEntries = { title, code, fileLocation, variables } as const;

  const base = {
    id,
    slug,
    type,
    language,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Code_Config>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Code_Config>,
    },
  };
}

export type ContentBlock_Code_Configurator = ReturnType<typeof defineCode>;
