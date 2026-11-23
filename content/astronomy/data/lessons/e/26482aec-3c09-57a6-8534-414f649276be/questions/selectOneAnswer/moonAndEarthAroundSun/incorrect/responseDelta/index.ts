import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const responseDelta = defineText<"responseDelta", LessonLanguages>({
  id: "ab502be8-ef79-4306-8f03-1bb6443c2566",
  slug: "responseDelta",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Земля рухається навколо Місяця, а Місяць стоїть на місці.",
      en: "Earth orbits the Moon, while the Moon stays still.",
      pl: "Ziemia krąży wokół Księżyca, a Księżyc pozostaje w miejscu.",
      qm: "Yer Ay etrafında aylana, Ay ise yerinde areketsiz tura."
    }
  }
});
