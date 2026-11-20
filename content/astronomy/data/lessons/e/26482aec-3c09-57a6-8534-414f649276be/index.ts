import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { solarSystemComponents } from "../../../skills/solarSystemStructureAndOrigins/systemArchitecture/solarSystemComponents";

export const sunEarthMoonRoles = defineLesson<"sunEarthMoonRoles", LessonLanguages, typeof section.items>({
  id: "26482aec-3c09-57a6-8534-414f649276be",
  slug: "sunEarthMoonRoles",
  type: "lesson",
  skills: [solarSystemComponents.id],
  params: {
    languages,
    quizRequiredForCompletion: true,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true
    }
  },
  locale: {
    title: {
      uk: "Сонце, Земля і Місяць — хто є хто?"
    }
  },
  // TODO (BLOCKER): The required objectRolesQuiz now selects five real authored Question UUIDs,
  // but independent assessment review, bank publication, locale coverage and runtime intro verification
  // are still pending. Do not mark the Lesson Ready or publish unresolved resources.
  section
});
