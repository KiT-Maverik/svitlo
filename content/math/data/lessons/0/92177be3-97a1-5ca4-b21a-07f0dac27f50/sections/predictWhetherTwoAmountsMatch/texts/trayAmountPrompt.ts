import { defineText } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';

export const trayAmountPrompt = defineText<'trayAmountPrompt', EqualsMeansSameValue_Lesson_Languages>({
  id: "b32df671-84cb-4c85-8139-8bb716dfc143",
  slug: "trayAmountPrompt",
  type: "text",
  params: {},
  locale: {
    value: {
      en: "On the first tray, three red counters and two blue counters. On the second, five plain counters. Are the amounts the same?"
    }
  }
});
