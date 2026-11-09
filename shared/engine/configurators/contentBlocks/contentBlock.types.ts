import type { ContentBlock_Text_Configurator } from './defineText/defineText';
import type { ContentBlock_Markdown_Configurator } from './defineMarkdown/defineMarkdown';
import type { ContentBlock_Code_Configurator } from './defineCode/defineCode';
import type { ContentBlock_Image_Configurator } from './defineImage/defineImage';
import type { ContentBlock_Video_Configurator } from './defineVideo/defineVideo';
import type { ContentBlock_Audio_Configurator } from './defineAudio/defineAudio';
import type { ContentBlock_Youtube_Configurator } from './defineYoutube/defineYoutube';
import type { ContentBlock_Carousel_Configurator } from './defineCarousel/defineCarousel';
import type { ContentBlock_Checkpoint_Configurator } from './defineCheckpoint/defineCheckpoint';
import type { ContentBlock_Scene_Configurator } from './defineScene/defineScene';

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
