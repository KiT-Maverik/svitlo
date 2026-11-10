import { createRegularSectionSchema } from '../section.schemas';

export const contentSection_Config_Schema = createRegularSectionSchema('theory', 'config');
export type ContentSection_Config = import('zod').z.infer<typeof contentSection_Config_Schema>;

export const contentSection_Props_Schema = createRegularSectionSchema('theory', 'props');
export type ContentSection_Props = import('zod').z.infer<typeof contentSection_Props_Schema>;
