import { z } from 'zod';

import { createContentBlockMetaSchema, contentBlockLocalizationSwitch } from '../contentBlock.schemas';

function createMarkdownSchema<Mode extends keyof typeof contentBlockLocalizationSwitch>(mode: Mode) {
  const localized = contentBlockLocalizationSwitch[mode];

  return z.object({
    ...createContentBlockMetaSchema('markdown').shape,
    locales: localized,
  });
}

export const markdown_Config_Schema = createMarkdownSchema('config');
export type ContentBlock_Markdown_Config = z.infer<typeof markdown_Config_Schema>;

export const markdown_Props_Schema = createMarkdownSchema('props');
export type ContentBlock_Markdown_Props = z.infer<typeof markdown_Props_Schema>;
