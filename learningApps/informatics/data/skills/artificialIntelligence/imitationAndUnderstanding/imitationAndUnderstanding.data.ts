import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainSearlesChineseRoom_Skill_Data, explainTheTuringTest_Skill_Data } from './skills';

export const imitationAndUnderstanding_SkillGroup_Data = buildSkillGroupConfig({
  slug: "imitationAndUnderstanding",
  id: "1a62b00f-132b-4dc7-bb7e-e5def980ca92",
  name: {
    en: "Imitation and Understanding",
  },
  skills: {
    explainSearlesChineseRoom: explainSearlesChineseRoom_Skill_Data,
    explainTheTuringTest: explainTheTuringTest_Skill_Data,
  },
  description: {
    methodological: "Discussions of machine intelligence distinguish outward similarity of responses from claims of internal understanding. A behavioral criterion and a philosophical thought experiment ask different questions; neither alone proves or disproves consciousness.",
    frontend: {
      en: "Examine the difference between convincing imitation and genuine understanding.",
    },
  },
});
