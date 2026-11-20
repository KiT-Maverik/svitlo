import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "735db355-5c80-44e8-838f-33a5e478a64e",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У записі «А → Б» стрілка означає «А рухається навколо Б». Які ДВА записи правильно показують основні зв’язки Землі та Місяця?",
      en: "In the notation “A → B,” the arrow means “A travels around B.” Which TWO notations correctly show the main relationships of Earth and the Moon?",
      pl: "W zapisie „A → B” strzałka oznacza „A krąży wokół B”. Które DWA zapisy poprawnie pokazują główne zależności między Ziemią a Księżycem?",
      qm: "«A → B» yazısında oq «A, B etrafında aylana» degen mananı bildire. Yer ve Aynıñ esas bağlarını angi EKİ yazı doğru köstere?"
    }
  }
});
