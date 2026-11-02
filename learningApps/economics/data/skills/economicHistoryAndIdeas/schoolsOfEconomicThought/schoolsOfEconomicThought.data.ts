import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { behavioralEconomicThought_Skill_Data, classicalPoliticalEconomy_Skill_Data, institutionalEconomicThought_Skill_Data, keynesianApproaches_Skill_Data, neoclassicalEconomics_Skill_Data } from './skills';

export const schoolsOfEconomicThought_SkillGroup_Data = buildSkillGroupConfig({
  slug: "schoolsOfEconomicThought",
  id: "3560764d-b5e6-4f39-a257-453ddfd2acf8",
  name: {
    en: "Напрями економічної думки",
  },
  skills: {
    behavioralEconomicThought: behavioralEconomicThought_Skill_Data,
    classicalPoliticalEconomy: classicalPoliticalEconomy_Skill_Data,
    institutionalEconomicThought: institutionalEconomicThought_Skill_Data,
    keynesianApproaches: keynesianApproaches_Skill_Data,
    neoclassicalEconomics: neoclassicalEconomics_Skill_Data,
  },
  description: {
    methodological: "Economic schools offer differing models and assumptions concerning markets, government, money, and inequality.",
    frontend: {
      en: "Discover how economists have explained economic problems in different ways.",
    },
  },
});
