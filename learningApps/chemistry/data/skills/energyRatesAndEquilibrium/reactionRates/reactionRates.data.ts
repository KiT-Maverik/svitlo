import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { catalysis_Skill_Data, concentrationEffects_Skill_Data, rateLaws_Skill_Data, reactionOrder_Skill_Data, reactionRate_Skill_Data, temperatureEffects_Skill_Data } from './skills';

export const reactionRates_SkillGroup_Data = buildSkillGroupConfig({
  slug: "reactionRates",
  id: "57cac1b7-17c4-4366-87be-106c398b85dc",
  name: {
    en: "Reaction Rates",
  },
  skills: {
    catalysis: catalysis_Skill_Data,
    concentrationEffects: concentrationEffects_Skill_Data,
    rateLaws: rateLaws_Skill_Data,
    reactionOrder: reactionOrder_Skill_Data,
    reactionRate: reactionRate_Skill_Data,
    temperatureEffects: temperatureEffects_Skill_Data,
  },
  description: {
    methodological: "Rates describe how fast concentrations or amounts change, which can vary independently of a reaction's net energy change.",
    frontend: {
      en: "Investigate how quickly reactants turn into products.",
    },
  },
});
