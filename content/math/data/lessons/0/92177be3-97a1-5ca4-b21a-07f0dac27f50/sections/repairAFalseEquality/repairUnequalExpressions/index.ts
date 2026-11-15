import { defineScene } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const repairUnequalExpressions = defineScene<'repairUnequalExpressions', EqualsMeansSameValue_Lesson_Languages>({
  id: "b9acf9ed-d7d1-4682-85b7-ea235bcae54c",
  slug: "repairUnequalExpressions",
  type: "scene",
  params: {},
  locale: {
    value: {
      en: {
        instruction: "4 + 2 = 4 + 3 is not true: six is not seven."
      }
    }
  }
});
