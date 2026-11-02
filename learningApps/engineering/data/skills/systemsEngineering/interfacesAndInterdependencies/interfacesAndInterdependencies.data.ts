import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeSubsystemDependencies_Skill_Data, evaluateSystemLevelCompromises_Skill_Data, identifyComponentInterfaces_Skill_Data, predictTheEffectOfComponentChanges_Skill_Data } from './skills';

export const interfacesAndInterdependencies_SkillGroup_Data = buildSkillGroupConfig({
  slug: "interfacesAndInterdependencies",
  id: "0dba9a82-19a3-4cab-960c-0b3b47298db6",
  name: {
    en: "Interfaces and Interdependencies",
  },
  skills: {
    analyzeSubsystemDependencies: analyzeSubsystemDependencies_Skill_Data,
    evaluateSystemLevelCompromises: evaluateSystemLevelCompromises_Skill_Data,
    identifyComponentInterfaces: identifyComponentInterfaces_Skill_Data,
    predictTheEffectOfComponentChanges: predictTheEffectOfComponentChanges_Skill_Data,
  },
  description: {
    methodological: "Local decisions affect neighboring components through mechanical, electrical, fluid and information connections.",
    frontend: {
      en: "Discover how connected components depend on each other.",
    },
  },
});
