import { createRegularSectionSchema } from '../section.schemas';

export const learningFlowSection_Config_Schema = createRegularSectionSchema('learningFlow', 'config');
export type LearningFlowSection_Config = import('zod').z.infer<typeof learningFlowSection_Config_Schema>;

export const learningFlowSection_Props_Schema = createRegularSectionSchema('learningFlow', 'props');
export type LearningFlowSection_Props = import('zod').z.infer<typeof learningFlowSection_Props_Schema>;
