import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const measurementBias_Skill_Data = buildSkillConfig({
  slug: "measurementBias",
  id: "80a13c1e-8f2b-4417-93bf-4cbf59dd79b9",
  name: {
    en: "Measurement Bias",
  },
  description: {
    methodological: "Identify systematic distortions from test wording, cultural assumptions, inaccessible formats, or observer expectations.",
    frontend: {
      en: "Find ways a measurement could systematically disadvantage or misrepresent people.",
    },
  },
});
