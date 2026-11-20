import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";
import { quizInvitation } from "./quizInvitation";
import { compareIlluminatedPortions } from "../../questions/selectOneAnswer/compareIlluminatedPortions";
import { whatChangedBetweenDays } from "../../questions/selectOneAnswer/whatChangedBetweenDays";
import { moonlightSource } from "../../questions/selectOneAnswer/moonlightSource";
import { lampBallViewpoint } from "../../questions/selectOneAnswer/lampBallViewpoint";
import { daylightMoon } from "../../questions/selectOneAnswer/daylightMoon";

const content = {
  items: {
    quizInvitation
  },
  order: [
    "quizInvitation"
  ]
};

export const sunlitMoonAppearanceQuiz = defineQuizSection<"sunlitMoonAppearanceQuiz", typeof content.items, LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000005",
  slug: "sunlitMoonAppearanceQuiz",
  type: "quiz",
  params: {
    isBlocker: true,
    selection: {
      mode: "all",
      questionIds: [
        compareIlluminatedPortions.id,
        whatChangedBetweenDays.id,
        moonlightSource.id,
        lampBallViewpoint.id,
        daylightMoon.id
      ]
    },
    layout: {
      mode: "stepper",
      showProgress: true
    },
    feedbackMode: "after-completion",
    interaction: {
      retries: 1,
      showErrors: true,
      showCorrectAnswers: true,
      allowExplanations: true,
      allowDeferring: false,
      allowQuestionNavigation: true,
      skippable: false
    },
    results: {
      visibility: "after-review",
      showScore: true
    },
    screen: {
      starting: {
        content: ["quizInvitation"],
        showDefaultContent: false
      }
    }
  },
  locale: {
    title: {
      uk: "Перевір своє розуміння"
    },
    navigationLabel: {
      uk: "Перевірка"
    }
  },
  content
});
