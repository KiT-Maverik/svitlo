import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const correctAnswer = defineText<"correctAnswer", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000001a",
  slug: "correctAnswer",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Згодом настане ніч: місто Д разом із кулькою повернеться від світла.",
      en: "Night will come later: the town «Д» will turn away from the light along with the ball.",
      pl: "Później nastanie noc: miasto «Д» wraz z kulą odwróci się od światła.",
      qm: "Soñra gece olacaq: «Д» şeeri küre ile beraber ışıqnıñ ters tarafına aylanacaq."
    }
  }
});
