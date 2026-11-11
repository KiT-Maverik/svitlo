import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createSectionConfigurator } from '../_shared';
import { codingTaskSection_Config_Schema, type CodingTaskSection_Config } from './defineCodingTaskSection.schemas';

/**
 * Define a CodingTask Section with slug-keyed ContentBlock configurators.
 * content.items holds the actual define* objects; content.order lists their slugs.
 * Use override.content.add/disable/order for sparse per-course changes.
 */
export function defineCodingTaskSection<
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<CodingTaskSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) {
  return createSectionConfigurator(config, codingTaskSection_Config_Schema);
}

export type CodingTaskSection_Configurator = ReturnType<typeof defineCodingTaskSection>;
