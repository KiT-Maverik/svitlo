import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { abstractABiologicalPrinciple_Skill_Data, applyANaturalPrincipleToADesign_Skill_Data, evaluateBiomimeticPerformance_Skill_Data, identifyFunctionalBiologicalStrategies_Skill_Data } from './skills';

export const natureInspiredDesign_SkillGroup_Data = buildSkillGroupConfig({
  slug: "natureInspiredDesign",
  id: "c41b339c-cb86-4abf-9b89-fed29e9e7663",
  name: {
    en: "Nature-Inspired Design",
  },
  skills: {
    abstractABiologicalPrinciple: abstractABiologicalPrinciple_Skill_Data,
    applyANaturalPrincipleToADesign: applyANaturalPrincipleToADesign_Skill_Data,
    evaluateBiomimeticPerformance: evaluateBiomimeticPerformance_Skill_Data,
    identifyFunctionalBiologicalStrategies: identifyFunctionalBiologicalStrategies_Skill_Data,
  },
  description: {
    methodological: "A valid biological analogy extracts a function and tests whether it can work with different materials, geometry and scale.",
    frontend: {
      en: "Learn to translate biological functions into engineering principles.",
    },
  },
});
