import { defineLesson } from '@svitlo/engine/build';
import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { equalityMeaning_Skill_Data } from "../../../skills/algebra/equalities/skills/equalityMeaning.data";

export const equalityGeneratorCoverage_Lesson = defineLesson<"equalityGeneratorCoverage", LessonLanguages, typeof section.items>({
  id: "a11ce555-0000-4000-8000-0000000000ff",
  slug: "equalityGeneratorCoverage",
  type: "lesson",
  skills: [equalityMeaning_Skill_Data.id],
  params: {
    languages,
    requireQuiz: false,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true
    }
  },
  locale: {
    title: {
      en: "Equality: temporary generator fixture"
    }
  },
  section
});
