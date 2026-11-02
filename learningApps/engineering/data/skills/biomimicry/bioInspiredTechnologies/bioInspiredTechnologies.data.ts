import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { bioInspiredAttachment_Skill_Data, biomimeticStreamlining_Skill_Data, lightweightBioInspiredStructures_Skill_Data, selfCleaningSurfaces_Skill_Data } from './skills';

export const bioInspiredTechnologies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "bioInspiredTechnologies",
  id: "a56ffc78-7789-4050-8f10-d80e3de2c126",
  name: {
    en: "Bio-Inspired Technologies",
  },
  skills: {
    bioInspiredAttachment: bioInspiredAttachment_Skill_Data,
    biomimeticStreamlining: biomimeticStreamlining_Skill_Data,
    lightweightBioInspiredStructures: lightweightBioInspiredStructures_Skill_Data,
    selfCleaningSurfaces: selfCleaningSurfaces_Skill_Data,
  },
  description: {
    methodological: "Distinct examples show recurring design strategies, not a separate Skill for every organism.",
    frontend: {
      en: "Discover devices and materials inspired by biological forms and surfaces.",
    },
  },
});
