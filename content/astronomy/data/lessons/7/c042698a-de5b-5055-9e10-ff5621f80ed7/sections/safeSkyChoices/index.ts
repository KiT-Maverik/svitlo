import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { quizIntro } from "./quizIntro";

const content = {
  items: {
    quizIntro
  },
  order: [
    "quizIntro"
  ]
};

export const safeSkyChoices = defineQuizSection<"safeSkyChoices", typeof content.items, LessonLanguages>({
  id: "2d844bab-f77e-5dc5-adb9-7891d5bb6b59",
  slug: "safeSkyChoices",
  type: "quiz",
  params: {
    isBlocker: true,
    skippable: false,
    selection: {
      mode: "all",
      questionIds: [
        "6ea474dd-2cec-5927-992c-9220b6d2b68f",
        "ae44c3d6-f62e-56ce-9679-acf4daec8da9",
        "07e1b3a0-5450-5937-b763-66950c254d34"
      ],
      shuffle: false
    },
    layout: {
      mode: "stepper",
      showProgress: true
    },
    feedbackMode: "immediate",
    grading: {
      mode: "percentage",
      successThreshold: 100
    },
    interaction: {
      retries: 1,
      showErrors: true,
      showCorrectAnswers: false,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: false,
      skippable: false
    },
    questionOptions: {
      selectOneAnswer: {
        shuffleAnswers: true
      }
    },
    results: {
      visibility: "immediate",
      showScore: false
    },
    screen: {
      starting: {
        showDefaultContent: false,
        content: ["quizIntro"]
      }
    }
  },
  locale: {
    title: {
      uk: "Перевір безпечний вибір"
    },
    navigationLabel: {
      uk: "Перевір знання"
    }
  },
  content
});
