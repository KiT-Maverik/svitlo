import type { ContentBlock_Configurator } from '../../contentBlocks';
import { createSectionConfigurator } from '../_shared__sections';
import {
  learningFlowSection_Config_Schema,
  type LearningFlowSection_Config,
} from './defineLearningFlowSection.schemas';

/**
 * Define a LearningFlow Section with slug-keyed ContentBlock configurators.
 * content.items holds the actual define* objects; content.order lists their slugs.
 * Use override.content.add/disable/order for sparse per-course changes.
 */
export function defineLearningFlowSection<
  const Slug extends string,
  const Items extends Record<string, ContentBlock_Configurator>,
>(
  config: Omit<LearningFlowSection_Config, 'slug' | 'content'> & {
    slug: Slug;
    content: { items: Items; order: string[] };
  },
) {
  return createSectionConfigurator(config, learningFlowSection_Config_Schema);
}

export type LearningFlowSection_Configurator = ReturnType<typeof defineLearningFlowSection>;
