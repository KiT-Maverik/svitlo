import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTheOSILayers_Skill_Data = buildSkillConfig({
  slug: "explainTheOSILayers",
  id: "d5d6f227-7cfc-421b-90ca-8f7861035048",
  name: {
    en: "Explain the OSI Layers",
  },
  description: {
    methodological: "The seven OSI layers describe functions from physical signal transmission to application interaction, without requiring one distinct protocol per layer.",
    frontend: {
      en: "Use the seven-layer OSI model to organize networking functions.",
    },
  },
});
