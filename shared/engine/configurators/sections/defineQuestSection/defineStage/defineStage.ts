import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { LanguageScope, PublicationLanguageOptions } from '#types';

import { resolvePublicationLanguages, scopeBuild } from '../../../_shared__configurators';
import type { ContentBlock_Audio_Overrides } from '../../../contentBlocks/primitive/defineAudio/defineAudio.schemas';
import type { ContentBlock_Image_Overrides } from '../../../contentBlocks/primitive/defineImage/defineImage.schemas';
import type { ContentBlock_Subtitles_Overrides } from '../../../contentBlocks/primitive/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Video_Overrides } from '../../../contentBlocks/primitive/defineVideo/defineVideo.schemas';
import { assertQuestChild, nestQuestPublication, projectQuestTree, validateQuestPublication } from '../quest.utils';
import { stage_Config_Schema, stage_Data_Schema, type Stage_Config } from './defineStage.schemas';

export type Stage_Overrides = {
  content?: {
    video?: { medium?: ContentBlock_Video_Overrides; small?: ContentBlock_Video_Overrides };
    audio?: {
      dialogue?: ContentBlock_Audio_Overrides;
      narration?: ContentBlock_Audio_Overrides;
      background?: ContentBlock_Audio_Overrides;
    };
    image?: ContentBlock_Image_Overrides;
    subtitles?: ContentBlock_Subtitles_Overrides;
  };
};

/** A media-only stage. Audio, video, image and captions are separate required delivery paths. */
export const defineStage = <
  const Slug extends string,
  const Languages extends readonly LanguageCode[] = AllLanguageCodes,
>(
  config: Stage_Config & { slug: Slug },
) => {
  const validate = (value: Stage_Config): void => {
    stage_Config_Schema.parse(value);
    assertQuestChild(value.content.video.medium, 'video', 'content.video.medium');
    assertQuestChild(value.content.video.small, 'video', 'content.video.small');
    for (const kind of ['dialogue', 'narration', 'background'] as const) {
      const audio = value.content.audio[kind];
      if (audio !== null) assertQuestChild(audio, 'audio', 'content.audio.' + kind);
    }
    assertQuestChild(value.content.image, 'image', 'content.image');
    assertQuestChild(value.content.subtitles, 'subtitles', 'content.subtitles');
  };
  const { id, slug, type } = config;
  const { content: _content, ...authoredMetadata } = config;
  const content = {
    video: { ...config.content.video },
    audio: { ...config.content.audio },
    image: config.content.image,
    subtitles: config.content.subtitles,
  };
  const data = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...authoredMetadata, content });
    const output = nestQuestPublication({ id, slug, type }, projectQuestTree(content), 'content');
    validateQuestPublication(stage_Data_Schema, output, languages);
    return output;
  };
  const overrides = (patch: Stage_Overrides, options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    validate({ ...authoredMetadata, content });
    if (
      !patch ||
      typeof patch !== 'object' ||
      Array.isArray(patch) ||
      Object.keys(patch).some(key => key !== 'content')
    )
      throw new Error('Invalid QuestStage overrides');
    const output = nestQuestPublication({}, projectQuestTree(content, patch.content ?? {}), 'content');
    validateQuestPublication(stage_Data_Schema, data(options), languages, output);
    return output;
  };
  const result = {
    id,
    slug,
    type,
    content,
    validate,
    build: scopeBuild({ data, overrides }),
    config: {
      base: { id, slug, type },
      locales: () => ({}),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type Stage_Configurator = ReturnType<typeof defineStage>;
