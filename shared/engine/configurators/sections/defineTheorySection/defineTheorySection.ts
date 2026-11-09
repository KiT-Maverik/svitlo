import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { theorySection_Config_Schema, type TheorySection_Config } from './defineTheorySection.schemas';

export function defineTheorySection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<TheorySection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  theorySection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type TheorySection_Configurator = ReturnType<typeof defineTheorySection>;
