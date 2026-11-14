import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, camelCase_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { video_Props_Schema } from '../../contentBlocks/defineVideo/defineVideo.schemas';
import { audio_Props_Schema } from '../../contentBlocks/defineAudio/defineAudio.schemas';
import { image_Props_Schema } from '../../contentBlocks/defineImage/defineImage.schemas';
import { scene_Props_Schema } from '../../contentBlocks/defineScene/defineScene.schemas';
import type { ContentBlock_Video_Configurator } from '../../contentBlocks/defineVideo';
import type { ContentBlock_Audio_Configurator } from '../../contentBlocks/defineAudio';
import type { ContentBlock_Image_Configurator } from '../../contentBlocks/defineImage';
import type { ContentBlock_Scene_Configurator } from '../../contentBlocks/defineScene';
import type { QuestSubtitles_Configurator } from './defineSubtitles';
import type { QuestStage_Configurator } from './defineQuestStage';
import type { QuestTask_Configurator } from './defineQuestTask';

const kind = <const Type extends string>(type: Type) => identityBase_Schema.extend({ type: z.literal(type) });
export const questSubtitles_Config_Schema = kind('subtitles').extend({
  params: paramsBase_Schema.shape.params,
  ...addUnifiedLocale({ fileLocation: localizationSwitch.config }),
}).strict();
export const questSubtitles_Props_Schema = kind('subtitles').extend({
  params: paramsBase_Schema.shape.params,
  ...addUnifiedLocale({ fileLocation: localizationSwitch.props }),
}).strict();
export type QuestSubtitles_Config = z.infer<typeof questSubtitles_Config_Schema>;
export type QuestSubtitles_Props = z.infer<typeof questSubtitles_Props_Schema>;
export const questSubtitles_Override_Schema = z.deepPartial(
  deepStrict_Schema(z.object({
    params: questSubtitles_Config_Schema.shape.params,
    locale: questSubtitles_Config_Schema.shape.locale,
  })),
);
export type QuestSubtitles_Overrides = z.infer<typeof questSubtitles_Override_Schema>;

export const questStage_Config_Schema = kind('questStage').extend({
  content: z.strictObject({
    video: z.strictObject({
      medium: z.custom<ContentBlock_Video_Configurator>(),
      small: z.custom<ContentBlock_Video_Configurator>(),
    }),
    audio: z.strictObject({
      dialogue: z.custom<ContentBlock_Audio_Configurator>().nullable(),
      narration: z.custom<ContentBlock_Audio_Configurator>().nullable(),
      background: z.custom<ContentBlock_Audio_Configurator>().nullable(),
    }),
    image: z.custom<ContentBlock_Image_Configurator>(),
    subtitles: z.custom<QuestSubtitles_Configurator>(),
  }),
}).strict();
export const questStage_Props_Schema = kind('questStage').extend({
  content: z.strictObject({
    video: z.strictObject({ medium: video_Props_Schema, small: video_Props_Schema }),
    audio: z.strictObject({
      dialogue: audio_Props_Schema.nullable(),
      narration: audio_Props_Schema.nullable(),
      background: audio_Props_Schema.nullable(),
    }),
    image: image_Props_Schema,
    subtitles: questSubtitles_Props_Schema,
  }),
}).strict();
export type QuestStage_Config = z.infer<typeof questStage_Config_Schema>;
export type QuestStage_Props = z.infer<typeof questStage_Props_Schema>;

export const questTask_Config_Schema = kind('questTask').extend({
  scene: z.custom<ContentBlock_Scene_Configurator>(),
}).strict();
export const questTask_Props_Schema = kind('questTask').extend({
  scene: scene_Props_Schema,
}).strict();
export type QuestTask_Config = z.infer<typeof questTask_Config_Schema>;
export type QuestTask_Props = z.infer<typeof questTask_Props_Schema>;

const section = kind('quest').extend({
  params: paramsBase_Schema.shape.params.extend({ skippable: z.boolean().optional() }),
});
export const questSection_Config_Schema = section.extend({
  ...addUnifiedLocale({ title: localizationSwitch.config, navigationLabel: localizationSwitch.config }),
  stages: z.record(camelCase_Schema, z.custom<QuestStage_Configurator>()),
  tasks: z.record(camelCase_Schema, z.custom<QuestTask_Configurator>()),
}).strict();
export const questSection_Props_Schema = section.extend({
  ...addUnifiedLocale({ title: localizationSwitch.props, navigationLabel: localizationSwitch.props }),
  stages: z.record(camelCase_Schema, questStage_Props_Schema),
  tasks: z.record(camelCase_Schema, questTask_Props_Schema),
}).strict();
export type QuestSection_Config = z.infer<typeof questSection_Config_Schema>;
export type QuestSection_Props = z.infer<typeof questSection_Props_Schema>;
export const questSection_Override_Metadata_Schema = z.deepPartial(
  deepStrict_Schema(z.object({
    params: questSection_Config_Schema.shape.params,
    locale: questSection_Config_Schema.shape.locale,
  })),
);
export type QuestSection_Metadata_Overrides = DeepPartial<Pick<QuestSection_Config, 'params' | 'locale'>>;
