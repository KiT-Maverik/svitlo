import type { ConfiguratorChild } from '../../types/configuratorChild';
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Data } from './composite/defineCarousel';
import type { ContentBlock_Carousel_Config } from './composite/defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Checkpoint_Configurator, ContentBlock_Checkpoint_Data } from './composite/defineCheckpoint';
import type { ContentBlock_Checkpoint_Config } from './composite/defineCheckpoint/defineCheckpoint.schemas';
import type { ContentBlock_Audio_Configurator, ContentBlock_Audio_Data } from './primitive/defineAudio';
import type { ContentBlock_Audio_Config } from './primitive/defineAudio/defineAudio.schemas';
import type { ContentBlock_Code_Configurator, ContentBlock_Code_Data } from './primitive/defineCode';
import type { ContentBlock_Code_Config } from './primitive/defineCode/defineCode.schemas';
import type { ContentBlock_Image_Configurator, ContentBlock_Image_Data } from './primitive/defineImage';
import type { ContentBlock_Image_Config } from './primitive/defineImage/defineImage.schemas';
import type { ContentBlock_Markdown_Configurator, ContentBlock_Markdown_Data } from './primitive/defineMarkdown';
import type { ContentBlock_Markdown_Config } from './primitive/defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Scene_Configurator, ContentBlock_Scene_Data } from './primitive/defineScene';
import type { ContentBlock_Scene_Config } from './primitive/defineScene/defineScene.schemas';
import type { ContentBlock_Subtitles_Configurator, ContentBlock_Subtitles_Data } from './primitive/defineSubtitles';
import type { ContentBlock_Subtitles_Config } from './primitive/defineSubtitles/defineSubtitles.schemas';
import type { ContentBlock_Text_Configurator, ContentBlock_Text_Data } from './primitive/defineText';
import type { ContentBlock_Text_Config } from './primitive/defineText/defineText.schemas';
import type { ContentBlock_Video_Configurator, ContentBlock_Video_Data } from './primitive/defineVideo';
import type { ContentBlock_Video_Config } from './primitive/defineVideo/defineVideo.schemas';
import type { ContentBlock_Youtube_Configurator, ContentBlock_Youtube_Data } from './primitive/defineYoutube';
import type { ContentBlock_Youtube_Config } from './primitive/defineYoutube/defineYoutube.schemas';

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
  ContentBlock_Carousel_Configurator | ContentBlock_Checkpoint_Configurator
>;
export type ContentBlock_Configurator = ContentBlock_Primitive_Configurator | ContentBlock_Composite_Configurator;

export type ContentBlock_Primitive_Data =
  | ContentBlock_Text_Data
  | ContentBlock_Markdown_Data
  | ContentBlock_Code_Data
  | ContentBlock_Image_Data
  | ContentBlock_Audio_Data
  | ContentBlock_Video_Data
  | ContentBlock_Youtube_Data
  | ContentBlock_Subtitles_Data
  | ContentBlock_Scene_Data;
export type ContentBlock_Composite_Data = ContentBlock_Carousel_Data | ContentBlock_Checkpoint_Data;
export type ContentBlock_Data = ContentBlock_Primitive_Data | ContentBlock_Composite_Data;

export type ContentBlock_Primitive_Config =
  | ContentBlock_Text_Config
  | ContentBlock_Markdown_Config
  | ContentBlock_Code_Config
  | ContentBlock_Image_Config
  | ContentBlock_Audio_Config
  | ContentBlock_Video_Config
  | ContentBlock_Youtube_Config
  | ContentBlock_Subtitles_Config
  | ContentBlock_Scene_Config;
export type ContentBlock_Composite_Config = ContentBlock_Carousel_Config | ContentBlock_Checkpoint_Config;
export type ContentBlock_Config = ContentBlock_Primitive_Config | ContentBlock_Composite_Config;

export type ContentBlock_Primitive_DataBase = ReturnType<ContentBlock_Primitive_Configurator['build']['data']>['base'];
export type ContentBlock_Composite_DataBase = ReturnType<ContentBlock_Composite_Configurator['build']['data']>['base'];
export type ContentBlock_DataBase = ContentBlock_Primitive_DataBase | ContentBlock_Composite_DataBase;
