import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { codingTaskSection_Config_Schema, type CodingTaskSection_Config } from './defineCodingTaskSection.schemas';

const validate = (config: CodingTaskSection_Config) => {
  codingTaskSection_Config_Schema.parse(config);
};

export function defineCodingTaskSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<CodingTaskSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  validate(config);
  const section = createRegularSection(config);
  return {
    ...section,
    id: config.id,
    slug: config.slug,
    type: config.type,
    config: { ...section.config, validate },
  };
}

export type CodingTaskSection_Configurator = ReturnType<typeof defineCodingTaskSection>;
