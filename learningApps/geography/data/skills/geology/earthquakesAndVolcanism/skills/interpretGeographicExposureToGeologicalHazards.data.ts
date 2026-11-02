import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretGeographicExposureToGeologicalHazards_Skill_Data = buildSkillConfig({
  slug: "interpretGeographicExposureToGeologicalHazards",
  id: "8dfcf52e-b5e4-4203-995f-27b73abd7599",
  name: {
    en: "Interpret geographic exposure to geological hazards",
  },
  description: {
    methodological: "Use an earthquake, volcano or fault map together with settlement locations to identify potentially exposed places, distinguishing hazard location from a precise prediction of future damage.",
    frontend: {
      en: "Use hazard maps to find settlements exposed to geological events.",
    },
  },
});
