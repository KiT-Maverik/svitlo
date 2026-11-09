import { createRegularSectionSchema } from '../section.schemas';

export const scenarioSection_Config_Schema = createRegularSectionSchema('scenario', 'config');
export type ScenarioSection_Config = import('zod').z.infer<typeof scenarioSection_Config_Schema>;

export const scenarioSection_Props_Schema = createRegularSectionSchema('scenario', 'props');
export type ScenarioSection_Props = import('zod').z.infer<typeof scenarioSection_Props_Schema>;
