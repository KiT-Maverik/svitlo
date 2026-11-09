import { createRegularSectionSchema } from '../section.schemas';

export const codingTaskSection_Config_Schema = createRegularSectionSchema('codingTask', 'config');
export type CodingTaskSection_Config = import('zod').z.infer<typeof codingTaskSection_Config_Schema>;

export const codingTaskSection_Props_Schema = createRegularSectionSchema('codingTask', 'props');
export type CodingTaskSection_Props = import('zod').z.infer<typeof codingTaskSection_Props_Schema>;
