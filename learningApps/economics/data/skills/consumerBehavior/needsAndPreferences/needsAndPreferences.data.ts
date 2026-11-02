import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { consumerChoiceWithLimitedBudget_Skill_Data, consumerPreferences_Skill_Data, marginalUtility_Skill_Data, needsAndWants_Skill_Data, utility_Skill_Data } from './skills';

export const needsAndPreferences_SkillGroup_Data = buildSkillGroupConfig({
  slug: "needsAndPreferences",
  id: "ef68eb08-0f90-4788-b88c-518f92c4bc67",
  name: {
    en: "Потреби та вподобання",
  },
  skills: {
    consumerChoiceWithLimitedBudget: consumerChoiceWithLimitedBudget_Skill_Data,
    consumerPreferences: consumerPreferences_Skill_Data,
    marginalUtility: marginalUtility_Skill_Data,
    needsAndWants: needsAndWants_Skill_Data,
    utility: utility_Skill_Data,
  },
  description: {
    methodological: "Personal goals and preferences explain why identical goods need not have identical value for different buyers.",
    frontend: {
      en: "Discover why different people value products and experiences differently.",
    },
  },
});
