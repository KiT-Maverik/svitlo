import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { askAProbingPhilosophicalQuestion_Skill_Data, reconstructAnotherPersonsPositionFairly_Skill_Data, respondToAPhilosophicalObjection_Skill_Data, reviseAPositionInLightOfReasons_Skill_Data } from './skills';

export const dialogueAndDisagreement_SkillGroup_Data = buildSkillGroupConfig({
  slug: "dialogueAndDisagreement",
  id: "f31a534b-2d3e-4e34-86a0-068d5df37525",
  name: {
    en: "Dialogue and Disagreement",
  },
  skills: {
    askAProbingPhilosophicalQuestion: askAProbingPhilosophicalQuestion_Skill_Data,
    reconstructAnotherPersonsPositionFairly: reconstructAnotherPersonsPositionFairly_Skill_Data,
    respondToAPhilosophicalObjection: respondToAPhilosophicalObjection_Skill_Data,
    reviseAPositionInLightOfReasons: reviseAPositionInLightOfReasons_Skill_Data,
  },
  description: {
    methodological: "Reasoned dialogue seeks understanding and justified revision, not simply winning assent. Participants must fairly represent alternatives and keep interpersonal respect separate from agreement.",
    frontend: {
      en: "Discover how respectful disagreement can help us reconsider ideas.",
    },
  },
});
