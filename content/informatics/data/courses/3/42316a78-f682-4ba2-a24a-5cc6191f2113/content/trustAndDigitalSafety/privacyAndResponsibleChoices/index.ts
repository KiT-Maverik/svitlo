import { defineChapter } from '@svitlo/engine/build';

import { whichDetailsArePersonal } from "#lessonsData/2/5d2dea33-8beb-5e2c-a0ac-742757f6e0e2/index";
import { makeASafeAIPrompt } from "#lessonsData/9/6b15da71-9d21-5474-9af0-2f8c90ce4a39/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  whichDetailsArePersonal,
  makeASafeAIPrompt,
};

export const privacyAndResponsibleChoices = defineChapter<"privacyAndResponsibleChoices", typeof items, CourseLanguages>({
  type: "chapter",
  id: "11f48566-7fb9-51d4-b48d-9a4fe6d53af7",
  slug: "privacyAndResponsibleChoices",
  params: {},
  locale: {
    title: {
      uk: "Приватність, відповідальний вибір і підсумкове застосування"
    }
  },
  content: {
    items,
    order: [
      "whichDetailsArePersonal",
      "makeASafeAIPrompt"
    ]
  }
});
