import { defineMatchBlocks } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { earthLeft } from "./earth/left/earthLeft";
import { earthRight } from "./earth/right/earthRight";
import { explanationText } from "./explanationText";
import { hintText } from "./hintText";
import { moonLeft } from "./moon/left/moonLeft";
import { moonRight } from "./moon/right/moonRight";
import { prompt } from "./prompt";

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
      "earth",
      "moon"
    ]
  }
};

export const mapBodiesToCenters = defineMatchBlocks<"mapBodiesToCenters", typeof content, LessonLanguages>({
  id: "db71cbc6-f666-4278-bf52-46ce6a271d15",
  slug: "mapBodiesToCenters",
  type: "matchBlocks",
  params: {
    assessmentMethod: "relationshipMapping",
    restrictions: []
  },
  locale: {},
  content
});
