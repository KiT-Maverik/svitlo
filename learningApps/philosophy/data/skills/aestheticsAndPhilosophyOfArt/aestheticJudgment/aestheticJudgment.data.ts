import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeTheRoleOfContextInAestheticExperience_Skill_Data, compareObjectiveAndSubjectiveAccountsOfBeauty_Skill_Data, distinguishAestheticFromInstrumentalValue_Skill_Data, justifyAnAestheticJudgment_Skill_Data } from './skills';

export const aestheticJudgment_SkillGroup_Data = buildSkillGroupConfig({
  slug: "aestheticJudgment",
  id: "db8ba707-c798-4d81-94f0-e3458ebc6667",
  name: {
    en: "Aesthetic Judgment",
  },
  skills: {
    analyzeTheRoleOfContextInAestheticExperience: analyzeTheRoleOfContextInAestheticExperience_Skill_Data,
    compareObjectiveAndSubjectiveAccountsOfBeauty: compareObjectiveAndSubjectiveAccountsOfBeauty_Skill_Data,
    distinguishAestheticFromInstrumentalValue: distinguishAestheticFromInstrumentalValue_Skill_Data,
    justifyAnAestheticJudgment: justifyAnAestheticJudgment_Skill_Data,
  },
  description: {
    methodological: "An aesthetic evaluation can invoke perceptual qualities, interpretation, tradition, or standards that other observers may dispute.",
    frontend: {
      en: "Discover how aesthetic opinions can be supported by reasons.",
    },
  },
});
