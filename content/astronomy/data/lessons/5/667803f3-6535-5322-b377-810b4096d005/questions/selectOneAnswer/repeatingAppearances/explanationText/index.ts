import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "8cc7d5b7-c4e9-4198-8091-1692ae9d5661",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Оскільки видима освітлена частина змінюється протягом повторюваного циклу, серп може з’являтися знову. Сама куля Місяця не руйнується.",
      en: "The visible lit part changes in a repeating cycle, so a crescent can appear again. The Moon itself does not break apart.",
      pl: "Widoczna oświetlona część zmienia się w powtarzającym się cyklu, dlatego sierp może pojawić się ponownie. Sama kula Księżyca nie rozpada się.",
      qm: "Körüngen aydın qısım tekrarlanğan devir içinde deñişe, şunıñ içün oraq kene körüne bile. Ay şarınıñ özü bozulmay."
    }
  }
});
