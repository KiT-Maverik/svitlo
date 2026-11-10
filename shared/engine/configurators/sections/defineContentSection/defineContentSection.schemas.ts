import { z } from 'zod';

import { createSectionMetaSchema } from '../section.schemas';

export const contentSection_Config_Schema = createSectionMetaSchema('content', 'config');
export type ContentSection_Config = z.infer<typeof contentSection_Config_Schema>;

export const contentSection_Props_Schema = createSectionMetaSchema('content', 'props');
export type ContentSection_Props = z.infer<typeof contentSection_Props_Schema>;
