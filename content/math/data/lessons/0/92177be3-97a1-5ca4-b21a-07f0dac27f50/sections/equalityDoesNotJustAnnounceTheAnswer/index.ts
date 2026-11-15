import { defineContentSection } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../constants';
import { equalExpressionsExamples } from './equalExpressionsExamples';
import { compareEqualExpressions } from './compareEqualExpressions';
import { equalsSignQuestion } from './equalsSignQuestion';

type SectionItems = {
  equalExpressionsExamples: typeof equalExpressionsExamples;
  compareEqualExpressions: typeof compareEqualExpressions;
  equalsSignQuestion: typeof equalsSignQuestion;
};

export const equalityDoesNotJustAnnounceTheAnswer = defineContentSection<'equalityDoesNotJustAnnounceTheAnswer', SectionItems, EqualsMeansSameValue_Lesson_Languages>({
  id: "7d878524-7eea-41af-853d-c4ad86502026",
  slug: "equalityDoesNotJustAnnounceTheAnswer",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Equality does not just announce the answer"
    },
    navigationLabel: {
      en: "Equality does not just announce the answer"
    }
  },
  content: {
    items: {
      equalExpressionsExamples,
      compareEqualExpressions,
      equalsSignQuestion
    },
    order: [
      "equalExpressionsExamples",
      "compareEqualExpressions",
      "equalsSignQuestion"
    ]
  }
});
