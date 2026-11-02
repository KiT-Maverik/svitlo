import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareSetsOfObservations_Skill_Data, constructASimpleChart_Skill_Data, findTheMostFrequentValue_Skill_Data, readAChart_Skill_Data } from './skills';

export const statisticalInvestigation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "statisticalInvestigation",
  id: "89da9de7-eea1-4dc8-a2e0-998747bacc47",
  name: {
    en: "Statistical Investigation",
  },
  skills: {
    compareSetsOfObservations: compareSetsOfObservations_Skill_Data,
    constructASimpleChart: constructASimpleChart_Skill_Data,
    findTheMostFrequentValue: findTheMostFrequentValue_Skill_Data,
    readAChart: readAChart_Skill_Data,
  },
  description: {
    methodological: "Read and create visual representations of datasets, find frequencies, and compare observations. Statistical conclusions describe data and are not equivalent to predicting a random outcome.",
    frontend: {
      en: "Learn to explore data through charts, frequencies and comparisons.",
    },
  },
});
