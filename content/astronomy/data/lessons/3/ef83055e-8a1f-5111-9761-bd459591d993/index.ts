import { defineLesson } from '@svitlo/engine/build';

import { section } from "./sections";
import { languages } from './constants';
import type { LessonLanguages } from './constants';
import { astronomicalObservationRecords } from "../../../skills/observingTheSky/observationPractice/astronomicalObservationRecords";

export const observationJournal = defineLesson<"observationJournal", LessonLanguages, typeof section.items>({
  id: "ef83055e-8a1f-5111-9761-bd459591d993",
  slug: "observationJournal",
  type: "lesson",
  skills: [astronomicalObservationRecords.id],
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
      uk: "Мій перший щоденник неба",
        en: "My First Sky Journal",
        pl: "Mój pierwszy dziennik nieba"
    }
  },
  section
});
