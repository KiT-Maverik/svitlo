import { z } from 'zod';
import { identityBase_Schema } from '../../../_shared__configurators/common.schemas';
import { audio_Props_Schema } from '../../defineAudio/defineAudio.schemas';
import type {
  ContentBlock_Audio_Configurator,
  ContentBlock_Audio_Props,
  ContentBlock_Audio_PropsBase,
} from '../../defineAudio';
import { carousel_Props_Schema } from '../../defineCarousel/defineCarousel.schemas';
import type {
  ContentBlock_Carousel_Configurator,
  ContentBlock_Carousel_Props,
  ContentBlock_Carousel_PropsBase,
} from '../../defineCarousel';
import { code_Props_Schema } from '../../defineCode/defineCode.schemas';
import type {
  ContentBlock_Code_Configurator,
  ContentBlock_Code_Props,
  ContentBlock_Code_PropsBase,
} from '../../defineCode';
import { image_Props_Schema } from '../../defineImage/defineImage.schemas';
import type {
  ContentBlock_Image_Configurator,
  ContentBlock_Image_Props,
  ContentBlock_Image_PropsBase,
} from '../../defineImage';
import { markdown_Props_Schema } from '../../defineMarkdown/defineMarkdown.schemas';
import type {
  ContentBlock_Markdown_Configurator,
  ContentBlock_Markdown_Props,
  ContentBlock_Markdown_PropsBase,
} from '../../defineMarkdown';
import { scene_Props_Schema } from '../../defineScene/defineScene.schemas';
import type {
  ContentBlock_Scene_Configurator,
  ContentBlock_Scene_Props,
  ContentBlock_Scene_PropsBase,
} from '../../defineScene';
import { subtitles_Props_Schema } from '../../defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Subtitles_Configurator, ContentBlock_Subtitles_Props } from '../../defineSubtitles';
import { text_Props_Schema } from '../../defineText/defineText.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Props,
  ContentBlock_Text_PropsBase,
} from '../../defineText';
import { video_Props_Schema } from '../../defineVideo/defineVideo.schemas';
import type {
  ContentBlock_Video_Configurator,
  ContentBlock_Video_Props,
  ContentBlock_Video_PropsBase,
} from '../../defineVideo';
import { youtube_Props_Schema } from '../../defineYoutube/defineYoutube.schemas';
import type {
  ContentBlock_Youtube_Configurator,
  ContentBlock_Youtube_Props,
  ContentBlock_Youtube_PropsBase,
} from '../../defineYoutube';

export type Checkpoint_Allowed_Configurator =
  | ContentBlock_Audio_Configurator
  | ContentBlock_Carousel_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Scene_Configurator
  | ContentBlock_Subtitles_Configurator
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
  | ContentBlock_Subtitles_Props
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
  | ReturnType<ContentBlock_Subtitles_Configurator['build']['props']>['base']
  | ContentBlock_Text_PropsBase
  | ContentBlock_Video_PropsBase
  | ContentBlock_Youtube_PropsBase;

const answerBase = identityBase_Schema.extend({ type: z.literal('checkpointAnswer') });
export const checkpointAnswer_Config_Schema = answerBase.extend({
  content: z.object({
    items: z.record(z.string(), z.custom<Checkpoint_Allowed_Configurator>()),
    order: z.array(z.string()),
  }),
});
export type ContentBlock_CheckpointAnswer_Config = z.infer<typeof checkpointAnswer_Config_Schema>;
export const checkpointAnswer_Child_Props_Schema = z.discriminatedUnion('type', [
  audio_Props_Schema,
  carousel_Props_Schema,
  code_Props_Schema,
  image_Props_Schema,
  markdown_Props_Schema,
  scene_Props_Schema,
  subtitles_Props_Schema,
  text_Props_Schema,
  video_Props_Schema,
  youtube_Props_Schema,
]);
export const checkpointAnswer_Props_Schema = answerBase.extend({
  content: z.array(checkpointAnswer_Child_Props_Schema).min(1),
});
export type ContentBlock_CheckpointAnswer_Props = Omit<z.infer<typeof checkpointAnswer_Props_Schema>, 'content'> & {
  content: Checkpoint_Allowed_Props[];
};
export type CheckpointAnswer_Overrides<
  Items extends Record<string, Checkpoint_Allowed_Configurator>,
  Added extends Record<string, Checkpoint_Allowed_Configurator> = {},
> = {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};
