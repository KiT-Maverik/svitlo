import { defineSelectMultipleAnswers } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { correct1 } from "./diagramInterpretationLimits/correct/correct1";
import { correct2 } from "./diagramInterpretationLimits/correct/correct2";
import { correct3 } from "./diagramInterpretationLimits/correct/correct3";
import { explanationText } from "./diagramInterpretationLimits/explanationText";
import { hintText } from "./diagramInterpretationLimits/hintText";
import { incorrect1 } from "./diagramInterpretationLimits/incorrect/incorrect1";
import { incorrect2 } from "./diagramInterpretationLimits/incorrect/incorrect2";
import { prompt } from "./diagramInterpretationLimits/prompt";

const content = {
  question: {
    items: {
      prompt
    },
    order: [
      "prompt"
    ]
  },
  hint: {
    items: {
      hintText
    },
    order: [
      "hintText"
    ]
  },
  explanation: {
    items: {
      explanationText
    },
    order: [
      "explanationText"
    ]
  },
  answers: {
    correct: {
      items: {
        correct1,
        correct2,
        correct3
      },
      order: [
        "correct1",
        "correct2",
        "correct3"
      ]
    },
    incorrect: {
      items: {
        incorrect1,
        incorrect2
      },
      order: [
        "incorrect1",
        "incorrect2"
      ]
    },
    distractors: {
      items: {},
      order: []
    }
  }
};

export const diagramInterpretationLimits = defineSelectMultipleAnswers<"diagramInterpretationLimits", typeof content, LessonLanguages>({
  id: "69a596d4-d22c-4e15-bee1-9558f2adc6c3",
  slug: "diagramInterpretationLimits",
  type: "selectMultipleAnswers",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
