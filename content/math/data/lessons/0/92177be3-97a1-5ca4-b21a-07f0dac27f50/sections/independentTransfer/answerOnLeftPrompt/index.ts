import { defineText } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const answerOnLeftPrompt = defineText<'answerOnLeftPrompt', EqualsMeansSameValue_Lesson_Languages>({
  id: "00162145-5c3c-42b1-8d10-dbb6713aa842",
  slug: "answerOnLeftPrompt",
  type: "text",
  params: {},
  locale: {
    value: {
      en: "Someone says 6 = 1 + 5 is wrong because the answer is on the left. Do you agree? Explain, or choose ‘six on each side’ or ‘the sign needs an answer on the right’."
    }
  }
});
