import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "e69b3bb6-2732-56c1-a195-07aa1fbf9ba5",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Готовий запис проєкції можна безпечно розглядати без прямого погляду на Сонце. Самостійно виготовляти чи налаштовувати сонячні пристрої дітям не потрібно. Через отвір проєктора на Сонце дивитися не можна.",
      en: "You can safely watch an existing recording of a projection without looking directly at the Sun. Children do not need to build or adjust solar-viewing equipment themselves. You must not look at the Sun through an opening in a projector.",
      pl: "Można bezpiecznie obejrzeć gotowe nagranie projekcji, nie patrząc bezpośrednio na Słońce. Dzieci nie powinny samodzielnie budować ani ustawiać przyrządów do obserwacji Słońca. Nie wolno patrzeć na Słońce przez otwór projektora."
    }
  }
});
