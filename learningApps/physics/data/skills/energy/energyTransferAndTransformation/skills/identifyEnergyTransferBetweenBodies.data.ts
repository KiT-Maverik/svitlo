import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyEnergyTransferBetweenBodies_Skill_Data = buildSkillConfig({
  slug: "identifyEnergyTransferBetweenBodies",
  id: "f3a822e0-c51e-4d80-8cab-27c3ee023abf",
  name: {
    en: "Identify energy transfer between bodies",
  },
  description: {
    methodological: "Using colliding balls or water heating, show which body transfers energy to which other body.",
    frontend: {
      en: "Identify which body gives energy to another during an interaction.",
    },
  },
});
