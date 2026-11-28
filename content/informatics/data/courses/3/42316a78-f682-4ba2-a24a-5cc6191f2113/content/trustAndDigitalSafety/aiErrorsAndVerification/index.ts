import { defineChapter } from '@svitlo/engine/build';

import { checkAIClaimsWithSources } from "#lessonsData/8/91acbd52-be2d-5ff6-99ef-e4d7bc4479e8/index";
import { spotSuspiciousAIAnswers } from "#lessonsData/c/57c48bf9-7c15-56d6-8533-27721cf1a30c/index";
import type { CourseLanguages } from "#coursesData/3/42316a78-f682-4ba2-a24a-5cc6191f2113/constants";

const items = {
  spotSuspiciousAIAnswers,
  checkAIClaimsWithSources,
};

export const aiErrorsAndVerification = defineChapter<"aiErrorsAndVerification", typeof items, CourseLanguages>({
  type: "chapter",
  id: "58af373f-56f8-5364-9e4b-af8ce5685214",
  slug: "aiErrorsAndVerification",
  params: {},
  locale: {
    title: {
      uk: "Помилки ШІ та перевірка відповідей"
    }
  },
  content: {
    items,
    order: [
      "spotSuspiciousAIAnswers",
      "checkAIClaimsWithSources"
    ]
  }
});
