import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const inventoryManagement_Skill_Data = buildSkillConfig({
  slug: "inventoryManagement",
  id: "1337e36f-3567-437d-9f8b-09a4aae6fa5f",
  name: {
    en: "Керування товарними запасами",
  },
  description: {
    methodological: "Balance product availability against storage costs, spoilage, and the risk of shortages.",
    frontend: {
      en: "Learn why stores must balance having enough stock with keeping costs down.",
    },
  },
});
