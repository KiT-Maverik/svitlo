import { z } from 'zod';

import { identityBase_Schema } from '../../../_shared__configurators';
import { contentBlockResolved_Schema } from '../../contentBlock.schemas';
import type { ContentBlock_Audio_Configurator, ContentBlock_Audio_Props } from '../../defineAudio';
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Props } from '../../defineCarousel';
import type { ContentBlock_Code_Configurator, ContentBlock_Code_Props } from '../../defineCode';
import type { ContentBlock_Image_Configurator, ContentBlock_Image_Props } from '../../defineImage';
import type { ContentBlock_Markdown_Configurator, ContentBlock_Markdown_Props } from '../../defineMarkdown';
import type { ContentBlock_Scene_Configurator, ContentBlock_Scene_Props } from '../../defineScene';
import { text_Props_Schema } from '../../defineText';
import type { ContentBlock_Text_Configurator, ContentBlock_Text_Overrides, ContentBlock_Text_Props } from '../../defineText';
import type { ContentBlock_Video_Configurator, ContentBlock_Video_Props } from '../../defineVideo';
import type { ContentBlock_Youtube_Configurator, ContentBlock_Youtube_Props } from '../../defineYoutube';

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

type OrderedContent<Item> = { items: Record<string, Item>; order: string[] };

const checkpointItemBase = identityBase_Schema.extend({
  type: z.literal('checkpointItem'),
  check: z.literal(true).optional(),
});

/** Nested children remain configurators; their internal schemas belong to them. */
export const checkpointItem_Config_Schema = checkpointItemBase;
export type ContentBlock_CheckpointItem_Config = z.infer<typeof checkpointItem_Config_Schema> & {
  question: ContentBlock_Text_Configurator;
  answer: OrderedContent<Checkpoint_Allowed_Configurator>;
};

/** Resolved Props never contain authoring-only items/order or configurator instances. */
export const checkpointItem_Props_Schema = checkpointItemBase.extend({
  question: text_Props_Schema,
  answer: z.array(contentBlockResolved_Schema).min(1),
});
export type ContentBlock_CheckpointItem_Props = Omit<z.infer<typeof checkpointItem_Props_Schema>, 'answer'> & {
  question: ContentBlock_Text_Props;
  answer: Checkpoint_Allowed_Props[];
};

/** A mandatory Checkpoint question cannot be disabled through its nested override. */
export type CheckpointItem_Question_Overrides = Omit<ContentBlock_Text_Overrides, 'params'> & {
  params?: Omit<NonNullable<ContentBlock_Text_Overrides['params']>, 'disabled'> & { disabled?: never };
};

/** Existing answer overrides are slug-specific; additions are full configurators. */
export type CheckpointItem_Overrides<
  Answers extends Record<string, Checkpoint_Allowed_Configurator>,
  Added extends Record<string, Checkpoint_Allowed_Configurator> = {},
> = {
  check?: true;
  question?: CheckpointItem_Question_Overrides;
  answer?: {
    items?: { [Key in keyof Answers]?: Parameters<Answers[Key]['build']['overrides']>[0] | false };
    order?: Extract<keyof Answers | keyof NoInfer<Added>, string>[];
  };
  additionalContentBlocks?: Added & { [Key in keyof Answers]?: never };
};
