import type { ContentBlock_Configurator } from '../../contentBlocks';
import { createSectionConfigurator } from '../_shared__sections';
import { contentSection_Config_Schema, type Content_Section_Config } from './defineContentSection.schemas';

/**
 * Define a Content Section with slug-keyed ContentBlock configurators.
 * content.items holds the actual define* objects; content.order lists their slugs.
 * Use override.content.add/disable/order for sparse per-course changes.
 */
export function defineContentSection<
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<Content_Section_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) {
  return createSectionConfigurator(config, contentSection_Config_Schema);
}

export type ContentSection_Configurator = ReturnType<typeof defineContentSection>;
