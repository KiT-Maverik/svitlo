import { z } from 'zod';

import { identityBase_Schema } from '../../../_shared__configurators';
import { audio_Props_Schema } from '../../defineAudio';
import type { ContentBlock_Audio_Configurator, ContentBlock_Audio_Props, ContentBlock_Audio_PropsBase } from '../../defineAudio';
import { carousel_Props_Schema } from '../../defineCarousel';
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Props, ContentBlock_Carousel_PropsBase } from '../../defineCarousel';
import { code_Props_Schema } from '../../defineCode';
import type { ContentBlock_Code_Configurator, ContentBlock_Code_Props, ContentBlock_Code_PropsBase } from '../../defineCode';
import { image_Props_Schema } from '../../defineImage';
import type { ContentBlock_Image_Configurator, ContentBlock_Image_Props, ContentBlock_Image_PropsBase } from '../../defineImage';
import { markdown_Props_Schema } from '../../defineMarkdown';
import type { ContentBlock_Markdown_Configurator, ContentBlock_Markdown_Props, ContentBlock_Markdown_PropsBase } from '../../defineMarkdown';
import { scene_Props_Schema } from '../../defineScene';
import type { ContentBlock_Scene_Configurator, ContentBlock_Scene_Props, ContentBlock_Scene_PropsBase } from '../../defineScene';
import { text_Props_Schema } from '../../defineText';
import type { ContentBlock_Text_Configurator, ContentBlock_Text_Overrides, ContentBlock_Text_Props, ContentBlock_Text_PropsBase } from '../../defineText';
import { video_Props_Schema } from '../../defineVideo';
import type { ContentBlock_Video_Configurator, ContentBlock_Video_Props, ContentBlock_Video_PropsBase } from '../../defineVideo';
import { youtube_Props_Schema } from '../../defineYoutube';
import type { ContentBlock_Youtube_Configurator, ContentBlock_Youtube_Props, ContentBlock_Youtube_PropsBase } from '../../defineYoutube';

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

export type Checkpoint_Allowed_PropsBase =
  | ContentBlock_Audio_PropsBase
  | ContentBlock_Carousel_PropsBase
  | ContentBlock_Code_PropsBase
  | ContentBlock_Image_PropsBase
  | ContentBlock_Markdown_PropsBase
  | ContentBlock_Scene_PropsBase
  | ContentBlock_Text_PropsBase
  | ContentBlock_Video_PropsBase
  | ContentBlock_Youtube_PropsBase;

const checkpointItemBase = identityBase_Schema.extend({
  type: z.literal('checkpointItem'),
  check: z.literal(true).optional(),
});

/** The owning CheckpointItem.validate() enforces child kinds and identity. */
export const checkpointItem_Config_Schema = checkpointItemBase.extend({
  question: z.custom<ContentBlock_Text_Configurator>(value => value !== undefined && value !== null),
  answer: z.object({
    items: z.record(z.string(), z.custom<Checkpoint_Allowed_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type ContentBlock_CheckpointItem_Config = z.infer<typeof checkpointItem_Config_Schema>;

/** Props schema validates each permitted answer's concrete discriminated type. */
const checkpointAnswer_Props_Schema = z.discriminatedUnion('type', [
  audio_Props_Schema,
  carousel_Props_Schema,
  code_Props_Schema,
  image_Props_Schema,
  markdown_Props_Schema,
  scene_Props_Schema,
  text_Props_Schema,
  video_Props_Schema,
  youtube_Props_Schema,
]);
export const checkpointItem_Props_Schema = checkpointItemBase.extend({
  question: text_Props_Schema,
  answer: z.array(checkpointAnswer_Props_Schema).min(1),
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
    additionalItems?: Added & { [Key in keyof Answers]?: never };
    order?: Extract<keyof Answers | keyof NoInfer<Added>, string>[];
  };
};
