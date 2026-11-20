import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000004",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Сонце освітлює не всю Землю одночасно. Місце К зараз на освітленому боці, а місце Л — на неосвітленому.",
      en: "The Sun does not light up all of Earth at once. K is currently on the sunlit side, while L is on the unlit side.",
      pl: "Słońce nie oświetla całej Ziemi jednocześnie. Miejsce K znajduje się teraz po oświetlonej stronie, a miejsce L — po nieoświetlonej.",
      qm: "Küneş aynı vaqıtta bütün Yerni aydınlatmay. K yeri şimdi ışıq tüşken tarafta, L yeri ise ışıq tüşmegen tarafta."
    }
  }
});
