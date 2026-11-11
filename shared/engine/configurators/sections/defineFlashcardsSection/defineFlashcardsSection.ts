import type { ContentBlock_Configurator } from '../../contentBlocks';
import { createSectionConfigurator } from '../_shared__sections';
import { flashcardsSection_Config_Schema, type FlashcardsSection_Config } from './defineFlashcardsSection.schemas';

/**
 * Define a Flashcards Section with slug-keyed ContentBlock configurators.
 * content.items holds the actual define* objects; content.order lists their slugs.
 * Use override.content.add/disable/order for sparse per-course changes.
 */
export function defineFlashcardsSection<
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<FlashcardsSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) {
  return createSectionConfigurator(config, flashcardsSection_Config_Schema);
}

export type FlashcardsSection_Configurator = ReturnType<typeof defineFlashcardsSection>;
