import { defineContentSection } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../constants';
import { answerOnLeftPrompt } from './answerOnLeftPrompt';
import { sixOnBothSides } from './sixOnBothSides';
import { sameValueReminder } from './sameValueReminder/sameValueReminder';

type SectionItems = {
  answerOnLeftPrompt: typeof answerOnLeftPrompt;
  sixOnBothSides: typeof sixOnBothSides;
  sameValueReminder: typeof sameValueReminder;
};

export const independentTransfer = defineContentSection<'independentTransfer', SectionItems, EqualsMeansSameValue_Lesson_Languages>({
  id: "2f4afed8-5ba5-42fb-8ee6-9465aa098846",
  slug: "independentTransfer",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Independent transfer"
    },
    navigationLabel: {
      en: "Independent transfer"
    }
  },
  content: {
    items: {
      answerOnLeftPrompt,
      sixOnBothSides,
      sameValueReminder
    },
    order: [
      "answerOnLeftPrompt",
      "sixOnBothSides",
      "sameValueReminder"
    ]
  }
});
