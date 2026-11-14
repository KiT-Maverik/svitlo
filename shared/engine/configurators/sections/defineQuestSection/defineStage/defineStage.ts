import type { LanguageScope, PublicationLanguageOptions } from '#types';
import type { AllLanguageCodes, LanguageCode } from '#schemas';
import type { ContentBlock_Video_Overrides } from '../../../contentBlocks/defineVideo/defineVideo.schemas';
import type { ContentBlock_Audio_Overrides } from '../../../contentBlocks/defineAudio/defineAudio.schemas';
import type { ContentBlock_Image_Overrides } from '../../../contentBlocks/defineImage/defineImage.schemas';
import { resolvePublicationLanguages } from '../../../_shared__configurators';
import { stage_Config_Schema, stage_Props_Schema, type Stage_Config } from './defineStage.schemas';
import type { ContentBlock_Subtitles_Overrides } from '../../../contentBlocks/defineSubtitles/defineSubtitles.schemas';
import { assertQuestChild, projectQuestTree, nestQuestPublication, validateQuestPublication } from '../quest.utils';

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
>(config: Stage_Config & { slug: Slug }) => {
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
  validate(config);
  const { id, slug, type } = config;
  const content = {
    video: { ...config.content.video },
    audio: { ...config.content.audio },
    image: config.content.image,
    subtitles: config.content.subtitles,
  };
  const props = (options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    const output = nestQuestPublication({ id, slug, type }, projectQuestTree(content, languages), 'content');
    validateQuestPublication(stage_Props_Schema, output, languages);
    return output;
  };
  const overrides = (patch: Stage_Overrides, options: PublicationLanguageOptions<Languages>) => {
    const languages = resolvePublicationLanguages(options);
    if (!patch || typeof patch !== 'object' || Array.isArray(patch) ||
      Object.keys(patch).some(key => key !== 'content')) throw new Error('Invalid QuestStage overrides');
    const output = nestQuestPublication({}, projectQuestTree(content, languages, patch.content ?? {}), 'content');
    validateQuestPublication(stage_Props_Schema, props(options), languages, output);
    return output;
  };
  const result = {
    id, slug, type, content, validate,
    build: { props, overrides },
    config: {
      base: { id, slug, type },
      locales: () => ({}),
      validate,
    },
  } as const;
  return result as typeof result & LanguageScope<Languages>;
};
export type Stage_Configurator = ReturnType<typeof defineStage>;
