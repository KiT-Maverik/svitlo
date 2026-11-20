import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "5bd310c0-e266-411a-bd11-b0c01271407c",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У перший день видно вузький серп, а через кілька днів — більшу світлу частину Місяця. Обери всі правильні твердження про Місяць у цих спостереженнях.",
      en: "On the first day, a thin crescent is visible. A few days later, a larger bright part of the Moon is visible. Select all the true statements about the Moon in these observations.",
      pl: "Pierwszego dnia widać wąski sierp, a kilka dni później większą jasną część Księżyca. Wybierz wszystkie prawdziwe stwierdzenia o Księżycu w tych obserwacjach.",
      qm: "İlk kün ince oraq körüne, bir qaç kün soñ ise Ayniñ daa büyük aydın qısmı körüne. Bu közetüvlerde Ay aqqındaki bütün doğru fikirlerni sayla."
    }
  }
});
