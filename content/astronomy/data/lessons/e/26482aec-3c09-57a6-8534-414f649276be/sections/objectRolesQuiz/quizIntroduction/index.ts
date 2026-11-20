import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const quizIntroduction = defineText<"quizIntroduction", LessonLanguages>({
  id: "4948081a-8514-4e25-8d85-c5890c419799",
  slug: "quizIntroduction",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Перевір, чи вмієш розрізняти зорю, планету й природний супутник за їхніми ознаками та пояснювати, хто навколо кого рухається. Це не перевірка пам'яті про колір чи картинку. Якщо помилишся, згадай попередні пояснення.",
      en: "Check whether you can tell a star, a planet and a natural satellite apart by their features, and explain which bodies travel around which. This is not a test of remembering colors or pictures. If you make a mistake, think back to the earlier explanations.",
      pl: "Sprawdź, czy potrafisz rozróżnić gwiazdę, planetę i naturalnego satelitę na podstawie ich cech oraz wyjaśnić, które ciała wokół których krążą. Nie sprawdzamy pamięci o kolorach ani obrazkach. Jeśli się pomylisz, przypomnij sobie wcześniejsze wyjaśnienia.",
      qm: "Yıldıznı, seyyareni ve tabiiy yoldaşnı alâmetlerine köre ayırıp, angi cisimniñ angi cisim etrafında aylanğanını añlata bilesiñmi, tekşir. Bu, renklerni ya da resimlerni hatırlav sınavı degildir. Yañlışsañ, evelki añlatmalarnı hatırla."
    }
  }
});
