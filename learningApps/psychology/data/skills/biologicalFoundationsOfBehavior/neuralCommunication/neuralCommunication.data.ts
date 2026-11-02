import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { neuralExcitation_Skill_Data, neuralInhibition_Skill_Data, neuralPlasticity_Skill_Data, neuralSignaling_Skill_Data, neurotransmitterAction_Skill_Data } from './skills';

export const neuralCommunication_SkillGroup_Data = buildSkillGroupConfig({
  slug: "neuralCommunication",
  id: "800a3236-68b7-4df2-81c8-07aeb4548713",
  name: {
    en: "Neural Communication",
  },
  skills: {
    neuralExcitation: neuralExcitation_Skill_Data,
    neuralInhibition: neuralInhibition_Skill_Data,
    neuralPlasticity: neuralPlasticity_Skill_Data,
    neuralSignaling: neuralSignaling_Skill_Data,
    neurotransmitterAction: neurotransmitterAction_Skill_Data,
  },
  description: {
    methodological: "Communication within nervous systems depends on electrical signals, chemical modulation, and changing connections that relate to behavioral functions.",
    frontend: {
      en: "Discover how neurons send signals and change their connections.",
    },
  },
});
