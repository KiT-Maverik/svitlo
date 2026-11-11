import { z } from 'zod';
import { createSectionBaseSchema } from '../_shared';
import type { Section_Config_Content, Section_Props_Content } from '../_shared/section.types';

const schemas = createSectionBaseSchema('flashcards');
export const flashcardsSection_Config_Schema = schemas.config;
export type FlashcardsSection_Config = z.infer<typeof flashcardsSection_Config_Schema> & Section_Config_Content;

export const flashcardsSection_Props_Schema = schemas.props;
export type FlashcardsSection_Props = z.infer<typeof flashcardsSection_Props_Schema> & Section_Props_Content;
