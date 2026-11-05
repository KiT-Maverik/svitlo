import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conceptSelection_SkillGroup_Data } from './conceptSelection/conceptSelection.data';
import { problemDefinition_SkillGroup_Data } from './problemDefinition/problemDefinition.data';
import { representationsAndPrototypes_SkillGroup_Data } from './representationsAndPrototypes/representationsAndPrototypes.data';
import { testingAndIteration_SkillGroup_Data } from './testingAndIteration/testingAndIteration.data';

export const engineeringDesign_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'engineeringDesign',
  id: 'cf069b94-4637-47c7-ae74-b0de20cd0998',
  name: {
    en: 'Engineering Design',
  },
  groups: {
    conceptSelection: conceptSelection_SkillGroup_Data,
    problemDefinition: problemDefinition_SkillGroup_Data,
    representationsAndPrototypes: representationsAndPrototypes_SkillGroup_Data,
    testingAndIteration: testingAndIteration_SkillGroup_Data,
  },
  description: {
    methodological:
      'A design must respond to an actual need, not merely demonstrate a technology. This domain concerns converting uncertain problems into requirements, selecting feasible concepts, communicating designs and improving them using evidence.',
    frontend: {
      en: 'Learn to develop, test and improve technical solutions to practical needs.',
    },
  },
});
