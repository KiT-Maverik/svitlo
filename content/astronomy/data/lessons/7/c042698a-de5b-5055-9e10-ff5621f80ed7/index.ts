import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { safeSolarObservation } from "../../../skills/observingTheSky/observationPractice/safeSolarObservation";

export const firstLookAtSky = defineLesson<"firstLookAtSky", LessonLanguages, typeof section.items>({
  id: "c042698a-de5b-5055-9e10-ff5621f80ed7",
  slug: "firstLookAtSky",
  type: "lesson",
  skills: [safeSolarObservation.id],
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
      uk: "Почнімо досліджувати небо"
    }
  },
  // TODO (BLOCKER): Quiz Section "safeSkyChoices" is unfinished; integrate its reviewed bank and completed Section before Lesson publication.
  section
});
