import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';
import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import type { RegularSection_Type } from '../section.schemas';
import { createRegularSectionSchema } from '../section.schemas';

export function createRegularSection<
  const Type extends RegularSection_Type,
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: {
  type: Type;
  id: string;
  slug: Slug;
  title: string | Record<string, string>;
  navigationLabel: string | Record<string, string>;
  skippable?: true;
  content: Content;
}) {
  createRegularSectionSchema(config.type, 'config').parse(config);

  const { type, id, slug, title, navigationLabel, skippable, content } = config;
  const localeEntries = { title, navigationLabel } as const;
  const base = {
    type, id, slug, skippable,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<typeof config>;

  return {
    sectionType: type,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<typeof config>,
    },
    content,
  };
}
