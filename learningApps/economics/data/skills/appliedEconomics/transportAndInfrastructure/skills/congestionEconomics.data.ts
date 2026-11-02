import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const congestionEconomics_Skill_Data = buildSkillConfig({
  slug: "congestionEconomics",
  id: "7fd69507-4cd8-4925-9e69-73cf0e27f10a",
  name: {
    en: "Економіка транспортних заторів",
  },
  description: {
    methodological: "Evaluate the external costs of adding a user to a congested network and compare pricing or demand-management responses.",
    frontend: {
      en: "Understand why each extra vehicle can slow down others.",
    },
  },
});
