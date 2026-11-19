import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

import { rotationExplanation } from "./rotationExplanation";
import { rotationReflection } from "./rotationReflection";
import { RotationSceneConfig } from "./rotationScene";

const content = {
  items: {
    rotationExplanation,
    rotationScene: RotationSceneConfig,
    rotationReflection
  },
  order: [
    "rotationExplanation",
    "rotationScene",
    "rotationReflection"
  ]
};

export const rotation = defineContentSection<"rotation", typeof content.items, LessonLanguages>({
  id: "0edb8604-db15-4e5a-909f-14abce803e6e",
  slug: "rotation",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Чому день змінюється ніччю"
    },
    navigationLabel: {
      uk: "Земля обертається"
    }
  },
  content
});
