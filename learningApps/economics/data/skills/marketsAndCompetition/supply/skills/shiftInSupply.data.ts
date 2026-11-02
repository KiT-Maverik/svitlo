import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const shiftInSupply_Skill_Data = buildSkillConfig({
  slug: "shiftInSupply",
  id: "ede1469c-f3c0-4b47-a07d-7a23010766f3",
  name: {
    en: "Зміщення пропозиції",
  },
  description: {
    methodological: "Assess how technology, input costs, taxes, or supply disruptions change quantity supplied at each price.",
    frontend: {
      en: "Identify events that shift the supply curve.",
    },
  },
});
