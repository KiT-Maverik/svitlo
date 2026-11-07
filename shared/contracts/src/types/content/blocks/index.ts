import type { Locale_Languages } from '../locale.types';
import type { ContentBlock_Audio } from './audio.types';
import type { ContentBlock_Checkpoint } from './checkpoint.types';
import type { ContentBlock_Code } from './code.types';
import type { ContentBlock_Carousel } from './carousel.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock_Image } from './image.types';
import type { ContentBlock_Markdown } from './markdown.types';
import type { ContentBlock_Scene, ContentBlock_Scene_LocaleShape } from './scene.types';
import type { ContentBlock_Text } from './text.types';
import type { ContentBlock_Video } from './video.types';
import type { ContentBlock_Youtube } from './youtube.types';

export type ContentBlock<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> =
  | ContentBlock_Text<ConfigType, SupportedLanguages>
  | ContentBlock_Checkpoint<ConfigType, SupportedLanguages>
  | ContentBlock_Scene<ConfigType, SupportedLanguages, ContentBlock_Scene_LocaleShape>
  | ContentBlock_Markdown<ConfigType, SupportedLanguages>
  | ContentBlock_Code<ConfigType, SupportedLanguages>
  | ContentBlock_Audio<ConfigType, SupportedLanguages>
  | ContentBlock_Video<ConfigType, SupportedLanguages>
  | ContentBlock_Youtube<ConfigType, SupportedLanguages>
  | ContentBlock_Image<ConfigType, SupportedLanguages>
  | ContentBlock_Carousel<ConfigType, SupportedLanguages>;

export type {
  ContentBlock_Audio,
  ContentBlock_Checkpoint,
  ContentBlock_Code,
  ContentBlock_Image,
  ContentBlock_Carousel,
  ContentBlock_Markdown,
  ContentBlock_Scene,
  ContentBlock_Text,
  ContentBlock_Video,
  ContentBlock_Youtube,
};

export type {
  ContentBlock_Text_Data,
  ContentBlock_Text_Presentation,
  ContentBlock_Text_Response,
  ContentBlock_Text_Wrap,
} from './text.types';

export type { ContentBlock_Youtube_Response } from './youtube.types';
export type { ContentBlock_Video_Response } from './video.types';
export type { ContentBlock_Image_Response } from './image.types';
export type { ContentBlock_Carousel_Response, ContentBlock_Carousel_Slide_Response } from './carousel.types';
export type { ContentBlock_Checkpoint_Response } from './checkpoint.types';
export type { ContentBlock_Audio_Response } from './audio.types';
export type { ContentBlock_Code_Response } from './code.types';
export type { ContentBlock_Markdown_Response } from './markdown.types';

export type { HighlightTone, StyledText_Rule, StyledText_Rules, StyledTextStyle } from '../../text.types';

export type { ContentBlock_Type } from './common.types';
