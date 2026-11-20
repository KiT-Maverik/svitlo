import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const hintText = defineText<"hintText", LessonLanguages>({
  id: "1cd74c89-d19b-49e1-9b7d-570d7c4ef2fc",
  slug: "hintText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Не всі небесні тіла такого типу рухаються навколо Землі. Подумай, яку роль це тіло має біля іншої планети.",
      en: "Not every body of this kind orbits Earth. Think about the role it has near another planet.",
      pl: "Nie każde ciało tego rodzaju krąży wokół Ziemi. Pomyśl, jaką rolę odgrywa ono przy innej planecie.",
      qm: "Bu türdeki bütün cisimler Yer etrafında aylanmay. O, başqa seyyare yanında nasıl bir rol oynay, tüşün."
    }
  }
});
