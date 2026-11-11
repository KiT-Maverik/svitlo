import { createRegularSectionSchema } from '../section.schemas';

export const flashcardsSection_Config_Schema = createRegularSectionSchema('flashcards', 'config');
export type FlashcardsSection_Config = import('zod').z.infer<typeof flashcardsSection_Config_Schema>;

export const flashcardsSection_Props_Schema = createRegularSectionSchema('flashcards', 'props');
export type FlashcardsSection_Props = import('zod').z.infer<typeof flashcardsSection_Props_Schema>;
