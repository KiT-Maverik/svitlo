import { z } from 'zod';
import { createSectionBaseSchema } from '../_shared__sections';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const schemas = createSectionBaseSchema('codingTask');
export const codingTaskSection_Config_Schema = schemas.config;
export type CodingTaskSection_Config = z.infer<typeof codingTaskSection_Config_Schema> & Section_Config_Content;

export const codingTaskSection_Props_Schema = schemas.props;
export type CodingTaskSection_Props = z.infer<typeof codingTaskSection_Props_Schema> & Section_Props_Content;
