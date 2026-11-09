import type { ContentBlock_Configurator } from '../../contentBlocks/contentBlock.types';
import { createRegularSection } from '../_shared/createRegularSection';
import { scenarioSection_Config_Schema, type ScenarioSection_Config } from './defineScenarioSection.schemas';

export function defineScenarioSection<
  const Slug extends string,
  const Content extends readonly ContentBlock_Configurator[],
>(config: Omit<ScenarioSection_Config, 'slug' | 'content'> & { slug: Slug; content: Content }) {
  scenarioSection_Config_Schema.parse(config);
  return createRegularSection(config);
}

export type ScenarioSection_Configurator = ReturnType<typeof defineScenarioSection>;
