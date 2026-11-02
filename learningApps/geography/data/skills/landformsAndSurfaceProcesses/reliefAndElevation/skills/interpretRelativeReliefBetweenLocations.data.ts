import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretRelativeReliefBetweenLocations_Skill_Data = buildSkillConfig({
  slug: "interpretRelativeReliefBetweenLocations",
  id: "014c40ec-7723-457d-8d99-bd1c377cdab8",
  name: {
    en: "Interpret relative relief between locations",
  },
  description: {
    methodological: "Determine or explain the difference in elevation between local points independently of their absolute heights above sea level, using it to describe the vertical variation of a landscape.",
    frontend: {
      en: "Compare height differences between nearby places independently of sea-level elevation.",
    },
  },
});
