import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000001f",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, для чого потрібна ця модель і які подробиці справжнього Сонця та Землі вона може не відтворювати.",
      en: "Think about what this model helps explain and what details of the real Sun and Earth it might not show.",
      pl: "Pomyśl, do czego służy ten model i jakich szczegółów dotyczących prawdziwego Słońca i Ziemi może nie pokazywać.",
      qm: "Bu model ne içün kerek ve aqiqiy Küneş ile Yer aqqında angi tafsilâtlarnı köstermey bile, tüşün."
    }
  }
});
