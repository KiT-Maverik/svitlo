import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const testSetMembership_Skill_Data = buildSkillConfig({
  slug: "testSetMembership",
  id: "78226a20-e21f-479a-84fe-ef99787c5c5e",
  name: {
    en: "Test Set Membership",
  },
  description: {
    methodological: "Determine whether a value belongs to a set without requiring its positional index.",
    frontend: {
      en: "Check whether a particular value belongs to a set.",
    },
  },
});
