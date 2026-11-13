import { z } from 'zod';

import { audio_Config_Schema } from '../contentBlocks/defineAudio/defineAudio.schemas';
import { carousel_Config_Schema } from '../contentBlocks/defineCarousel/defineCarousel.schemas';
import { carouselSlide_Config_Schema } from '../contentBlocks/defineCarousel/defineCarouselSlide/defineCarouselSlide.schemas';
import { checkpoint_Config_Schema } from '../contentBlocks/defineCheckpoint/defineCheckpoint.schemas';
import { checkpointItem_Config_Schema } from '../contentBlocks/defineCheckpoint/defineCheckpointItem/defineCheckpointItem.schemas';
import { code_Config_Schema } from '../contentBlocks/defineCode/defineCode.schemas';
import { image_Config_Schema } from '../contentBlocks/defineImage/defineImage.schemas';
import { markdown_Config_Schema } from '../contentBlocks/defineMarkdown/defineMarkdown.schemas';
import { scene_Config_Schema } from '../contentBlocks/defineScene/defineScene.schemas';
import { text_Config_Schema } from '../contentBlocks/defineText/defineText.schemas';
import { video_Config_Schema } from '../contentBlocks/defineVideo/defineVideo.schemas';
import { youtube_Config_Schema } from '../contentBlocks/defineYoutube/defineYoutube.schemas';

/**
 * Serializable YAML projections of authored Config schemas.
 *
 * The Engine Config schemas intentionally accept live child Configurator instances
 * via z.custom(). For editor-facing JSON Schema only, substitute those child
 * boundaries with their own authored Config schemas. Do not use these projections
 * inside define*() or for validating YAML scaffolder inputs: the scaffolder is
 * supposed to emit TypeScript drafts that may be incomplete or fail typechecks.
 *
 * Each variant retains the concrete Engine Config schema's params, locale,
 * identity and discriminating type; only the opaque child fields are replaced.
 */
export const yamlCarousel_Schema = carousel_Config_Schema.extend({
  slides: carousel_Config_Schema.shape.slides.extend({
    items: z.record(z.string(), carouselSlide_Config_Schema),
  }),
});

/** Checkpoint answers cannot contain Checkpoints or CheckpointItems. */
export const yamlCheckpointAnswer_Schema = z.discriminatedUnion('type', [
  audio_Config_Schema,
  yamlCarousel_Schema,
  code_Config_Schema,
  image_Config_Schema,
  markdown_Config_Schema,
  scene_Config_Schema,
  text_Config_Schema,
  video_Config_Schema,
  youtube_Config_Schema,
]);

export const yamlCheckpointItem_Schema = checkpointItem_Config_Schema.extend({
  question: text_Config_Schema,
  answer: checkpointItem_Config_Schema.shape.answer.extend({
    items: z.record(z.string(), yamlCheckpointAnswer_Schema),
  }),
});

export const yamlCheckpoint_Schema = checkpoint_Config_Schema.extend({
  content: checkpoint_Config_Schema.shape.content.extend({
    items: z.record(z.string(), yamlCheckpointItem_Schema),
  }),
});

/**
 * Exhaustive, type-discriminated renderable ContentBlock schema.
 * New ContentBlock kinds must be explicitly added here and to the factory map.
 */
export const yamlContentBlock_Schema = z.discriminatedUnion('type', [
  audio_Config_Schema,
  yamlCarousel_Schema,
  yamlCheckpoint_Schema,
  code_Config_Schema,
  image_Config_Schema,
  markdown_Config_Schema,
  scene_Config_Schema,
  text_Config_Schema,
  video_Config_Schema,
  youtube_Config_Schema,
]);
