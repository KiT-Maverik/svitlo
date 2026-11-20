import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000012",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Коли кулька й лампа нерухомі, позначка Г залишається на тому самому темному боці. Зміна дня і ночі в моделі потребує повороту кульки.",
      en: "When the ball and lamp stay still, the mark «Г» stays on the same dark side. In this model, day can change into night only if the ball turns.",
      pl: "Kiedy kula i lampa są nieruchome, oznaczenie «Г» pozostaje po tej samej ciemnej stronie. W tym modelu zmiana dnia i nocy wymaga obrotu kuli.",
      qm: "Küre ve lampa areketsiz olğanda, «Г» belgisi aynı qarañğı tarafta qala. Modelde kündüz ve geceniñ deñişmesi içün küre aylanmalı."
    }
  }
});
