import { defineContentSection } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../constants';
import { unequalExpressionsExample } from './unequalExpressionsExample';
import { repairUnequalExpressions } from './repairUnequalExpressions';
import { equalityAfterRepair } from './equalityAfterRepair';

type SectionItems = {
  unequalExpressionsExample: typeof unequalExpressionsExample;
  repairUnequalExpressions: typeof repairUnequalExpressions;
  equalityAfterRepair: typeof equalityAfterRepair;
};

export const repairAFalseEquality = defineContentSection<'repairAFalseEquality', SectionItems, EqualsMeansSameValue_Lesson_Languages>({
  id: "8df044b7-521a-4977-88bd-3599a7573859",
  slug: "repairAFalseEquality",
  type: "content",
  params: {},
  locale: {
    title: {
      en: "Repair a false equality"
    },
    navigationLabel: {
      en: "Repair a false equality"
    }
  },
  content: {
    items: {
      unequalExpressionsExample,
      repairUnequalExpressions,
      equalityAfterRepair
    },
    order: [
      "unequalExpressionsExample",
      "repairUnequalExpressions",
      "equalityAfterRepair"
    ]
  }
});
