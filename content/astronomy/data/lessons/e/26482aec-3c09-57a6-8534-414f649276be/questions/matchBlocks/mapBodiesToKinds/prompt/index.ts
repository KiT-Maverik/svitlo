import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "411f6d34-3d33-4089-bab0-bd56ca530efb",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Поєднай кожне небесне тіло з його природою. Вибирай категорію за знанням про тіло, а не за кольором чи яскравістю.",
      en: "Match each celestial body to its type. Choose the category based on what you know about it, not its color or brightness.",
      pl: "Połącz każde ciało niebieskie z jego rodzajem. Wybierz kategorię na podstawie wiedzy o nim, a nie jego koloru czy jasności.",
      qm: "Er bir kök cismini onıñ türünen eşleştir. Rengine ya da parlaqlığına degil, o cisim aqqında bilgenleriñe esaslan."
    }
  }
});
