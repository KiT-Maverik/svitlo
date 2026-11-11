import { z } from 'zod';
import { createSectionBaseSchema } from '../_shared';
import type { Section_Config_Content, Section_Props_Content } from '../_shared/section.types';

const schemas = createSectionBaseSchema('content');
export const contentSection_Config_Schema = schemas.config;
export type Content_Section_Config = z.infer<typeof contentSection_Config_Schema> & Section_Config_Content;

export const contentSection_Props_Schema = schemas.props;
export type Content_Section_Props = z.infer<typeof contentSection_Props_Schema> & Section_Props_Content;
