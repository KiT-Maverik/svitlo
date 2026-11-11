import { z } from 'zod';
import { createSectionBaseSchema } from '../_shared__sections';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const schemas = createSectionBaseSchema('learningFlow');
export const learningFlowSection_Config_Schema = schemas.config;
export type LearningFlowSection_Config = z.infer<typeof learningFlowSection_Config_Schema> & Section_Config_Content;

export const learningFlowSection_Props_Schema = schemas.props;
export type LearningFlowSection_Props = z.infer<typeof learningFlowSection_Props_Schema> & Section_Props_Content;
