import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000000b",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "День змінюється ніччю, бо Земля обертається навколо своєї осі. Місце разом із Землею переходить на неосвітлений бік.",
      en: "Day turns into night because Earth rotates on its axis. The place moves with Earth onto the side that is not lit by the Sun.",
      pl: "Dzień zmienia się w noc, ponieważ Ziemia obraca się wokół własnej osi. Miejsce wraz z Ziemią przechodzi na stronę nieoświetloną przez Słońce.",
      qm: "Kündüz gecege deñişe, çünki Yer öz etrafında aylana. Ev olğan yer de Yer ile beraber Küneş ışığı tüşmegen tarafqa keçe."
    }
  }
});
