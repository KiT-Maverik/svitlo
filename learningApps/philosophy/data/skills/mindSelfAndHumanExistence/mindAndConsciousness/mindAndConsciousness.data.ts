import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAPhilosophicalProblemOfArtificialConsciousness_Skill_Data, compareTheoriesOfTheMindBodyRelation_Skill_Data, distinguishMentalFromPhysicalDescriptions_Skill_Data, explainTheProblemOfOtherMinds_Skill_Data } from './skills';

export const mindAndConsciousness_SkillGroup_Data = buildSkillGroupConfig({
  slug: "mindAndConsciousness",
  id: "ffe19173-5b74-4acb-9c03-5451293e57e4",
  name: {
    en: "Mind and Consciousness",
  },
  skills: {
    analyzeAPhilosophicalProblemOfArtificialConsciousness: analyzeAPhilosophicalProblemOfArtificialConsciousness_Skill_Data,
    compareTheoriesOfTheMindBodyRelation: compareTheoriesOfTheMindBodyRelation_Skill_Data,
    distinguishMentalFromPhysicalDescriptions: distinguishMentalFromPhysicalDescriptions_Skill_Data,
    explainTheProblemOfOtherMinds: explainTheProblemOfOtherMinds_Skill_Data,
  },
  description: {
    methodological: "A first-person experience and a third-person physical description offer different perspectives on mental life. Philosophical theories disagree about how these perspectives relate.",
    frontend: {
      en: "Discover different ways of understanding subjective experience and the mind.",
    },
  },
});
