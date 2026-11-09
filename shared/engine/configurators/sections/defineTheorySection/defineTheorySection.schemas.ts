import { createRegularSectionSchema } from '../section.schemas';

export const theorySection_Config_Schema = createRegularSectionSchema('theory', 'config');
export type TheorySection_Config = import('zod').z.infer<typeof theorySection_Config_Schema>;

export const theorySection_Props_Schema = createRegularSectionSchema('theory', 'props');
export type TheorySection_Props = import('zod').z.infer<typeof theorySection_Props_Schema>;
