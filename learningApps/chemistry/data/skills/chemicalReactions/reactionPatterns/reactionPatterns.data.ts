import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { combustion_Skill_Data, decompositionReactions_Skill_Data, displacementReactions_Skill_Data, hydrolysis_Skill_Data, precipitationReactions_Skill_Data, synthesisReactions_Skill_Data } from './skills';

export const reactionPatterns_SkillGroup_Data = buildSkillGroupConfig({
  slug: "reactionPatterns",
  id: "96a6ca68-d9be-4a55-9b32-52cb43f655e7",
  name: {
    en: "Reaction Patterns",
  },
  skills: {
    combustion: combustion_Skill_Data,
    decompositionReactions: decompositionReactions_Skill_Data,
    displacementReactions: displacementReactions_Skill_Data,
    hydrolysis: hydrolysis_Skill_Data,
    precipitationReactions: precipitationReactions_Skill_Data,
    synthesisReactions: synthesisReactions_Skill_Data,
  },
  description: {
    methodological: "Reaction patterns classify transformations such as combination, decomposition, precipitation, displacement, combustion and hydrolysis. Some categories may overlap and do not by themselves determine a detailed reaction mechanism.",
    frontend: {
      en: "Discover common ways chemical reactions can be classified.",
    },
  },
});
