import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { codingTaskSection_Config_Schema, type CodingTaskSection_Config } from './defineCodingTaskSection.schemas';

export function defineCodingTaskSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<CodingTaskSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  codingTaskSection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type CodingTaskSection_Configurator = ReturnType<typeof defineCodingTaskSection>;
