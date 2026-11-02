import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareObjectsTemperatures_Skill_Data = buildSkillConfig({
  slug: "compareObjectsTemperatures",
  id: "0f293019-3a56-42f0-b638-f9b3d65e8135",
  name: {
    en: "Compare objects' temperatures",
  },
  description: {
    methodological: "Temperature characterizes a body's thermal state; valid comparisons rely on measurements, not the intensity of subjective warmth.",
    frontend: {
      en: "Compare temperatures using instruments rather than touch alone.",
    },
  },
});
