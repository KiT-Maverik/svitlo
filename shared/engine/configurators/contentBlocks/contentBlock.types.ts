import type { ConfiguratorChild } from '../../types/configuratorChild';
import type { ContentBlock_Text_Configurator, ContentBlock_Text_Props } from './primitive/defineText';
import type { ContentBlock_Markdown_Configurator, ContentBlock_Markdown_Props } from './primitive/defineMarkdown';
import type { ContentBlock_Code_Configurator, ContentBlock_Code_Props } from './primitive/defineCode';
import type { ContentBlock_Image_Configurator, ContentBlock_Image_Props } from './primitive/defineImage';
import type { ContentBlock_Audio_Configurator, ContentBlock_Audio_Props } from './primitive/defineAudio';
import type { ContentBlock_Video_Configurator, ContentBlock_Video_Props } from './primitive/defineVideo';
import type { ContentBlock_Youtube_Configurator, ContentBlock_Youtube_Props } from './primitive/defineYoutube';
import type { ContentBlock_Subtitles_Configurator, ContentBlock_Subtitles_Props } from './primitive/defineSubtitles';
import type { ContentBlock_Scene_Configurator, ContentBlock_Scene_Props } from './primitive/defineScene';
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Props } from './composite/defineCarousel';
import type { ContentBlock_Checkpoint_Configurator, ContentBlock_Checkpoint_Props } from './composite/defineCheckpoint';
import type { ContentBlock_Text_Config } from './primitive/defineText/defineText.schemas';
import type { ContentBlock_Markdown_Config } from './primitive/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Code_Config } from './primitive/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Config } from './primitive/defineImage/defineImage.schemas';
import type { ContentBlock_Audio_Config } from './primitive/defineAudio/defineAudio.schemas';
import type { ContentBlock_Video_Config } from './primitive/defineVideo/defineVideo.schemas';
import type { ContentBlock_Youtube_Config } from './primitive/defineYoutube/defineYoutube.schemas';
import type { ContentBlock_Subtitles_Config } from './primitive/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Scene_Config } from './primitive/defineScene/defineScene.schemas';
import type { ContentBlock_Carousel_Config } from './composite/defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Checkpoint_Config } from './composite/defineCheckpoint/defineCheckpoint.schemas';

export type ContentBlock_Primitive_Configurator = ConfiguratorChild<
  | ContentBlock_Text_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Audio_Configurator
  | ContentBlock_Video_Configurator
  | ContentBlock_Youtube_Configurator
  | ContentBlock_Subtitles_Configurator
  | ContentBlock_Scene_Configurator
>;
export type ContentBlock_Composite_Configurator = ConfiguratorChild<
  | ContentBlock_Carousel_Configurator
  | ContentBlock_Checkpoint_Configurator
>;
export type ContentBlock_Configurator = ContentBlock_Primitive_Configurator | ContentBlock_Composite_Configurator;

export type ContentBlock_Primitive_Props = 
  | ContentBlock_Text_Props
  | ContentBlock_Markdown_Props
  | ContentBlock_Code_Props
  | ContentBlock_Image_Props
  | ContentBlock_Audio_Props
  | ContentBlock_Video_Props
  | ContentBlock_Youtube_Props
  | ContentBlock_Subtitles_Props
  | ContentBlock_Scene_Props
;
export type ContentBlock_Composite_Props = 
  | ContentBlock_Carousel_Props
  | ContentBlock_Checkpoint_Props
;
export type ContentBlock_Props = ContentBlock_Primitive_Props | ContentBlock_Composite_Props;

export type ContentBlock_Primitive_Config = 
  | ContentBlock_Text_Config
  | ContentBlock_Markdown_Config
  | ContentBlock_Code_Config
  | ContentBlock_Image_Config
  | ContentBlock_Audio_Config
  | ContentBlock_Video_Config
  | ContentBlock_Youtube_Config
  | ContentBlock_Subtitles_Config
  | ContentBlock_Scene_Config
;
export type ContentBlock_Composite_Config = 
  | ContentBlock_Carousel_Config
  | ContentBlock_Checkpoint_Config
;
export type ContentBlock_Config = ContentBlock_Primitive_Config | ContentBlock_Composite_Config;

export type ContentBlock_Primitive_PropsBase = ReturnType<ContentBlock_Primitive_Configurator['build']['props']>['base'];
export type ContentBlock_Composite_PropsBase = ReturnType<ContentBlock_Composite_Configurator['build']['props']>['base'];
export type ContentBlock_PropsBase = ContentBlock_Primitive_PropsBase | ContentBlock_Composite_PropsBase;
