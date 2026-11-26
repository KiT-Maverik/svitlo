import { z } from 'zod';

import { identityBase_Schema } from '../../../../_shared__configurators/common.schemas';
import { primitiveContentBlockConfigurator_Schema } from '../../../contentBlock.schemas';
import type {
  ContentBlock_Audio_Configurator,
  ContentBlock_Audio_Props,
  ContentBlock_Audio_PropsBase,
} from '../../../primitive/defineAudio';
import { audio_Props_Schema } from '../../../primitive/defineAudio/defineAudio.schemas';
import type {
  ContentBlock_Code_Configurator,
  ContentBlock_Code_Props,
  ContentBlock_Code_PropsBase,
} from '../../../primitive/defineCode';
import { code_Props_Schema } from '../../../primitive/defineCode/defineCode.schemas';
import type {
  ContentBlock_Image_Configurator,
  ContentBlock_Image_Props,
  ContentBlock_Image_PropsBase,
} from '../../../primitive/defineImage';
import { image_Props_Schema } from '../../../primitive/defineImage/defineImage.schemas';
import type {
  ContentBlock_Markdown_Configurator,
  ContentBlock_Markdown_Props,
  ContentBlock_Markdown_PropsBase,
} from '../../../primitive/defineMarkdown';
import { markdown_Props_Schema } from '../../../primitive/defineMarkdown/defineMarkdown.schemas';
import type {
  ContentBlock_Scene_Configurator,
  ContentBlock_Scene_Props,
  ContentBlock_Scene_PropsBase,
} from '../../../primitive/defineScene';
import { scene_Props_Schema } from '../../../primitive/defineScene/defineScene.schemas';
import type {
  ContentBlock_Subtitles_Configurator,
  ContentBlock_Subtitles_Props,
} from '../../../primitive/defineSubtitles';
import { subtitles_Props_Schema } from '../../../primitive/defineSubtitles/defineSubtitles.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Props,
  ContentBlock_Text_PropsBase,
} from '../../../primitive/defineText';
import { text_Props_Schema } from '../../../primitive/defineText/defineText.schemas';
import type {
  ContentBlock_Video_Configurator,
  ContentBlock_Video_Props,
  ContentBlock_Video_PropsBase,
} from '../../../primitive/defineVideo';
import { video_Props_Schema } from '../../../primitive/defineVideo/defineVideo.schemas';
import type {
  ContentBlock_Youtube_Configurator,
  ContentBlock_Youtube_Props,
  ContentBlock_Youtube_PropsBase,
} from '../../../primitive/defineYoutube';
import { youtube_Props_Schema } from '../../../primitive/defineYoutube/defineYoutube.schemas';

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
export type Checkpoint_Allowed_Props =
  | ContentBlock_Audio_Props
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
export const checkpointAnswer_Child_Props_Schema = z.discriminatedUnion('type', [
  audio_Props_Schema,
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
