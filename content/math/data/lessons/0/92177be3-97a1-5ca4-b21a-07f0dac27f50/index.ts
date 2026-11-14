// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: d552c695dfb4a8ef0b98d56390c434b5224c76bb762c464ccaa8655f8bcd0472
import { defineLesson } from '@svitlo/engine/build';
import { section1PredictWhetherTwoAmountsMatch_Section } from './sections/section1PredictWhetherTwoAmountsMatch';
import { section2EqualityDoesNotJustAnnounceTheAnswer_Section } from './sections/section2EqualityDoesNotJustAnnounceTheAnswer';
import { section3RepairAFalseEquality_Section } from './sections/section3RepairAFalseEquality';
import { section4IndependentTransfer_Section } from './sections/section4IndependentTransfer';

export const equalsMeansSameValue_Lesson = defineLesson({
  id: "92177be3-97a1-5ca4-b21a-07f0dac27f50",
  slug: "equalsMeansSameValue",
  type: "lesson",
  skills: [
    "974af868-5b72-4a5a-a88e-8f7e03e48661"
  ],
  params: {
    requireQuiz: false,
    languages: [
      "en",
      "pl",
      "uk",
      "qm"
    ],
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
  section: {
    items: {
      section1PredictWhetherTwoAmountsMatch: section1PredictWhetherTwoAmountsMatch_Section,
      section2EqualityDoesNotJustAnnounceTheAnswer: section2EqualityDoesNotJustAnnounceTheAnswer_Section,
      section3RepairAFalseEquality: section3RepairAFalseEquality_Section,
      section4IndependentTransfer: section4IndependentTransfer_Section
    },
    order: [
      "section1PredictWhetherTwoAmountsMatch",
      "section2EqualityDoesNotJustAnnounceTheAnswer",
      "section3RepairAFalseEquality",
      "section4IndependentTransfer"
    ]
  },
  flashcards: {
    items: {},
    order: []
  }
});
