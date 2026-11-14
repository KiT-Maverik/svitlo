import { defineContentSection } from '@svitlo/engine/build';
import { answerOnLeftPrompt } from './texts/answerOnLeftPrompt';
import { sixOnBothSides } from './texts/sixOnBothSides';
import { sameValueReminder } from './markdown/sameValueReminder';

export const independentTransfer = defineContentSection({
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
