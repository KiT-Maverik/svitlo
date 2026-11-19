import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

import { modelExplained } from "./modelExplained";
import { RelationshipWorkbenchConfig } from "./relationshipWorkbench";
import { textAlternative } from "./textAlternative";

const content = {
  items: {
    modelExplained,
    relationshipWorkbench: RelationshipWorkbenchConfig,
    textAlternative
  },
  order: [
    "modelExplained",
    "relationshipWorkbench",
    "textAlternative"
  ]
};

export const pathsAndRoles = defineContentSection<"pathsAndRoles", typeof content.items, LessonLanguages>({
  id: "5156d545-ab20-424d-88f8-ee586a52e38f",
  slug: "pathsAndRoles",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Хто навколо кого рухається?"
    },
    navigationLabel: {
      uk: "Хто навколо кого рухається?"
    }
  },
  content
});
