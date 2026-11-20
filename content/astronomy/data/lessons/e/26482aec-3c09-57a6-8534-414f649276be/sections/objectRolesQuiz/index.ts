import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

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
        "2cac0cd9-d965-4aab-af33-2506aa0f8619",
        "78303144-3bed-4a89-9610-75ae49ae65cd",
        "a2e493f2-e579-4baa-8f85-2171d78afb10",
        "53b10c2c-1120-42c2-a62a-1d63ed539d3b",
        "2165dc36-c878-48e8-b589-d20ac332b86d"
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
      uk: "Перевір, хто є хто"
    },
    navigationLabel: {
      uk: "Перевір себе"
    }
  },
  content
});
