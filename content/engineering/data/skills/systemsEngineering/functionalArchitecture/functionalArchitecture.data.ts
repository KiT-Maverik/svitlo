import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  identifyASystemFunction_Skill_Data,
  identifySystemBoundaries_Skill_Data,
  subsystemFunctions_Skill_Data,
  traceAnOperatingSequence_Skill_Data,
  traceInputsAndOutputs_Skill_Data,
} from './skills';

export const functionalArchitecture_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'functionalArchitecture',
  id: 'cf1d0359-b6b7-4552-b2f9-2769346971bd',
  name: {
    en: 'Functional Architecture',
  },
  skills: {
    identifyASystemFunction: identifyASystemFunction_Skill_Data,
    identifySystemBoundaries: identifySystemBoundaries_Skill_Data,
    subsystemFunctions: subsystemFunctions_Skill_Data,
    traceAnOperatingSequence: traceAnOperatingSequence_Skill_Data,
    traceInputsAndOutputs: traceInputsAndOutputs_Skill_Data,
  },
  description: {
    methodological:
      'The same overall service may be implemented by different assemblies; the function and system boundary must be distinguished from component names.',
    frontend: {
      en: 'Learn how functions and boundaries define an engineered system.',
    },
  },
});
