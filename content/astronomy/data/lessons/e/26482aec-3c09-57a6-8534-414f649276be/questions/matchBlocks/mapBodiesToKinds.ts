import { defineMatchBlocks } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { earthLeft } from "./mapBodiesToKinds/earth/left/earthLeft";
import { earthRight } from "./mapBodiesToKinds/earth/right/earthRight";
import { explanationText } from "./mapBodiesToKinds/explanationText";
import { hintText } from "./mapBodiesToKinds/hintText";
import { moonLeft } from "./mapBodiesToKinds/moon/left/moonLeft";
import { moonRight } from "./mapBodiesToKinds/moon/right/moonRight";
import { prompt } from "./mapBodiesToKinds/prompt";
import { sunLeft } from "./mapBodiesToKinds/sun/left/sunLeft";
import { sunRight } from "./mapBodiesToKinds/sun/right/sunRight";

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
  pairs: {
    items: {
      sun: {
        left: sunLeft,
        right: sunRight
      },
      earth: {
        left: earthLeft,
        right: earthRight
      },
      moon: {
        left: moonLeft,
        right: moonRight
      }
    },
    order: [
      "sun",
      "earth",
      "moon"
    ]
  }
};

export const mapBodiesToKinds = defineMatchBlocks<"mapBodiesToKinds", typeof content, LessonLanguages>({
  id: "838247d7-ca38-47a3-8d35-ba0908894ae7",
  slug: "mapBodiesToKinds",
  type: "matchBlocks",
  params: {
    assessmentMethod: "classification",
    restrictions: []
  },
  locale: {},
  content
});
