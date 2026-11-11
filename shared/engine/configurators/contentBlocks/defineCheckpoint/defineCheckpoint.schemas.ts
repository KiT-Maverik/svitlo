import { z } from 'zod';

import {
  createContentBlockBaseSchema,
  localizationSwitch,
} from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';
import type {ContentBlock_Audio_Props, ContentBlock_Audio_Configurator} from "../defineAudio";
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Props} from "../defineCarousel";
import type {ContentBlock_Code_Configurator, ContentBlock_Code_Props} from "../defineCode";
import type {ContentBlock_Image_Configurator, ContentBlock_Image_Props} from "../defineImage";

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

type Config_Content_Items =
  Record<
    string,
    ContentBlock_Audio_Configurator |
    ContentBlock_Image_Configurator |
    ContentBlock_Carousel_Configurator |
    ContentBlock_Code_Configurator
  >

type Props_Content_Items =
  Array<
    ContentBlock_Audio_Props |
    ContentBlock_Image_Props |
    ContentBlock_Carousel_Props |
    ContentBlock_Code_Props
  >;

type Content<Items extends Props_Content_Items | Config_Content_Items> = {
  content: {
    items: Items;
    order: string[];
  }
}

export const checkpoint_Config_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('config')),
});
export type ContentBlock_Checkpoint_Config = z.infer<typeof checkpoint_Config_Schema> & Content<Config_Content_Items>;

export const checkpoint_Props_Schema = checkpointBase.extend({
  ...addUnifiedLocale(locale('props')),
});
export type ContentBlock_Checkpoint_Props = z.infer<typeof checkpoint_Props_Schema> & Content<Props_Content_Items>;
