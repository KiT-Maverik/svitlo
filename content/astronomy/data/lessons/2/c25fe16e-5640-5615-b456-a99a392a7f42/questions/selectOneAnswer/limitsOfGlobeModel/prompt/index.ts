import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-00000000001e",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Дитина показує день і ніч на кульці з ліхтариком. Який висновок із цієї моделі справедливий?",
      en: "A child is showing day and night using a ball and a flashlight. Which conclusion from this model is correct?",
      pl: "Dziecko pokazuje dzień i noc za pomocą kuli i latarki. Jaki wniosek z tego modelu jest poprawny?",
      qm: "Bir bala küre ve fener yardımınen kündüz ve geceni köstere. Bu modelden qanday doğru netice çıqarmaq mümkün?"
    }
  }
});
