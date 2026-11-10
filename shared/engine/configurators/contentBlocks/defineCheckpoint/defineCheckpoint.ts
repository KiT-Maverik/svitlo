import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_shared';
import {
  checkpoint_Config_Schema,
  type ContentBlock_Checkpoint_Config,
  type ContentBlock_Checkpoint_Locale,
} from './defineCheckpoint.schemas';

/**
 * Keep literal keys of content.items so order can only reference declared slugs
 * and editors can autocomplete checkpoint.content.items.<slug>.
 * Zod additionally requires that order lists every item exactly once.
 */
export const defineCheckpoint = <
  const Slug extends string,
  const Items extends ContentBlock_Checkpoint_Config['content']['items'],
  const Order extends readonly (keyof Items & string)[],
>(
  config: Omit<ContentBlock_Checkpoint_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: Order };
  },
) => {
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
      params: (newParams: DeepPartial<ContentBlock_Checkpoint_Config['params']>) => (overrides.params = newParams),
      locale: (newLocale: DeepPartial<ContentBlock_Checkpoint_Locale<'config'>>) => (overrides.locale = newLocale),
    },
    disable: () => (overrides.params = { disabled: true }),
    // Child configurators stay in authored content. The publisher resolves them
    // and projects localized item questions by slug, never by array index.
    content,
  } as const;
};

export type ContentBlock_Checkpoint_Configurator = ReturnType<typeof defineCheckpoint>;
