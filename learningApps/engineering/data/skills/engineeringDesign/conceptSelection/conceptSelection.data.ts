import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  anticipateFailureModes_Skill_Data,
  compareDesignAlternatives_Skill_Data,
  decomposeADesignProblem_Skill_Data,
  generateAlternativeDesignConcepts_Skill_Data,
  justifyADesignTradeOff_Skill_Data,
} from './skills';

export const conceptSelection_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'conceptSelection',
  id: '1bf1f831-a448-4f02-a8f5-2e2ab554b5fb',
  name: {
    en: 'Concept Selection',
  },
  skills: {
    anticipateFailureModes: anticipateFailureModes_Skill_Data,
    compareDesignAlternatives: compareDesignAlternatives_Skill_Data,
    decomposeADesignProblem: decomposeADesignProblem_Skill_Data,
    generateAlternativeDesignConcepts: generateAlternativeDesignConcepts_Skill_Data,
    justifyADesignTradeOff: justifyADesignTradeOff_Skill_Data,
  },
  description: {
    methodological:
      'Competing technical arrangements can meet the same need in different ways; choosing responsibly requires functional comparison and defensible compromises.',
    frontend: {
      en: 'Learn to compare possible ways of meeting a technical need.',
    },
  },
});
