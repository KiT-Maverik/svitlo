import { createRegularSection } from '../_shared/createRegularSection';
import { contentSection_Config_Schema, type ContentSection_Config } from './defineContentSection.schemas';

export const defineContentSection = (config: ContentSection_Config) {
  contentSection_Config_Schema.parse(config);

  return createRegularSection(config);
}

export type ContentSection_Configurator = ReturnType<typeof defineContentSection>;
