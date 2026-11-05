import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  diagnoseAPrototypeFailure_Skill_Data,
  evaluatePrototypePerformance_Skill_Data,
  measurementUncertainty_Skill_Data,
  planAnEngineeringTest_Skill_Data,
  reviseADesignUsingEvidence_Skill_Data,
  validateUserNeeds_Skill_Data,
  verifyDesignRequirements_Skill_Data,
} from './skills';

export const testingAndIteration_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'testingAndIteration',
  id: 'ea206b05-6976-49cf-882b-c98ea0c2ca4f',
  name: {
    en: 'Testing and Iteration',
  },
  skills: {
    diagnoseAPrototypeFailure: diagnoseAPrototypeFailure_Skill_Data,
    evaluatePrototypePerformance: evaluatePrototypePerformance_Skill_Data,
    measurementUncertainty: measurementUncertainty_Skill_Data,
    planAnEngineeringTest: planAnEngineeringTest_Skill_Data,
    reviseADesignUsingEvidence: reviseADesignUsingEvidence_Skill_Data,
    validateUserNeeds: validateUserNeeds_Skill_Data,
    verifyDesignRequirements: verifyDesignRequirements_Skill_Data,
  },
  description: {
    methodological:
      'A plausible prototype is not proof of performance. Measurement, failure analysis and controlled revisions provide a basis for improving the proposed product.',
    frontend: {
      en: 'Use evidence from testing to improve a prototype and check its purpose.',
    },
  },
});
