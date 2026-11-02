import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAConflictBetweenRights_Skill_Data, distinguishNegativeAndPositiveLiberty_Skill_Data, distinguishRightsFromPrivileges_Skill_Data, explainFreedomOfConscience_Skill_Data } from './skills';

export const rightsAndLiberty_SkillGroup_Data = buildSkillGroupConfig({
  slug: "rightsAndLiberty",
  id: "054356fd-c4aa-4671-a5c0-6f4d77f1a769",
  name: {
    en: "Rights and Liberty",
  },
  skills: {
    analyzeAConflictBetweenRights: analyzeAConflictBetweenRights_Skill_Data,
    distinguishNegativeAndPositiveLiberty: distinguishNegativeAndPositiveLiberty_Skill_Data,
    distinguishRightsFromPrivileges: distinguishRightsFromPrivileges_Skill_Data,
    explainFreedomOfConscience: explainFreedomOfConscience_Skill_Data,
  },
  description: {
    methodological: "A right may protect a person's action, claim, or status and create obligations for others. Competing rights can require principled reconciliation.",
    frontend: {
      en: "Explore what people may claim as rights and what liberty involves.",
    },
  },
});
