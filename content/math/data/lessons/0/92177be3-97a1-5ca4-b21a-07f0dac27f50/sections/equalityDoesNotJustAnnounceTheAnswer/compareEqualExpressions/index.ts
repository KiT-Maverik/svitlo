import { defineScene } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../../constants';

export const compareEqualExpressions = defineScene<'compareEqualExpressions', EqualsMeansSameValue_Lesson_Languages>({
  id: "7f4e090a-3ab2-48c8-8e2b-b0334bd731f1",
  slug: "compareEqualExpressions",
  type: "scene",
  params: {},
  locale: {
    value: {
      en: {
        instruction: "3 + 2 = 4 + 1 is true: five on each side. 5 = 2 + 3 is also true: the answer need not be on the right."
      }
    }
  }
});
