// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 7afc51a73b5b5891fc02af2b2a2ed565ad57b351532c1e345ebaff5dcdfcd4f1
import { defineLesson } from '@svitlo/engine/build';
import { section } from "./sections";
import { flashcards } from "./flashcards";
import { questions } from "./questions";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { equalityMeaning_Skill_Data } from "../../../skills/algebra/equalities/skills/equalityMeaning.data";

export const equalityGeneratorCoverage_Lesson = defineLesson<"equalityGeneratorCoverage", LessonLanguages, typeof section.items, typeof flashcards.items, typeof questions>({
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
  section,
  flashcards,
  questions
});
