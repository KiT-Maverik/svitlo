import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { preventChronicOverload_Skill_Data, seekMentalHealthSupport_Skill_Data, supportSomeoneExperiencingDistress_Skill_Data, useSafeCopingStrategies_Skill_Data } from './skills';

export const everydayCopingAndAssistance_SkillGroup_Data = buildSkillGroupConfig({
  slug: "everydayCopingAndAssistance",
  id: "24b94762-6f2e-4cc2-a3f6-c4378968a39c",
  name: {
    en: "Everyday Coping and Assistance",
  },
  skills: {
    preventChronicOverload: preventChronicOverload_Skill_Data,
    seekMentalHealthSupport: seekMentalHealthSupport_Skill_Data,
    supportSomeoneExperiencingDistress: supportSomeoneExperiencingDistress_Skill_Data,
    useSafeCopingStrategies: useSafeCopingStrategies_Skill_Data,
  },
  description: {
    methodological: "Helpful responses can involve self-care, support networks, appropriate boundaries, and referral rather than demanding that a person solve a crisis alone.",
    frontend: {
      en: "Discover everyday coping methods and appropriate sources of assistance.",
    },
  },
});
