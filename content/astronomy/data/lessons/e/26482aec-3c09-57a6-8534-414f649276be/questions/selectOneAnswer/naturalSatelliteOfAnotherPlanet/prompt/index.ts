import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "182396b2-441b-457b-94bf-1a2bb538b386",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Уяви природне небесне тіло, яке рухається навколо іншої планети, а не навколо Землі. Як називають таке тіло?",
      en: "Imagine a natural celestial body that orbits a planet other than Earth. What is such a body called?",
      pl: "Wyobraź sobie naturalne ciało niebieskie krążące wokół innej planety niż Ziemia. Jak nazywamy takie ciało?",
      qm: "Yer degil, başqa bir seyyare etrafında aylanğan tabiiy kök cismini tasavur et. Böyle cisim nasıl adlandırıla?"
    }
  }
});
