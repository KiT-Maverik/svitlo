import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeHumanAutonomyInTechnologicalSystems_Skill_Data, analyzeTechnologicalMediation_Skill_Data, evaluateTechnologicalDeterminism_Skill_Data } from './skills';

export const technologyAndSociety_SkillGroup_Data = buildSkillGroupConfig({
  slug: "technologyAndSociety",
  id: "b62dd9d0-920a-4840-840d-876f73fc3903",
  name: {
    en: "Technology and Society",
  },
  skills: {
    analyzeHumanAutonomyInTechnologicalSystems: analyzeHumanAutonomyInTechnologicalSystems_Skill_Data,
    analyzeTechnologicalMediation: analyzeTechnologicalMediation_Skill_Data,
    evaluateTechnologicalDeterminism: evaluateTechnologicalDeterminism_Skill_Data,
  },
  description: {
    methodological: "Technological artifacts and institutions shape the practical conditions of action, social change, and control. Philosophical analysis evaluates these mediation and agency claims rather than measuring product usage or engineering device performance.",
    frontend: {
      en: "Learn to analyze how technologies affect human action and society.",
    },
  },
});
