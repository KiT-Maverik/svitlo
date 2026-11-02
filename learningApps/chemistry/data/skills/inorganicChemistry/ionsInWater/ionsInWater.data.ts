import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { electrolytes_Skill_Data, ionicEquations_Skill_Data, solubilityRules_Skill_Data, waterHardness_Skill_Data } from './skills';

export const ionsInWater_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ionsInWater",
  id: "4f090b84-9ff5-41b8-b812-495c5f0438be",
  name: {
    en: "Ions in Water",
  },
  skills: {
    electrolytes: electrolytes_Skill_Data,
    ionicEquations: ionicEquations_Skill_Data,
    solubilityRules: solubilityRules_Skill_Data,
    waterHardness: waterHardness_Skill_Data,
  },
  description: {
    methodological: "Water permits dissociation and characteristic aqueous reactions, but not every dissolved substance produces free ions.",
    frontend: {
      en: "Learn how substances behave when dissolved in water.",
    },
  },
});
