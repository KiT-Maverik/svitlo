import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import {text_Config_Schema, type ContentBlock_Text_Config, ContentBlock_Text_Props} from './defineText.schemas';

export const defineText = (config: ContentBlock_Text_Config) => {
  text_Config_Schema.parse(config);

  const { id, type, slug, value, params } = config;

  const localeEntries = { value } as const satisfies DeepPartial<ContentBlock_Text_Config>;

  const base = {
    id,
    type,
    slug,
    params,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<ContentBlock_Text_Config>;

  const overrides = { params: {} } satisfies DeepPartial<ContentBlock_Text_Props>;

  return {
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<ContentBlock_Text_Config>,
    },
    disable: () => overrides.params.disabled = true,
  };
}

export type ContentBlock_Text_Configurator = ReturnType<typeof defineText>;
