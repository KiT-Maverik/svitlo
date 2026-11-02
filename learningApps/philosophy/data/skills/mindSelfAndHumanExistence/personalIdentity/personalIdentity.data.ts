import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { analyzeAPersonhoodCriterion_Skill_Data, compareBodilyAndPsychologicalContinuityAccounts_Skill_Data, distinguishPersonalIdentityFromSimilarity_Skill_Data, evaluateTheRoleOfMemoryInPersonalIdentity_Skill_Data } from './skills';

export const personalIdentity_SkillGroup_Data = buildSkillGroupConfig({
  slug: "personalIdentity",
  id: "5ff765a3-fed4-4469-871d-5f77ee91f446",
  name: {
    en: "Personal Identity",
  },
  skills: {
    analyzeAPersonhoodCriterion: analyzeAPersonhoodCriterion_Skill_Data,
    compareBodilyAndPsychologicalContinuityAccounts: compareBodilyAndPsychologicalContinuityAccounts_Skill_Data,
    distinguishPersonalIdentityFromSimilarity: distinguishPersonalIdentityFromSimilarity_Skill_Data,
    evaluateTheRoleOfMemoryInPersonalIdentity: evaluateTheRoleOfMemoryInPersonalIdentity_Skill_Data,
  },
  description: {
    methodological: "The self may be characterized by bodily, psychological, narrative, or relational continuity. The question is what makes someone the same person, not how memory works empirically.",
    frontend: {
      en: "Explore what makes someone the same person despite changes over time.",
    },
  },
});
