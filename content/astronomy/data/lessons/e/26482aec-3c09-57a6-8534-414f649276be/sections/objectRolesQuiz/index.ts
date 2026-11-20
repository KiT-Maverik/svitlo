import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import {
  sunEmitsOwnLight,
  naturalSatelliteOfAnotherPlanet,
  arrowDirectionBodies,
  marsSiriusContrast,
  moonAndEarthAroundSun
} from "../../questions/selectOneAnswer";

import { quizIntroduction } from "./quizIntroduction";

const content = {
  items: {
    quizIntroduction
  },
  order: [
    "quizIntroduction"
  ]
};

// TODO (BLOCKER): Stage 5 Question publication, real Quiz rendering and locale coverage remain pending.
// Stage 4 independently accepted the five real selected UUIDs at commit 1473c833;
// Selection imports the reviewed Question Configurators; IDs are never duplicated here.
// the generated TypeScript bank is not proof of published or accessible Questions.
export const objectRolesQuiz = defineQuizSection<"objectRolesQuiz", typeof content.items, LessonLanguages>({
  id: "742ca5c5-d2c1-4cc2-a268-ef50ce3f07e8",
  slug: "objectRolesQuiz",
  type: "quiz",
  params: {
    isBlocker: true,
    selection: {
      mode: "all",
      questionIds: [
        sunEmitsOwnLight.id,
        naturalSatelliteOfAnotherPlanet.id,
        arrowDirectionBodies.id,
        marsSiriusContrast.id,
        moonAndEarthAroundSun.id
      ]
    },
    layout: {
      mode: "stepper",
      showProgress: true
    },
    feedbackMode: "immediate",
    questionOptions: {
      selectOneAnswer: {
        shuffleAnswers: true
      }
    },
    interaction: {
      retries: 1,
      showErrors: true,
      showCorrectAnswers: false,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: true,
      skippable: false
    },
    // Diagnostic feedback, not a claim of mastery or a numerical pass threshold.
    results: {
      visibility: "after-review",
      showScore: false
    },
    // TODO (BLOCKER): Verify the intro screen is actually rendered by the UI Kit;
    // current EngineQuestionRenderer does not read Quiz screen content.
    screen: {
      starting: {
        content: ["quizIntroduction"]
      }
    }
  },
  locale: {
    title: {
      uk: "Перевір, хто є хто",
      en: "Check who's who",
      pl: "Sprawdź, kto jest kim",
      qm: "Kim kim ekenini tekşir"
    },
    navigationLabel: {
      uk: "Перевір себе",
      en: "Test yourself",
      pl: "Sprawdź się",
      qm: "Özüñni sına"
    }
  },
  content
});
