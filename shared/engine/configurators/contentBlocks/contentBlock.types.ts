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
import type { ContentBlock_Text_Props } from './defineText/defineText.schemas';
import type { ContentBlock_Markdown_Props } from './defineMarkdown/defineMarkdown.schemas';
import type { ContentBlock_Code_Props } from './defineCode/defineCode.schemas';
import type { ContentBlock_Image_Props } from './defineImage/defineImage.schemas';
import type { ContentBlock_Video_Props } from './defineVideo/defineVideo.schemas';
import type { ContentBlock_Audio_Props } from './defineAudio/defineAudio.schemas';
import type { ContentBlock_Youtube_Props } from './defineYoutube/defineYoutube.schemas';
import type { ContentBlock_Carousel_Props } from './defineCarousel/defineCarousel.schemas';
import type { ContentBlock_Checkpoint_Props } from './defineCheckpoint/defineCheckpoint.schemas';
import type { ContentBlock_Scene_Props } from './defineScene/defineScene.schemas';

/** Allowed as nested answer blocks; Checkpoint recursion is deliberately excluded. */
export type ContentBlock_NonCheckpoint_Configurator =
  | ContentBlock_Text_Configurator
  | ContentBlock_Markdown_Configurator
  | ContentBlock_Code_Configurator
  | ContentBlock_Image_Configurator
  | ContentBlock_Video_Configurator
  | ContentBlock_Audio_Configurator
  | ContentBlock_Youtube_Configurator
  | ContentBlock_Carousel_Configurator
  | ContentBlock_Scene_Configurator;

export type ContentBlock_Configurator = ContentBlock_NonCheckpoint_Configurator | ContentBlock_Checkpoint_Configurator;

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
