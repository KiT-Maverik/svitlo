import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { flashcardsSection_Config_Schema, type FlashcardsSection_Config } from './defineFlashcardsSection.schemas';

export function defineFlashcardsSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<FlashcardsSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  flashcardsSection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type FlashcardsSection_Configurator = ReturnType<typeof defineFlashcardsSection>;
