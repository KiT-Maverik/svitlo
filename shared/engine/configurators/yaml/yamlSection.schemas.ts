import { z } from 'zod';

import { codingTaskSection_Config_Schema } from '../sections/defineCodingTaskSection/defineCodingTaskSection.schemas';
import { contentSection_Config_Schema } from '../sections/defineContentSection/defineContentSection.schemas';
import { flashcardsSection_Config_Schema } from '../sections/defineFlashcardsSection/defineFlashcardsSection.schemas';
import { learningFlowSection_Config_Schema } from '../sections/defineLearningFlowSection/defineLearningFlowSection.schemas';
import { practiceSection_Config_Schema } from '../sections/definePracticeSection/definePracticeSection.schemas';
import { quizSection_Config_Schema } from '../sections/defineQuizSection/defineQuizSection.schemas';
import { yamlContentBlock_Schema } from './yamlContentBlock.schemas';

/** Replace opaque child Configurators, retaining all original Section metadata schemas. */
const contentChildren = {
  items: z.record(z.string(), yamlContentBlock_Schema),
};

export const yamlCodingTaskSection_Schema = codingTaskSection_Config_Schema.safeExtend({
  content: codingTaskSection_Config_Schema.shape.content.safeExtend(contentChildren),
});
export const yamlContentSection_Schema = contentSection_Config_Schema.safeExtend({
  content: contentSection_Config_Schema.shape.content.safeExtend(contentChildren),
});
export const yamlFlashcardsSection_Schema = flashcardsSection_Config_Schema.safeExtend({
  content: flashcardsSection_Config_Schema.shape.content.safeExtend(contentChildren),
});
export const yamlLearningFlowSection_Schema = learningFlowSection_Config_Schema.safeExtend({
  content: learningFlowSection_Config_Schema.shape.content.safeExtend(contentChildren),
});
export const yamlPracticeSection_Schema = practiceSection_Config_Schema.safeExtend({
  content: practiceSection_Config_Schema.shape.content.safeExtend(contentChildren),
});
export const yamlQuizSection_Schema = quizSection_Config_Schema.safeExtend({
  content: quizSection_Config_Schema.shape.content.safeExtend(contentChildren),
});

/** A Section's type is mandatory and selects its concrete define* factory. */
export const yamlSection_Schema = z.discriminatedUnion('type', [
  yamlCodingTaskSection_Schema,
  yamlContentSection_Schema,
  yamlFlashcardsSection_Schema,
  yamlLearningFlowSection_Schema,
  yamlPracticeSection_Schema,
  yamlQuizSection_Schema,
]);
