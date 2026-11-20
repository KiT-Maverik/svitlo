import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "191dd0f2-192f-438f-bdde-cd5c778444b7",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, які відомості схема пояснює, а які вона свідомо не передає в реальному масштабі.",
      en: "Think about which facts the diagram explains and which it deliberately does not show to scale.",
      pl: "Zastanów się, jakie informacje wyjaśnia schemat, a czego celowo nie pokazuje w rzeczywistej skali.",
      qm: "Şema angi malümatnı añlata, angi şeylerni ise kerçek ölçekte köstermey, tüşün."
    }
  }
});
