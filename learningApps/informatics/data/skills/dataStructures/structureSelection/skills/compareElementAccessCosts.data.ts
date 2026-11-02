import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareElementAccessCosts_Skill_Data = buildSkillConfig({
  slug: "compareElementAccessCosts",
  id: "3167babf-d227-4f39-8f4a-6e0c7a61f533",
  name: {
    en: "Compare Element Access Costs",
  },
  description: {
    methodological: "Compare typical direct access in an indexed array with traversal through a linked list to the desired node.",
    frontend: {
      en: "Compare how quickly arrays and linked lists reach a particular element.",
    },
  },
});
