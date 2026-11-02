import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const opportunityCost_Skill_Data = buildSkillConfig({
  slug: "opportunityCost",
  id: "6f01ce8a-22c5-44bf-8193-3e6e1f8207f8",
  name: {
    en: "Альтернативна вартість",
  },
  description: {
    methodological: "Determine the value of the best alternative given up when choosing an option; do not automatically equate opportunity cost with monetary expenditure.",
    frontend: {
      en: "Identify the most valuable option you give up when making a choice.",
    },
  },
});
