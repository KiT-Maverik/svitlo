import { defineContentSection } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../constants';
import { compareCounterTrays } from './scenes/compareCounterTrays';
import { trayAmountPrompt } from './texts/trayAmountPrompt';
import { sameValueExplanation } from './texts/sameValueExplanation';

type SectionItems = {
  trayAmountPrompt: typeof trayAmountPrompt;
  compareCounterTrays: typeof compareCounterTrays;
  sameValueExplanation: typeof sameValueExplanation;
};

export const predictWhetherTwoAmountsMatch = defineContentSection<'predictWhetherTwoAmountsMatch', SectionItems, EqualsMeansSameValue_Lesson_Languages>({
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
