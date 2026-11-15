// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 7b89aa67772f9a57e44c6d0104f24a77abc7e87df791dd13f1ef76c6c050afbc
import { defineFlashcard } from '@svitlo/engine/build';
import { cardBack } from "./back/cardBack";
import { cardFront } from "./front/cardFront";
import { cardHint } from "./hint/cardHint";
import type { LessonLanguages } from "../../constants";

const content = {
  front: {
    items: {
      cardFront
    },
    order: [
      "cardFront"
    ]
  },
  back: {
    items: {
      cardBack
    },
    order: [
      "cardBack"
    ]
  },
  hint: {
    items: {
      cardHint
    },
    order: [
      "cardHint"
    ]
  }
};
const parameters = {
  tags: [
    "equality"
  ],
  flags: {
    items: {
      warning: {
        type: "warning" as const
      },
      keyIdea: {
        type: "custom" as const,
        value: {
          en: "Key idea"
        },
        color: "info" as const,
        icon: "lightbulb"
      }
    },
    order: [
      "warning",
      "keyIdea"
    ]
  },
  relationships: {
    items: {},
    order: []
  }
};

export const equalityRecallCard = defineFlashcard<"equalityRecallCard", typeof content.front.items, typeof content.back.items, typeof content.hint.items, typeof parameters.flags.items, typeof parameters.relationships.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000019",
  slug: "equalityRecallCard",
  type: "flashcard",
  parameters,
  content
});
