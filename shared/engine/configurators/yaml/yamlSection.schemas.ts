import { z } from 'zod';

import { codingTaskSection_Config_Schema } from '../sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { contentSection_Config_Schema } from '../sections/defineContentSection/defineContentSection.schemas';
import { flashcardsSection_Config_Schema } from '../sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { learningFlowSection_Config_Schema } from '../sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import { practiceSection_Config_Schema } from '../sections/definePracticeSection/definePracticeSection.schemas';
import { questSection_Config_Schema } from '../sections/defineQuestSection/defineQuestSection.schemas';
import { stage_Config_Schema } from '../sections/defineQuestSection/defineStage/defineStage.schemas';
import { task_Config_Schema } from '../sections/defineQuestSection/defineTask/defineTask.schemas';
import { camelCase_Schema } from '#schemas';
import { scene_Config_Schema } from '../contentBlocks/defineScene/defineScene.schemas';
import { quizSection_Config_Schema } from '../sections/defineQuizSection/defineQuizSection.schemas';
import {
  yamlAudio_Schema,
  yamlContentBlock_Schema,
  yamlImage_Schema,
  yamlSubtitles_Schema,
  yamlVideo_Schema,
} from './yamlContentBlock.schemas';

/** Replace opaque child Configurators, retaining all original Section metadata schemas. */
const contentChildren = {
  items: z.record(z.string(), yamlContentBlock_Schema),
};

export const yamlCodingTaskSection_Schema = codingTaskSection_Config_Schema.extend({
  content: codingTaskSection_Config_Schema.shape.content.extend(contentChildren),
});
export const yamlContentSection_Schema = contentSection_Config_Schema.extend({
  content: contentSection_Config_Schema.shape.content.extend(contentChildren),
});
export const yamlFlashcardsSection_Schema = flashcardsSection_Config_Schema.extend({
  content: flashcardsSection_Config_Schema.shape.content.extend(contentChildren),
});
export const yamlLearningFlowSection_Schema = learningFlowSection_Config_Schema.extend({
  content: learningFlowSection_Config_Schema.shape.content.extend(contentChildren),
});
export const yamlPracticeSection_Schema = practiceSection_Config_Schema.extend({
  content: practiceSection_Config_Schema.shape.content.extend(contentChildren),
});
export const yamlQuizSection_Schema = quizSection_Config_Schema.extend({
  content: quizSection_Config_Schema.shape.content.extend(contentChildren),
});

/**
 * Quest's children are named configurator maps, not ordered Section blocks.
 * Only opaque child boundaries are projected to serializable Config schemas.
 */
export const yamlQuestStage_Schema = stage_Config_Schema.extend({
  content: stage_Config_Schema.shape.content.extend({
    video: stage_Config_Schema.shape.content.shape.video.extend({
      medium: yamlVideo_Schema,
      small: yamlVideo_Schema,
    }),
    audio: stage_Config_Schema.shape.content.shape.audio.extend({
      dialogue: yamlAudio_Schema.nullable(),
      narration: yamlAudio_Schema.nullable(),
      background: yamlAudio_Schema.nullable(),
    }),
    image: yamlImage_Schema,
    subtitles: yamlSubtitles_Schema,
  }),
});

export const yamlQuestTask_Schema = task_Config_Schema.extend({
  scene: scene_Config_Schema,
});

export const yamlQuestSection_Schema = questSection_Config_Schema.extend({
  // Keep the mandatory entry point visible to both Zod and generated JSON Schema.
  stages: z.intersection(
    z.object({ start: yamlQuestStage_Schema }),
    z.record(camelCase_Schema, yamlQuestStage_Schema),
  ),
  tasks: z.intersection(
    z.object({ start: yamlQuestTask_Schema }),
    z.record(camelCase_Schema, yamlQuestTask_Schema),
  ),
});

/** A Section's type is mandatory and selects its concrete define* factory. */
export const yamlSection_Schema = z.discriminatedUnion('type', [
  yamlCodingTaskSection_Schema,
  yamlContentSection_Schema,
  yamlFlashcardsSection_Schema,
  yamlLearningFlowSection_Schema,
  yamlPracticeSection_Schema,
  yamlQuestSection_Schema,
  yamlQuizSection_Schema,
]);
