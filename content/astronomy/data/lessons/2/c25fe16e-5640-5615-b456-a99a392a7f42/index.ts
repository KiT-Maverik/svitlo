import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { dayAndNight } from "../../../skills/earthMoonAndSun/terrestrialSkyCycles/dayAndNight";

export const dayNightBasics = defineLesson<"dayNightBasics", LessonLanguages, typeof section.items>({
  id: "c25fe16e-5640-5615-b456-a99a392a7f42",
  slug: "dayNightBasics",
  type: "lesson",
  skills: [dayAndNight.id],
  params: {
    languages,
    requireQuiz: true,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true
    }
  },
  locale: {
    title: {
      uk: "Чому змінюються день і ніч"
    }
  },
  section
});
