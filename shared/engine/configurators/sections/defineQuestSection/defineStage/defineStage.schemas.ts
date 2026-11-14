import { z } from 'zod';
import { identityBase_Schema } from '../../../_shared__configurators/common.schemas';
import { video_Props_Schema } from '../../../contentBlocks/defineVideo/defineVideo.schemas';
import { audio_Props_Schema } from '../../../contentBlocks/defineAudio/defineAudio.schemas';
import { image_Props_Schema } from '../../../contentBlocks/defineImage/defineImage.schemas';
import { subtitles_Props_Schema } from '../../../contentBlocks/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Video_Configurator } from '../../../contentBlocks/defineVideo';
import type { ContentBlock_Audio_Configurator } from '../../../contentBlocks/defineAudio';
import type { ContentBlock_Image_Configurator } from '../../../contentBlocks/defineImage';
import type { ContentBlock_Subtitles_Configurator } from '../../../contentBlocks/defineSubtitles';

const kind = identityBase_Schema.extend({ type: z.literal('questStage') });
export const stage_Config_Schema = kind
  .extend({
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
      subtitles: z.custom<ContentBlock_Subtitles_Configurator>(),
    }),
  })
  .strict();
export const stage_Props_Schema = kind
  .extend({
    content: z.strictObject({
      video: z.strictObject({ medium: video_Props_Schema, small: video_Props_Schema }),
      audio: z.strictObject({
        dialogue: audio_Props_Schema.nullable(),
        narration: audio_Props_Schema.nullable(),
        background: audio_Props_Schema.nullable(),
      }),
      image: image_Props_Schema,
      subtitles: subtitles_Props_Schema,
    }),
  })
  .strict();
export type Stage_Config = z.infer<typeof stage_Config_Schema>;
export type Stage_Props = z.infer<typeof stage_Props_Schema>;
