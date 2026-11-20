import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const correctChoice = defineText<"correctChoice", LessonLanguages>({
  id: "cdabe3a7-30b1-56a2-a264-eba3a33e32a5",
  slug: "correctChoice",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Темна плівка не замінює спеціального захисту; дивитися крізь неї на Сонце не можна."
    }
  }
});
