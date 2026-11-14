import { defineContentSection } from '@svitlo/engine/build';
import { unequalExpressionsExample } from './markdown/unequalExpressionsExample';
import { repairUnequalExpressions } from './scenes/repairUnequalExpressions';
import { equalityAfterRepair } from './texts/equalityAfterRepair';

export const repairAFalseEquality = defineContentSection({
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
