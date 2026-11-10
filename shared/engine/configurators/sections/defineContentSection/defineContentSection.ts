import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { contentSection_Config_Schema, type ContentSection_Config } from './defineContentSection.schemas';

export function defineContentSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<ContentSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  contentSection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type TheorySection_Configurator = ReturnType<typeof defineContentSection>;
