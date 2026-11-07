import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';
import type { ContentBlock_Audio } from './audio.types';
import type { ContentBlock_Code } from './code.types';
import type { ContentBlock_Carousel } from './carousel.types';
import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentBlock_Image } from './image.types';
import type { ContentBlock_Markdown } from './markdown.types';
import type { ContentBlock_Scene, ContentBlock_Scene_LocaleShape } from './scene.types';
import type { ContentBlock_Text } from './text.types';
import type { ContentBlock_Video } from './video.types';
import type { ContentBlock_Youtube } from './youtube.types';

type OtherContentBlocks<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> =
  | ContentBlock_Text<ConfigType, SupportedLanguages>
  | ContentBlock_Scene<ConfigType, SupportedLanguages, ContentBlock_Scene_LocaleShape>
  | ContentBlock_Markdown<ConfigType, SupportedLanguages>
  | ContentBlock_Code<ConfigType, SupportedLanguages>
  | ContentBlock_Audio<ConfigType, SupportedLanguages>
  | ContentBlock_Video<ConfigType, SupportedLanguages>
  | ContentBlock_Youtube<ConfigType, SupportedLanguages>
  | ContentBlock_Image<ConfigType, SupportedLanguages>
  | ContentBlock_Carousel<ConfigType, SupportedLanguages>;

type CheckpointAnswer<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = NonEmptyArray<OtherContentBlocks<ConfigType, SupportedLanguages>>;

type ContentBlock_Checkpoint_Settings = {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  showIndices?: boolean;
  showChevron?: boolean;
  showIcon?: boolean;
  indexPosition?: 'left' | 'right';
  iconPosition?: 'left' | 'right';
  chevronPosition?: 'left' | 'right';
  enableChecks?: boolean;
  /** If true, completing all checkable items is required before leaving this section. */
  requireCompletion?: boolean;
  renderAsGroup?: boolean;
};

type ContentBlock_Checkpoint_Definition = ContentBlock_Definition_Meta<'checkpoint'>;

type ContentBlock_Checkpoint_Data<SupportedLanguages extends Locale_Languages> = ContentBlock_Data_Meta<'checkpoint'> &
  ContentBlock_Checkpoint_Settings & {
    title: Locale_Options<SupportedLanguages>;
    items: {
      question: Locale_Options<SupportedLanguages>;
      answer: CheckpointAnswer<'data', SupportedLanguages>;
      check?: true;
    }[];
  };

export type ContentBlock_Checkpoint_Response<SupportedLanguages extends Locale_Languages> =
  ContentBlock_Response_Meta<'checkpoint'> &
    ContentBlock_Checkpoint_Settings & {
      title: string;
      items: {
        question: string;
        answer: CheckpointAnswer<'response', SupportedLanguages>;
        check?: true;
      }[];
    };

export type ContentBlock_Checkpoint<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  definition: ContentBlock_Checkpoint_Definition;
  data: ContentBlock_Checkpoint_Data<SupportedLanguages>;
  response: ContentBlock_Checkpoint_Response<SupportedLanguages>;
}[ConfigType];
