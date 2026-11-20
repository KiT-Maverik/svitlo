import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const onlyNightExplanation = defineText<"onlyNightExplanation", LessonLanguages>({
  id: "eed8fbd6-6570-5ea5-a23e-6adc072a27f3",
  slug: "onlyNightExplanation",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Ні. Про небо можна дізнаватися вдень і вдома: за готовими фото хмар або словесними описами. Дивитися на Сонце для цього не потрібно."
    }
  }
});
