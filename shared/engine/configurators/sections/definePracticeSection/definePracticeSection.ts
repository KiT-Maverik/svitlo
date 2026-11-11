import type { ContentBlock_Configurator } from '../../contentBlocks';
import { createRegularSection } from '../_shared/createRegularSection';
import { practiceSection_Config_Schema, type PracticeSection_Config } from './definePracticeSection.schemas';

const validate = (config: PracticeSection_Config) => {
  practiceSection_Config_Schema.parse(config);
};

export function definePracticeSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<PracticeSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
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

export type PracticeSection_Configurator = ReturnType<typeof definePracticeSection>;
