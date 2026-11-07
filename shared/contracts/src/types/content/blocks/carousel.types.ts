import type { ContentBlock_Data_Meta, ContentBlock_Definition_Meta, ContentBlock_Response_Meta } from './common.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Locale_Languages, Locale_Options } from '../locale.types';

/** Presentation controls are language-independent; slide text is always localized. */
type Carousel_Settings = {
  /** Defaults to 16:9; the same frame is reserved for each slide to avoid layout shift. */
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain';
  /** Defaults to true. When false, the first and last slide are hard boundaries. */
  loop?: boolean;
  /** Defaults to false, since learner-controlled pacing is preferred. */
  autoplay?: boolean;
  /** Milliseconds between automatic changes, defaults to 5000. */
  autoplayIntervalMs?: number;
  /** Defaults to slide. */
  transition?: 'slide' | 'fade';
  /** Milliseconds, defaults to 450. */
  transitionDurationMs?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  allowFullscreen?: boolean;
  allowSwipe?: boolean;
  /** Zero-based initial slide index. */
  startIndex?: number;
  /** Pause autoplay while the pointer is over the carousel or controls are focused. */
  pauseOnHover?: boolean;
};

type ContentBlock_Carousel_Slide_Data<Languages extends Locale_Languages> = {
  src: Locale_Options<Languages>;
  alt: Locale_Options<Languages>;
  caption?: Locale_Options<Languages>;
};

export type ContentBlock_Carousel_Slide_Response = {
  src: string;
  alt: string;
  caption?: string;
};

type ContentBlock_Carousel_Definition = ContentBlock_Definition_Meta<'carousel'>;

type ContentBlock_Carousel_Data<Languages extends Locale_Languages> = ContentBlock_Data_Meta<'carousel'> &
  Carousel_Settings & {
    title?: Locale_Options<Languages>;
    /** At least one slide, with all image assets packaged by the textbook host. */
    slides: readonly [ContentBlock_Carousel_Slide_Data<Languages>, ...ContentBlock_Carousel_Slide_Data<Languages>[]];
  };

export type ContentBlock_Carousel_Response = ContentBlock_Response_Meta<'carousel'> &
  Carousel_Settings & {
    title?: string;
    slides: readonly [ContentBlock_Carousel_Slide_Response, ...ContentBlock_Carousel_Slide_Response[]];
  };

export type ContentBlock_Carousel<Mode extends ContentEntity_ConfigType, Languages extends Locale_Languages> = {
  definition: ContentBlock_Carousel_Definition;
  data: ContentBlock_Carousel_Data<Languages>;
  response: ContentBlock_Carousel_Response;
}[Mode];
