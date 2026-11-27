import { z } from 'zod';

import { identityBase_Schema } from '../../../../_shared__configurators/common.schemas';
import { primitiveContentBlockConfigurator_Schema } from '../../../contentBlock.schemas';
import type {
  ContentBlock_Audio_Configurator,
  ContentBlock_Audio_Data,
  ContentBlock_Audio_DataBase,
} from '../../../primitive/defineAudio';
import { audio_Data_Schema } from '../../../primitive/defineAudio/defineAudio.schemas';
import type {
  ContentBlock_Code_Configurator,
  ContentBlock_Code_Data,
  ContentBlock_Code_DataBase,
} from '../../../primitive/defineCode';
import { code_Data_Schema } from '../../../primitive/defineCode/defineCode.schemas';
import type {
  ContentBlock_Image_Configurator,
  ContentBlock_Image_Data,
  ContentBlock_Image_DataBase,
} from '../../../primitive/defineImage';
import { image_Data_Schema } from '../../../primitive/defineImage/defineImage.schemas';
import type {
  ContentBlock_Markdown_Configurator,
  ContentBlock_Markdown_Data,
  ContentBlock_Markdown_DataBase,
} from '../../../primitive/defineMarkdown';
import { markdown_Data_Schema } from '../../../primitive/defineMarkdown/defineMarkdown.schemas';
import type {
  ContentBlock_Scene_Configurator,
  ContentBlock_Scene_Data,
  ContentBlock_Scene_DataBase,
} from '../../../primitive/defineScene';
import { scene_Data_Schema } from '../../../primitive/defineScene/defineScene.schemas';
import type {
  ContentBlock_Subtitles_Configurator,
  ContentBlock_Subtitles_Data,
} from '../../../primitive/defineSubtitles';
import { subtitles_Data_Schema } from '../../../primitive/defineSubtitles/defineSubtitles.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Data,
  ContentBlock_Text_DataBase,
} from '../../../primitive/defineText';
import { text_Data_Schema } from '../../../primitive/defineText/defineText.schemas';
import type {
  ContentBlock_Video_Configurator,
  ContentBlock_Video_Data,
  ContentBlock_Video_DataBase,
} from '../../../primitive/defineVideo';
import { video_Data_Schema } from '../../../primitive/defineVideo/defineVideo.schemas';
import type {
  ContentBlock_Youtube_Configurator,
  ContentBlock_Youtube_Data,
  ContentBlock_Youtube_DataBase,
} from '../../../primitive/defineYoutube';
import { youtube_Data_Schema } from '../../../primitive/defineYoutube/defineYoutube.schemas';

export type Checkpoint_Allowed_Configurator =
  | ContentBlock_Audio_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Scene_Configurator
  | ContentBlock_Subtitles_Configurator
  | ContentBlock_Text_Configurator
  | ContentBlock_Video_Configurator
  | ContentBlock_Youtube_Configurator;
export type Checkpoint_Allowed_Data =
  | ContentBlock_Audio_Data
  | ContentBlock_Code_Data
  | ContentBlock_Image_Data
  | ContentBlock_Markdown_Data
  | ContentBlock_Scene_Data
  | ContentBlock_Subtitles_Data
  | ContentBlock_Text_Data
  | ContentBlock_Video_Data
  | ContentBlock_Youtube_Data;
export type Checkpoint_Allowed_DataBase =
  | ContentBlock_Audio_DataBase
  | ContentBlock_Code_DataBase
  | ContentBlock_Image_DataBase
  | ContentBlock_Markdown_DataBase
  | ContentBlock_Scene_DataBase
  | ReturnType<ContentBlock_Subtitles_Configurator['build']['data']>['base']
  | ContentBlock_Text_DataBase
  | ContentBlock_Video_DataBase
  | ContentBlock_Youtube_DataBase;

const answerBase = identityBase_Schema.extend({ type: z.literal('checkpointAnswer') });
export const checkpointAnswer_Config_Schema = answerBase.extend({
  content: z.object({
    items: z.record(
      z.string(),
      z.custom<Checkpoint_Allowed_Configurator>(
        value => primitiveContentBlockConfigurator_Schema.safeParse(value).success,
        { message: 'CheckpointAnswer accepts only Primitive ContentBlocks' },
      ),
    ),
    order: z.array(z.string()),
  }),
});
export type ContentBlock_CheckpointAnswer_Config = z.infer<typeof checkpointAnswer_Config_Schema>;
export const checkpointAnswer_Child_Data_Schema = z.discriminatedUnion('type', [
  audio_Data_Schema,
  code_Data_Schema,
  image_Data_Schema,
  markdown_Data_Schema,
  scene_Data_Schema,
  subtitles_Data_Schema,
  text_Data_Schema,
  video_Data_Schema,
  youtube_Data_Schema,
]);
export const checkpointAnswer_Data_Schema = answerBase.extend({
  content: z.array(checkpointAnswer_Child_Data_Schema).min(1),
});
export type ContentBlock_CheckpointAnswer_Data = Omit<z.infer<typeof checkpointAnswer_Data_Schema>, 'content'> & {
  content: Checkpoint_Allowed_Data[];
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
