import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const determineMapOrientationFromItsNorthIndicator_Skill_Data = buildSkillConfig({
  slug: "determineMapOrientationFromItsNorthIndicator",
  id: "8e13e949-45d2-43a1-bb40-05a613681569",
  name: {
    en: "Determine map orientation from its north indicator",
  },
  description: {
    methodological: "Use the map's stated orientation rather than assuming the top of every depiction is geographic north.",
    frontend: {
      en: "Orient a map using its north indicator instead of assuming north is always at the top.",
    },
  },
});
