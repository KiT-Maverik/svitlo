import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { learningFlowSection_Config_Schema, type LearningFlowSection_Config } from './defineLearningFlowSection.schemas';

export function defineLearningFlowSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<LearningFlowSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  learningFlowSection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type LearningFlowSection_Configurator = ReturnType<typeof defineLearningFlowSection>;
