import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { chemicalModels_Skill_Data, chemistryAsADiscipline_Skill_Data, macroscopicAndParticleExplanations_Skill_Data, testableChemicalPredictions_Skill_Data } from './skills';

export const questionsAndModels_SkillGroup_Data = buildSkillGroupConfig({
  slug: "questionsAndModels",
  id: "e92e0187-6f45-476f-84e7-c0413b09556c",
  name: {
    en: "Questions and Models",
  },
  skills: {
    chemicalModels: chemicalModels_Skill_Data,
    chemistryAsADiscipline: chemistryAsADiscipline_Skill_Data,
    macroscopicAndParticleExplanations: macroscopicAndParticleExplanations_Skill_Data,
    testableChemicalPredictions: testableChemicalPredictions_Skill_Data,
  },
  description: {
    methodological: "Chemical claims can be examined by specifying substances, observable properties, conditions and possible particle-level explanations.",
    frontend: {
      en: "Learn how chemical questions are framed and explained using evidence and models.",
    },
  },
});
