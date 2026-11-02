import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishEvaporationFromBoiling_Skill_Data, distinguishMeltingFromFreezingOfWater_Skill_Data, explainCondensation_Skill_Data, explainEvaporation_Skill_Data } from './skills';

export const phaseTransitions_SkillGroup_Data = buildSkillGroupConfig({
  slug: "phaseTransitions",
  id: "6e5335c6-28af-4958-87e1-b07daac7e529",
  name: {
    en: "Phase Transitions",
  },
  skills: {
    distinguishEvaporationFromBoiling: distinguishEvaporationFromBoiling_Skill_Data,
    distinguishMeltingFromFreezingOfWater: distinguishMeltingFromFreezingOfWater_Skill_Data,
    explainCondensation: explainCondensation_Skill_Data,
    explainEvaporation: explainEvaporation_Skill_Data,
  },
  description: {
    methodological: "Melting, freezing, evaporation, and condensation link thermal conditions to changes of state of the same substance.",
    frontend: {
      en: "Discover how heating and cooling can change matter's physical state.",
    },
  },
});
