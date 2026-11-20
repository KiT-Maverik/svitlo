import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000019",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Коли кулька продовжує обертатися, позначка Д згодом переходить з освітленого боку на неосвітлений. Тоді в місті Д настане ніч, хоча лампа не вимикалася.",
      en: "As the ball continues to turn, the mark «Д» eventually moves from the lit side to the unlit side. Then night comes to «Д», even though the lamp has not been switched off.",
      pl: "Gdy kula nadal się obraca, oznaczenie «Д» z czasem przechodzi ze strony oświetlonej na nieoświetloną. Wtedy w mieście «Д» nastaje noc, chociaż lampy nie wyłączono.",
      qm: "Küre aylanmağa devam etkende, «Д» belgisi vaqt keçkeninen ışıq tüşken taraftan qarañğı tarafqa keçe. O vaqıt «Д» şeerinde gece olacaq, lampa ise sönmeycek."
    }
  }
});
