import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const compareInformationSources_Skill_Data = buildSkillConfig({
  slug: "compareInformationSources",
  id: "4a4bc652-a54b-4ac4-92b5-0929ff871964",
  name: {
    en: "Compare Information Sources",
  },
  description: {
    methodological: "Compare accounts from multiple sources concerning the same claim, separate shared facts from discrepancies, and identify what further evidence is needed to explain the differences.",
    frontend: {
      en: "Compare multiple sources and identify where their accounts disagree.",
    },
  },
});
