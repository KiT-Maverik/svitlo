import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';
import {
  checkpoint_Config_Schema,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_Locale,
} from './defineCheckpoint.schemas';

export const defineCheckpoint = (config: ContentBlock_Checkpoint_Config) => {
  checkpoint_Config_Schema.parse(config);

  const { id, type, slug, locale, params, content } = config;

  const base = {
    id,
    type,
    slug,
    params,
    locale: onlyStrings(locale),
  } satisfies DeepPartial<ContentBlock_Checkpoint_Config>;

  const overrides: DeepPartial<ContentBlock_Checkpoint_Config> = {};

  return {
    config: {
      base,
      locales: (): { locale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>> } => ({
        locale: onlyLocales(locale),
      }),
      overrides,
    },
    override: {
      params: (newParams: DeepPartial<ContentBlock_Checkpoint_Config['params']>) =>
        (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>>) =>
        (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
    // The generator must resolve nested configurators and localize questions.
    // Neither children nor localized questions are flattened into config.base.
    content,
  } as const;
};

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
