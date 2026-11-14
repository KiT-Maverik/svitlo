import { defineContentSection } from '@svitlo/engine/build';
import { compareCounterTrays } from './scenes/compareCounterTrays';
import { trayAmountPrompt } from './texts/trayAmountPrompt';
import { sameValueExplanation } from './texts/sameValueExplanation';

export const predictWhetherTwoAmountsMatch = defineContentSection({
  id: "708bc8c7-044c-4eba-8c99-7bdb285e9da6",
  slug: "predictWhetherTwoAmountsMatch",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Predict whether two amounts match"
    },
    navigationLabel: {
      en: "Predict whether two amounts match"
    }
  },
  content: {
    items: {
      trayAmountPrompt,
      compareCounterTrays,
      sameValueExplanation
    },
    order: [
      "trayAmountPrompt",
      "compareCounterTrays",
      "sameValueExplanation"
    ]
  }
});
