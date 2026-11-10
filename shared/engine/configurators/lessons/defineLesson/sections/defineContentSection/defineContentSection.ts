import type { DeepPartial } from '#types';
import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';

import { onlyLocales, onlyStrings } from '../../_utils';
import {
  contentSection_Config_Schema,
  type Content_Section_Config,
  type Content_Section_Props,
} from './defineContentSection.schemas';

export function defineContentSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<Content_Section_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  const { content, ...metadata } = config;
  contentSection_Config_Schema.parse(metadata);

  const { id, type, slug, title, params } = metadata;
  const localeEntries = { title, params: { navigationLabel: params.navigationLabel } };

  const base = {
    id,
    type,
    slug,
    ...onlyStrings({ title }),
    params: {
      ...(params.skippable ? { skippable: true } : {}),
      ...onlyStrings({ navigationLabel: params.navigationLabel }),
    },
  } satisfies DeepPartial<Content_Section_Config>;

  const overrides = {
    params: {},
  } satisfies DeepPartial<Content_Section_Props>;

  return {
    config: {
      base,
      getLocales: () => onlyLocales(localeEntries) satisfies DeepPartial<Content_Section_Config>,
      overrides,
    },
    content,
    disable: () => {
      overrides.params.disable = true;
    },
  };
}

export type ContentSection_Configurator = ReturnType<typeof defineContentSection>;
