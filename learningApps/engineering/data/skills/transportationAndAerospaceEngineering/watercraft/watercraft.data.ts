import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { hullDesignChoices_Skill_Data, marinePropulsion_Skill_Data, marineSteering_Skill_Data } from './skills';

export const watercraft_SkillGroup_Data = buildSkillGroupConfig({
  slug: "watercraft",
  id: "2f729c9f-3813-4796-9e50-d603b065e251",
  name: {
    en: "Watercraft",
  },
  skills: {
    hullDesignChoices: hullDesignChoices_Skill_Data,
    marinePropulsion: marinePropulsion_Skill_Data,
    marineSteering: marineSteering_Skill_Data,
  },
  description: {
    methodological: "Vessels need suitable hulls, propulsion and steering while managing stability and water resistance.",
    frontend: {
      en: "Discover how vessel design and equipment affect travel through water.",
    },
  },
});
