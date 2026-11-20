import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "b7b266ea-417e-57aa-ad1c-b544f4836c6a",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Подумай, чи треба спрямовувати власні очі на справжнє Сонце, щоб отримати відомості.",
      en: "Think about whether you need to look at the real Sun with your own eyes to learn about it.",
      pl: "Zastanów się, czy musisz patrzeć własnymi oczami na prawdziwe Słońce, żeby dowiedzieć się o nim czegoś nowego.",
      qm: "Küneş aqqında bilgi almaq içün oña öz közleriñnen baqmaq şartmı? Tüşün."
    }
  }
});
