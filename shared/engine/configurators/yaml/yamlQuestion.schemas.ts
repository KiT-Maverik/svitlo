import { z } from 'zod';

import { answerWithNumber_Config_Schema } from '../questions/defineAnswerWithNumber/defineAnswerWithNumber.schemas';
import { answerWithText_Config_Schema } from '../questions/defineAnswerWithText/defineAnswerWithText.schemas';
import { buildAnswerWithBlocks_Config_Schema } from '../questions/defineBuildAnswerWithBlocks/defineBuildAnswerWithBlocks.schemas';
import { fillBlanksWithBlocks_Config_Schema } from '../questions/defineFillBlanksWithBlocks/defineFillBlanksWithBlocks.schemas';
import { fillBlanksWithText_Config_Schema } from '../questions/defineFillBlanksWithText/defineFillBlanksWithText.schemas';
import { matchBlocks_Config_Schema } from '../questions/defineMatchBlocks/defineMatchBlocks.schemas';
import { orderSequence_Config_Schema } from '../questions/defineOrderSequence/defineOrderSequence.schemas';
import { selectMultipleAnswers_Config_Schema } from '../questions/defineSelectMultipleAnswers/defineSelectMultipleAnswers.schemas';
import { selectOneAnswer_Config_Schema } from '../questions/defineSelectOneAnswer/defineSelectOneAnswer.schemas';
import { questionBlockCollection_Config_Schema } from '../questions/question.schemas';
import { yamlContentBlock_Schema } from './yamlContentBlock.schemas';

/** All Question Config variants own their actual metadata; only child blocks differ. */
export const yamlQuestionBlocks_Schema = questionBlockCollection_Config_Schema.extend({
  items: z.record(z.string(), yamlContentBlock_Schema),
});
const commonContent = {
  question: yamlQuestionBlocks_Schema,
  hint: yamlQuestionBlocks_Schema.optional(),
  explanation: yamlQuestionBlocks_Schema.optional(),
};

export const yamlAnswerWithNumber_Schema = answerWithNumber_Config_Schema.extend({
  content: answerWithNumber_Config_Schema.shape.content.extend(commonContent),
});
export const yamlAnswerWithText_Schema = answerWithText_Config_Schema.extend({
  content: answerWithText_Config_Schema.shape.content.extend(commonContent),
});

export const yamlBuildAnswerWithBlocks_Schema = buildAnswerWithBlocks_Config_Schema.extend({
  content: buildAnswerWithBlocks_Config_Schema.shape.content.extend({
    ...commonContent,
    correctSequence: yamlQuestionBlocks_Schema,
    distractors: yamlQuestionBlocks_Schema,
  }),
});

export const yamlFillBlanksWithBlocks_Schema = fillBlanksWithBlocks_Config_Schema.extend({
  content: fillBlanksWithBlocks_Config_Schema.shape.content.extend({
    ...commonContent,
    slots: fillBlanksWithBlocks_Config_Schema.shape.content.shape.slots.extend({
      items: z.record(
        z.string(),
        z.object({ correctAnswer: yamlContentBlock_Schema }),
      ),
    }),
    distractors: yamlQuestionBlocks_Schema,
  }),
});
export const yamlFillBlanksWithText_Schema = fillBlanksWithText_Config_Schema.extend({
  content: fillBlanksWithText_Config_Schema.shape.content.extend(commonContent),
});

export const yamlMatchBlocks_Schema = matchBlocks_Config_Schema.extend({
  content: matchBlocks_Config_Schema.shape.content.extend({
    ...commonContent,
    pairs: matchBlocks_Config_Schema.shape.content.shape.pairs.extend({
      items: z.record(
        z.string(),
        z.object({
          left: yamlContentBlock_Schema,
          right: yamlContentBlock_Schema,
        }),
      ),
    }),
  }),
});

export const yamlOrderSequence_Schema = orderSequence_Config_Schema.extend({
  content: orderSequence_Config_Schema.shape.content.extend({
    ...commonContent,
    sequence: yamlQuestionBlocks_Schema,
  }),
});

export const yamlSelectMultipleAnswers_Schema = selectMultipleAnswers_Config_Schema.extend({
  content: selectMultipleAnswers_Config_Schema.shape.content.extend({
    ...commonContent,
    answers: selectMultipleAnswers_Config_Schema.shape.content.shape.answers.extend({
      correct: yamlQuestionBlocks_Schema,
      incorrect: yamlQuestionBlocks_Schema,
      distractors: yamlQuestionBlocks_Schema,
    }),
  }),
});
export const yamlSelectOneAnswer_Schema = selectOneAnswer_Config_Schema.extend({
  content: selectOneAnswer_Config_Schema.shape.content.extend({
    ...commonContent,
    answers: selectOneAnswer_Config_Schema.shape.content.shape.answers.extend({
      correct: yamlQuestionBlocks_Schema,
      incorrect: yamlQuestionBlocks_Schema,
      distractors: yamlQuestionBlocks_Schema,
    }),
  }),
});

/** Required question type dispatch with no opaque z.custom children. */
export const yamlQuestion_Schema: z.ZodType = z.discriminatedUnion('type', [
  yamlAnswerWithNumber_Schema,
  yamlAnswerWithText_Schema,
  yamlBuildAnswerWithBlocks_Schema,
  yamlFillBlanksWithBlocks_Schema,
  yamlFillBlanksWithText_Schema,
  yamlMatchBlocks_Schema,
  yamlOrderSequence_Schema,
  yamlSelectMultipleAnswers_Schema,
  yamlSelectOneAnswer_Schema,
]);
