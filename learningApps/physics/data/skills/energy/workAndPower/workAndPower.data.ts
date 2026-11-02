import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainMechanicalWork_Skill_Data, explainThePhysicalMeaningOfPower_Skill_Data } from './skills';

export const workAndPower_SkillGroup_Data = buildSkillGroupConfig({
  slug: "workAndPower",
  id: "332a154e-4903-4dd7-94c9-0bb68c4da2ff",
  name: {
    en: "Work and Power",
  },
  skills: {
    explainMechanicalWork: explainMechanicalWork_Skill_Data,
    explainThePhysicalMeaningOfPower: explainThePhysicalMeaningOfPower_Skill_Data,
  },
  description: {
    methodological: "Work describes energy transfer by a force during displacement, while power describes the rate of energy transfer.",
    frontend: {
      en: "Explore the physical meaning of mechanical work and power.",
    },
  },
});
