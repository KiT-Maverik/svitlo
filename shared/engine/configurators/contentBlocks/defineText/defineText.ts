import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import {text_Config_Schema, type ContentBlock_Text_Config, ContentBlock_Text_Props, type ContentBlock_Text_Locale} from './defineText.schemas';

export const defineText = (config: ContentBlock_Text_Config) => {
  text_Config_Schema.parse(config);

  const { id, type, slug, value, params } = config;

  const locale: ContentBlock_Text_Locale<'config'> = { value } as const;

  const base = {
    id,
    type,
    slug,
    params,
    ...onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Text_Config>;

  const overrides: { params: DeepPartial<ContentBlock_Text_Props['params']> } = { params: {} };

  return {
    config: {
      base,
      locales: (): DeepPartial<ContentBlock_Text_Locale<'config'>> => onlyLocales(locale),
    },
    disable: () => overrides.params.disabled = true,
  };
}

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
