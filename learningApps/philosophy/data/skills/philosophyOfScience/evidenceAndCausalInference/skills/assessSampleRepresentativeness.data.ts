import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessSampleRepresentativeness_Skill_Data = buildSkillConfig({
  slug: "assessSampleRepresentativeness",
  id: "fa387685-2126-4720-9804-9e3c995f529b",
  name: {
    en: "Assess sample representativeness",
  },
  description: {
    methodological: "Examine whether selection and coverage allow findings to extend to the population named in a conclusion.",
    frontend: {
      en: "Decide whether a study's selected participants represent the wider population.",
    },
  },
});
