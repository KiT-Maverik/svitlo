import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { lunarPhases } from "../../../skills/earthMoonAndSun/lunarAppearance/lunarPhases";

export const moonAppearanceBasics = defineLesson<"moonAppearanceBasics", LessonLanguages, typeof section.items>({
  id: "667803f3-6535-5322-b377-810b4096d005",
  slug: "moonAppearanceBasics",
  type: "lesson",
  skills: [lunarPhases.id],
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
      uk: "Чому Місяць виглядає по-різному"
    }
  },
  section
});
