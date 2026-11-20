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
  // TODO (BLOCKER): The required objectRolesQuiz selects five independently reviewed Question UUIDs,
  // but bank publication, full locale coverage and runtime Quiz intro verification remain pending.
  // Materialized TS drafts do not establish production readiness; keep this Lesson Draft.
  section
});
