import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  recognizeBehaviouralDependenceRisks_Skill_Data,
  recognizeSignsOfProblematicUse_Skill_Data,
  respondToOffersOfHarmfulSubstances_Skill_Data,
  seekHelpForSubstanceRelatedProblems_Skill_Data,
} from './skills';

export const preventionAndAccessToHelp_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'preventionAndAccessToHelp',
  id: 'b5f6b60d-c5c4-4e11-a2f3-85bd6dcf2810',
  name: {
    en: 'Prevention and Access to Help',
  },
  skills: {
    recognizeBehaviouralDependenceRisks: recognizeBehaviouralDependenceRisks_Skill_Data,
    recognizeSignsOfProblematicUse: recognizeSignsOfProblematicUse_Skill_Data,
    respondToOffersOfHarmfulSubstances: respondToOffersOfHarmfulSubstances_Skill_Data,
    seekHelpForSubstanceRelatedProblems: seekHelpForSubstanceRelatedProblems_Skill_Data,
  },
  description: {
    methodological:
      'Dependence involves more than a single behaviour; early support and non-stigmatizing treatment pathways matter.',
    frontend: {
      en: 'Discover how to prevent harmful use and find support early.',
    },
  },
});
