import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeReligiousPluralismAsAPhilosophicalProblem_Skill_Data, analyzeReligiousToleranceAsAnEthicalPrinciple_Skill_Data, distinguishReligiousSkepticismFromAgnosticism_Skill_Data } from './skills';

export const diversityAndMeaning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "diversityAndMeaning",
  id: "c41e8ecd-cd05-4614-93a5-95b3ecfee6e7",
  name: {
    en: "Diversity and Meaning",
  },
  skills: {
    analyzeReligiousPluralismAsAPhilosophicalProblem: analyzeReligiousPluralismAsAPhilosophicalProblem_Skill_Data,
    analyzeReligiousToleranceAsAnEthicalPrinciple: analyzeReligiousToleranceAsAnEthicalPrinciple_Skill_Data,
    distinguishReligiousSkepticismFromAgnosticism: distinguishReligiousSkepticismFromAgnosticism_Skill_Data,
  },
  description: {
    methodological: "Competing outlooks on religion, nonbelief, and life purpose raise interpretive and normative problems. Dialogue must distinguish a disagreement about truth from respect for people's freedom of conscience.",
    frontend: {
      en: "Learn to discuss differences in religion, nonbelief and life's meaning respectfully.",
    },
  },
});
