import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Config, Locale_ResponseParams } from '../locale.types';
import type { ContentBlock_Audio } from './audio.types';
import type { ContentBlock_Code } from './code.types';
import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentBlock_Image } from './image.types';
import type { ContentBlock_Markdown } from './markdown.types';
import type { ContentBlock_Scene } from './scene.types';
import type { ContentBlock_Text } from './text.types';
import type { ContentBlock_Video } from './video.types';
import type { ContentBlock_Youtube } from './youtube.types';

type OtherContentBlocks<ConfigType extends ContentEntity_ConfigType> =
  | ContentBlock_Text<ConfigType>
  | ContentBlock_Scene<ConfigType>
  | ContentBlock_Markdown<ConfigType>
  | ContentBlock_Code<ConfigType>
  | ContentBlock_Audio<ConfigType>
  | ContentBlock_Video<ConfigType>
  | ContentBlock_Youtube<ConfigType>
  | ContentBlock_Image<ConfigType>;

type CheckpointAnswer<ConfigType extends ContentEntity_ConfigType> = NonEmptyArray<OtherContentBlocks<ConfigType>>;

type ContentBlock_Checkpoint_Settings = {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  showIndices?: boolean;
  showChevron?: boolean;
  showIcon?: boolean;
  indexPosition?: 'left' | 'right';
  iconPosition?: 'left' | 'right';
  chevronPosition?: 'left' | 'right';
  enableChecks?: boolean;
  renderAsGroup?: boolean;
};

type ContentBlock_Checkpoint_Definition = ContentBlock_Definition_Meta<'checkpoint'>;

type ContentBlock_Checkpoint_Data = ContentBlock_Data_Meta & ContentBlock_Checkpoint_Settings & {
  title: Locale_Config;
  items: {
    question: Locale_Config;
    answer: CheckpointAnswer<'data'>;
    check?: true;
  }[];
};

type ContentBlock_Checkpoint_Response = ContentBlock_Response_Meta<'checkpoint'> &
  Locale_ResponseParams &
  ContentBlock_Checkpoint_Settings & {
    title: string;
    items: {
      question: string;
      answer: CheckpointAnswer<'response'>;
      check?: true;
    }[];
  };

export type ContentBlock_Checkpoint<ConfigType extends ContentEntity_ConfigType> = {
  definition: ContentBlock_Checkpoint_Definition;
  data: ContentBlock_Checkpoint_Data;
  response: ContentBlock_Checkpoint_Response;
}[ConfigType];
