import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyLogicalAND_Skill_Data, applyLogicalNOT_Skill_Data, applyLogicalOR_Skill_Data, detectContradictoryRules_Skill_Data, evaluateASimpleCondition_Skill_Data, evaluateCompoundLogicalExpressions_Skill_Data, predictAnOutcomeFromARule_Skill_Data, recognizeAPattern_Skill_Data } from './skills';

export const logicAndPatterns_SkillGroup_Data = buildSkillGroupConfig({
  slug: "logicAndPatterns",
  id: "34b0bd60-2c4f-483a-abab-e2cccd6892ec",
  name: {
    en: "Logic and Patterns",
  },
  skills: {
    applyLogicalAND: applyLogicalAND_Skill_Data,
    applyLogicalNOT: applyLogicalNOT_Skill_Data,
    applyLogicalOR: applyLogicalOR_Skill_Data,
    detectContradictoryRules: detectContradictoryRules_Skill_Data,
    evaluateASimpleCondition: evaluateASimpleCondition_Skill_Data,
    evaluateCompoundLogicalExpressions: evaluateCompoundLogicalExpressions_Skill_Data,
    predictAnOutcomeFromARule: predictAnOutcomeFromARule_Skill_Data,
    recognizeAPattern: recognizeAPattern_Skill_Data,
  },
  description: {
    methodological: "Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.",
    frontend: {
      en: "Discover how rules, patterns and logical conditions support problem solving.",
    },
  },
});
