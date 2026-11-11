import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared__sections/createRegularSection';
import { flashcardsSection_Config_Schema, type FlashcardsSection_Config } from './defineFlashcardsSection.schemas';

const validate = (config: FlashcardsSection_Config) => {
  flashcardsSection_Config_Schema.parse(config);
};

export function defineFlashcardsSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<FlashcardsSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  validate(config);
  const section = createRegularSection(config);
  return {
    ...section,
    id: config.id,
    slug: config.slug,
    type: config.type,
    config: { ...section.config, validate },
  };
}

export type FlashcardsSection_Configurator = ReturnType<typeof defineFlashcardsSection>;
