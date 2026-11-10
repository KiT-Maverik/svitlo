import { z } from 'zod';

import { createSectionMetaSchema } from '../_shared';

export const contentSection_Config_Schema = createSectionMetaSchema('content', 'config');
export type Content_Section_Config = z.infer<typeof contentSection_Config_Schema>;

export const contentSection_Props_Schema = createSectionMetaSchema('content', 'props');
export type Content_Section_Props = z.infer<typeof contentSection_Props_Schema>;
