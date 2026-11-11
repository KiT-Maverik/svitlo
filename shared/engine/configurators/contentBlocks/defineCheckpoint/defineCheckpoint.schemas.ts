import { z } from 'zod';

import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Audio_Configurator, ContentBlock_Audio_Props } from '../defineAudio';
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Props } from '../defineCarousel';
import type { ContentBlock_Code_Configurator, ContentBlock_Code_Props } from '../defineCode';
import type { ContentBlock_Image_Configurator, ContentBlock_Image_Props } from '../defineImage';
import type { ContentBlock_Markdown_Configurator, ContentBlock_Markdown_Props } from '../defineMarkdown';
import type { ContentBlock_Scene_Configurator, ContentBlock_Scene_Props } from '../defineScene';
import type { ContentBlock_Text_Configurator, ContentBlock_Text_Props } from '../defineText';
import type { ContentBlock_Video_Configurator, ContentBlock_Video_Props } from '../defineVideo';
import type { ContentBlock_Youtube_Configurator, ContentBlock_Youtube_Props } from '../defineYoutube';

const contentBlockBase = createContentBlockBaseSchema('checkpoint');

const params = contentBlockBase.shape.params.extend({
  headingLevel: z.number().int().min(1).max(6).optional(),
  showIndices: z.boolean().optional(),
  showChevron: z.boolean().optional(),
  showIcon: z.boolean().optional(),
  indexPosition: z.enum(['left', 'right']).optional(),
  iconPosition: z.enum(['left', 'right']).optional(),
  chevronPosition: z.enum(['left', 'right']).optional(),
  enableChecks: z.boolean().optional(),
  requireCompletion: z.boolean().optional(),
  renderAsGroup: z.boolean().optional(),
});

const checkpointBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type ContentBlock_Checkpoint_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

/** A Checkpoint cannot contain another Checkpoint. Child define* functions validate their own data. */
export type Checkpoint_Allowed_Configurator =
  | ContentBlock_Audio_Configurator
  | ContentBlock_Carousel_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Scene_Configurator
  | ContentBlock_Text_Configurator
  | ContentBlock_Video_Configurator
  | ContentBlock_Youtube_Configurator;

export type Checkpoint_Allowed_Props =
  | ContentBlock_Audio_Props
  | ContentBlock_Carousel_Props
  | ContentBlock_Code_Props
  | ContentBlock_Image_Props
  | ContentBlock_Markdown_Props
  | ContentBlock_Scene_Props
  | ContentBlock_Text_Props
  | ContentBlock_Video_Props
  | ContentBlock_Youtube_Props;

type OrderedContent<Item> = {
  items: Record<string, Item>;
  order: string[];
};

/** `false` is reserved for overrides; initial content must contain question objects. */
export type Checkpoint_Config_Item =
  | {
      question: ContentBlock_Text_Configurator;
      answer: OrderedContent<Checkpoint_Allowed_Configurator>;
      check?: true;
    }
  | false;

export type Checkpoint_Props_Item = {
  question: ContentBlock_Text_Props;
  answer: OrderedContent<Checkpoint_Allowed_Props>;
  check?: true;
};

type Content<Item> = { content: OrderedContent<Item> };

/** Nested content is a TypeScript contract; these Zod schemas validate metadata only. */
export const checkpoint_Config_Schema = checkpointBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema> & Content<Checkpoint_Config_Item>;

export const checkpoint_Props_Schema = checkpointBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema> & Content<Checkpoint_Props_Item>;
