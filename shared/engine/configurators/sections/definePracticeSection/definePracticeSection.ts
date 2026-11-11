import type { ContentBlock_Configurator } from '../../contentBlocks';
import { createSectionConfigurator } from '../_shared__sections';
import { practiceSection_Config_Schema, type PracticeSection_Config } from './definePracticeSection.schemas';

/**
 * Define a Practice Section with slug-keyed ContentBlock configurators.
 * content.items holds the actual define* objects; content.order lists their slugs.
 * Use override.content.add/disable/order for sparse per-course changes.
 */
export function definePracticeSection<
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<PracticeSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) {
  return createSectionConfigurator(config, practiceSection_Config_Schema);
}

export type PracticeSection_Configurator = ReturnType<typeof definePracticeSection>;
