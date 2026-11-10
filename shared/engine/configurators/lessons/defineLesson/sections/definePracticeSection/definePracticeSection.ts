import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { practiceSection_Config_Schema, type PracticeSection_Config } from './definePracticeSection.schemas';

export function definePracticeSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<PracticeSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  practiceSection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type PracticeSection_Configurator = ReturnType<typeof definePracticeSection>;
