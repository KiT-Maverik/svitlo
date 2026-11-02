import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const selectAMapTypeForAGeographicQuestion_Skill_Data = buildSkillConfig({
  slug: "selectAMapTypeForAGeographicQuestion",
  id: "a4e4be2d-29d2-45e9-afa5-f83a8661248c",
  name: {
    en: "Select a map type for a geographic question",
  },
  description: {
    methodological: "Match a question to the type of information a map must show: for example, use a geological map to investigate rock distribution or a population-density map to compare settlement concentration. Do not substitute a visually attractive map lacking the required variable.",
    frontend: {
      en: "Select the right kind of map for a particular geographic question.",
    },
  },
});
