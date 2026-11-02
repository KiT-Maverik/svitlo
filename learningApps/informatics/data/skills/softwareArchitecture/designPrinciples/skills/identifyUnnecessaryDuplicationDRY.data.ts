import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const identifyUnnecessaryDuplicationDRY_Skill_Data = buildSkillConfig({
  slug: "identifyUnnecessaryDuplicationDRY",
  id: "45dffed7-6d1b-428a-82c9-37f3196b3696",
  name: {
    en: "Identify Unnecessary Duplication (DRY)",
  },
  description: {
    methodological: "Find repeated logic or a repeated rule in several locations that requires fixes to be replicated. Similar-looking lines are not necessarily duplication when they represent independent rules.",
    frontend: {
      en: "Find duplicated rules that could cause inconsistent future changes.",
    },
  },
});
