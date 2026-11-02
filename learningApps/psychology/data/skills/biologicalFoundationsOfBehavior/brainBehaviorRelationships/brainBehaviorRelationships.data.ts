import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { executiveControlNetworks_Skill_Data, functionalSpecialization_Skill_Data, motorNeuralPathways_Skill_Data, neuroimagingInference_Skill_Data, sensoryNeuralPathways_Skill_Data } from './skills';

export const brainBehaviorRelationships_SkillGroup_Data = buildSkillGroupConfig({
  slug: "brainBehaviorRelationships",
  id: "5d9ee4a9-2c0c-4867-b332-50b66b112a7e",
  name: {
    en: "Brain–Behavior Relationships",
  },
  skills: {
    executiveControlNetworks: executiveControlNetworks_Skill_Data,
    functionalSpecialization: functionalSpecialization_Skill_Data,
    motorNeuralPathways: motorNeuralPathways_Skill_Data,
    neuroimagingInference: neuroimagingInference_Skill_Data,
    sensoryNeuralPathways: sensoryNeuralPathways_Skill_Data,
  },
  description: {
    methodological: "Distributed neural systems support specific psychological functions; brain scans and localized damage require cautious interpretation.",
    frontend: {
      en: "Learn how interacting brain systems support different behaviors.",
    },
  },
});
