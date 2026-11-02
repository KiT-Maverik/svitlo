import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const useSatellitePositioningInformationForGeographicOrientation_Skill_Data = buildSkillConfig({
  slug: "useSatellitePositioningInformationForGeographicOrientation",
  id: "ab9450c2-60c3-4101-afb8-dcf845252479",
  name: {
    en: "Use satellite-positioning information for geographic orientation",
  },
  description: {
    methodological: "Interpret a position supplied by a GNSS device in relation to a coordinate reference and the surrounding geography; recognize that positioning has uncertainty and does not directly describe what is at the location.",
    frontend: {
      en: "Use a satellite-based location reading while recognizing possible uncertainty.",
    },
  },
});
