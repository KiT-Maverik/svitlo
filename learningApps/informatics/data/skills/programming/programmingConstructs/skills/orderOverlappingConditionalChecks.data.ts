import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const orderOverlappingConditionalChecks_Skill_Data = buildSkillConfig({
  slug: "orderOverlappingConditionalChecks",
  id: "6a835c1c-939a-4aea-bb0c-b25e22ba1131",
  name: {
    en: "Order Overlapping Conditional Checks",
  },
  description: {
    methodological: "In an `if/else if` chain, explain why a broad condition may make a more specific branch unreachable and place the specific check first when appropriate; do not automatically apply this rule to independent `if` statements.",
    frontend: {
      en: "Arrange conditional checks so specific cases can still be reached.",
    },
  },
});
