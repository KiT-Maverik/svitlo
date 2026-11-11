import { z } from 'zod';
import { createSectionBaseSchema } from '../_shared__sections';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const schemas = createSectionBaseSchema('practice');
export const practiceSection_Config_Schema = schemas.config;
export type PracticeSection_Config = z.infer<typeof practiceSection_Config_Schema> & Section_Config_Content;

export const practiceSection_Props_Schema = schemas.props;
export type PracticeSection_Props = z.infer<typeof practiceSection_Props_Schema> & Section_Props_Content;
