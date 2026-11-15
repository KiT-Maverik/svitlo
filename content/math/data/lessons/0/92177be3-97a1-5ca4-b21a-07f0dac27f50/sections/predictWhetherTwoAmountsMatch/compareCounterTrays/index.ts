import { defineScene } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../../constants';

export const compareCounterTrays = defineScene<'compareCounterTrays', EqualsMeansSameValue_Lesson_Languages>({
  id: "860bbab1-0e09-46d3-876d-5a20df6fd642",
  slug: "compareCounterTrays",
  type: "scene",
  params: {},
  locale: {
    value: {
      en: {
        instruction: "On the first tray, three red counters and two blue counters. On the second, five plain counters. Are the amounts the same?"
      }
    }
  }
});
