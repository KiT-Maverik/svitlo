import { defineQuizSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";
import { quizInvitation } from "./quizInvitation";

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
        "c861263c-30a1-4d91-bf1b-6c2f1df429b8",
        "2b37e984-7602-44c2-b7f3-cacad6bc252f",
        "cfae194e-1692-42c6-8d57-53ccda07054e",
        "e5a42ad5-d117-420f-89f4-ec5ab4b7d1ea",
        "8fb42da9-0601-43e9-9887-b8836fb6fbdb"
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
