// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: d552c695dfb4a8ef0b98d56390c434b5224c76bb762c464ccaa8655f8bcd0472
import { defineLesson } from '@svitlo/engine/build';
import { equalsMeansSameValue_languages } from './constants';

// todo: agent note, implement alias #skills
import { equalityMeaning_Skill_Data } from '../../../skills/algebra/equalities/skills';

import {section} from "./sections";

export const equalsMeansSameValue_Lesson = defineLesson({
  id: "92177be3-97a1-5ca4-b21a-07f0dac27f50",
  slug: "equalsMeansSameValue",
  type: "lesson",
  skills: [equalityMeaning_Skill_Data.id],
  params: {
    requireQuiz: false,
    languages: equalsMeansSameValue_languages,
    sections: {
      allowNavigation: true,
      allowSkipping: true,
      showIndexes: true
    }
  },
  locale: {
    title: {
      en: "The Equals Sign Means Same Value"
    }
  },
  section,
  flashcards: {
    items: {},
    order: []
  },
  questions: {

  }
});
