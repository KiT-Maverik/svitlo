import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "c6567197-0c00-494c-aab8-e6cdc2a8f0c8",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Навчальна схема може відображати правильні зв’язки між тілами, але не гарантує реальних відстаней і розмірів. Колір чи намальована величина не визначають тип небесного тіла.",
      en: "An educational diagram can show the correct relationships between bodies, but it does not guarantee true distances or sizes. A body's color or drawn size does not determine its type.",
      pl: "Schemat edukacyjny może poprawnie pokazywać zależności między ciałami, ale nie musi zachowywać rzeczywistych odległości ani rozmiarów. Kolor czy wielkość na rysunku nie określają rodzaju ciała niebieskiego.",
      qm: "Oquv şeması cisimler arasındaki bağlarnı doğru köstere bile, amma kerçek uzaqlıqlarını ve büyüklüklerini mıtlaqa köstermey. Cisimniñ rengi ya da resimdeki büyüklügi onıñ türüni belgilemey."
    }
  }
});
