import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { adaptProductDimensions_Skill_Data, evaluateControlReachability_Skill_Data, evaluateGripAndHandling_Skill_Data, evaluateOperatingPosture_Skill_Data } from './skills';

export const productErgonomics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "productErgonomics",
  id: "8139c128-a900-473e-98ce-af68bc8d9dab",
  name: {
    en: "Product Ergonomics",
  },
  skills: {
    adaptProductDimensions: adaptProductDimensions_Skill_Data,
    evaluateControlReachability: evaluateControlReachability_Skill_Data,
    evaluateGripAndHandling: evaluateGripAndHandling_Skill_Data,
    evaluateOperatingPosture: evaluateOperatingPosture_Skill_Data,
  },
  description: {
    methodological: "Geometry, loads and posture influence whether a device can be operated comfortably and dependably.",
    frontend: {
      en: "Explore how body dimensions, grip and posture affect product usability.",
    },
  },
});
