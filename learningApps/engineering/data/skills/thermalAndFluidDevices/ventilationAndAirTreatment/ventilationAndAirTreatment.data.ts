import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { airConditioningSystems_Skill_Data, diagnoseRestrictedFluidFlow_Skill_Data, ventilationSystems_Skill_Data } from './skills';

export const ventilationAndAirTreatment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ventilationAndAirTreatment",
  id: "d14e02d6-e0d0-4a43-a972-4af50a92d10c",
  name: {
    en: "Ventilation and Air Treatment",
  },
  skills: {
    airConditioningSystems: airConditioningSystems_Skill_Data,
    diagnoseRestrictedFluidFlow: diagnoseRestrictedFluidFlow_Skill_Data,
    ventilationSystems: ventilationSystems_Skill_Data,
  },
  description: {
    methodological: "Indoor climate equipment needs functional air paths, treatment components and regulation appropriate to occupied spaces.",
    frontend: {
      en: "Explore how buildings circulate and treat indoor air.",
    },
  },
});
