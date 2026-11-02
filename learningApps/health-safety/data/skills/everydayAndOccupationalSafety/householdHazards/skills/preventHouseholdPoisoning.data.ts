import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const preventHouseholdPoisoning_Skill_Data = buildSkillConfig({
  slug: "preventHouseholdPoisoning",
  id: "03a60e11-f837-4db9-b01f-c763608ba558",
  name: {
    en: "Prevent household poisoning",
  },
  description: {
    methodological: "Reduce access to hazardous chemicals, use original labelled containers, and avoid unsafe storage near food or medicine.",
    frontend: {
      en: "Keep hazardous household substances properly labeled and away from children.",
    },
  },
});
