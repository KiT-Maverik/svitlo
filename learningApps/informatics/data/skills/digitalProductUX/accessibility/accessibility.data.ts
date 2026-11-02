import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { identifyNeedsOfUsersWithDifferentAbilities_Skill_Data, testDigitalInteractionAccessibility_Skill_Data } from './skills';

export const accessibility_SkillGroup_Data = buildSkillGroupConfig({
  slug: "accessibility",
  id: "98e9e953-df14-4baf-b160-12e39c535737",
  name: {
    en: "Accessibility",
  },
  skills: {
    identifyNeedsOfUsersWithDifferentAbilities: identifyNeedsOfUsersWithDifferentAbilities_Skill_Data,
    testDigitalInteractionAccessibility: testDigitalInteractionAccessibility_Skill_Data,
  },
  description: {
    methodological: "Address different ways people perceive and operate interfaces and verify actual usability rather than judging only visual appeal.",
    frontend: {
      en: "Discover how different abilities and input methods affect digital access.",
    },
  },
});
