import type { ContentBlock_Text_Configurator, ContentBlock_Text_Props } from './defineText';
import type { ContentBlock_Markdown_Configurator, ContentBlock_Markdown_Props } from './defineMarkdown';
import type { ContentBlock_Code_Configurator, ContentBlock_Code_Props } from './defineCode';
import type { ContentBlock_Image_Configurator, ContentBlock_Image_Props } from './defineImage';
import type { ContentBlock_Video_Configurator, ContentBlock_Video_Props } from './defineVideo';
import type { ContentBlock_Audio_Configurator, ContentBlock_Audio_Props } from './defineAudio';
import type { ContentBlock_Youtube_Configurator, ContentBlock_Youtube_Props } from './defineYoutube';
import type { ContentBlock_Carousel_Configurator, ContentBlock_Carousel_Props } from './defineCarousel';
import type { ContentBlock_Checkpoint_Configurator, ContentBlock_Checkpoint_Props } from './defineCheckpoint';
import type { ContentBlock_Scene_Configurator, ContentBlock_Scene_Props } from './defineScene';

export type ContentBlock_Configurator =
  | ContentBlock_Text_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Video_Configurator
  | ContentBlock_Audio_Configurator
  | ContentBlock_Youtube_Configurator
  | ContentBlock_Carousel_Configurator
  | ContentBlock_Checkpoint_Configurator
  | ContentBlock_Scene_Configurator;

export type ContentBlock_Props =
  | ContentBlock_Text_Props
  | ContentBlock_Markdown_Props
  | ContentBlock_Code_Props
  | ContentBlock_Image_Props
  | ContentBlock_Video_Props
  | ContentBlock_Audio_Props
  | ContentBlock_Youtube_Props
  | ContentBlock_Carousel_Props
  | ContentBlock_Checkpoint_Props
  | ContentBlock_Scene_Props;
