import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { accessibleFixtureDesign_Skill_Data, compareInclusiveDesignSolutions_Skill_Data, evaluateContinuousAccessRoutes_Skill_Data } from './skills';

export const accessibleEnvironments_SkillGroup_Data = buildSkillGroupConfig({
  slug: "accessibleEnvironments",
  id: "00fc76cf-99b1-4732-adb4-3d9f962a484b",
  name: {
    en: "Accessible Environments",
  },
  skills: {
    accessibleFixtureDesign: accessibleFixtureDesign_Skill_Data,
    compareInclusiveDesignSolutions: compareInclusiveDesignSolutions_Skill_Data,
    evaluateContinuousAccessRoutes: evaluateContinuousAccessRoutes_Skill_Data,
  },
  description: {
    methodological: "Inclusive infrastructure requires usable routes and fixtures as well as accessible individual devices.",
    frontend: {
      en: "Explore how environments can support accessible movement and use.",
    },
  },
});
