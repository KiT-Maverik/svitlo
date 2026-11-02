import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { earlySocialAttachment_Skill_Data, executiveFunctionDevelopment_Skill_Data, objectPermanence_Skill_Data, playAndLearning_Skill_Data, theoryOfMindDevelopment_Skill_Data } from './skills';

export const earlyAndMiddleChildhood_SkillGroup_Data = buildSkillGroupConfig({
  slug: "earlyAndMiddleChildhood",
  id: "6811ff45-43a1-4f05-8bb1-3003c57a2975",
  name: {
    en: "Early and Middle Childhood",
  },
  skills: {
    earlySocialAttachment: earlySocialAttachment_Skill_Data,
    executiveFunctionDevelopment: executiveFunctionDevelopment_Skill_Data,
    objectPermanence: objectPermanence_Skill_Data,
    playAndLearning: playAndLearning_Skill_Data,
    theoryOfMindDevelopment: theoryOfMindDevelopment_Skill_Data,
  },
  description: {
    methodological: "Rapid changes in attention, symbolic representation, relationships, and self-regulation create different opportunities for learning.",
    frontend: {
      en: "Explore how young children develop relationships, reasoning and self-control.",
    },
  },
});
