import { createRegularSectionSchema } from '../section.schemas';

export const practiceSection_Config_Schema = createRegularSectionSchema('practice', 'config');
export type PracticeSection_Config = import('zod').z.infer<typeof practiceSection_Config_Schema>;

export const practiceSection_Props_Schema = createRegularSectionSchema('practice', 'props');
export type PracticeSection_Props = import('zod').z.infer<typeof practiceSection_Props_Schema>;
