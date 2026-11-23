import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "d360e67c-ee81-4ab5-babf-af36a4e87a78",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Природний супутник — не обов’язково наш Місяць. Це природне тіло, що рухається навколо планети; супутники інших планет теж належать до цієї категорії.",
      en: "A natural satellite is not necessarily our Moon. It is a natural body that travels around a planet; satellites of other planets belong to the same category.",
      pl: "Naturalny satelita nie musi być naszym Księżycem. Jest to naturalne ciało krążące wokół planety. Satelity innych planet także należą do tej kategorii.",
      qm: "Tabiiy yoldaş mıtlaqa bizim Ayımız olmaq zorunda degil. O, seyyare etrafında aylanğan tabiiy cisimdir; başqa seyyarelerniñ yoldaşları da bu türge kirer."
    }
  }
});
