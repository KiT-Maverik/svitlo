import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { applyModusPonens_Skill_Data, applyModusTollens_Skill_Data, assessDeductiveValidity_Skill_Data, distinguishValidityFromSoundness_Skill_Data, evaluateACategoricalSyllogism_Skill_Data, identifyAContradictionInASetOfClaims_Skill_Data } from './skills';

export const deductiveReasoning_SkillGroup_Data = buildSkillGroupConfig({
  slug: "deductiveReasoning",
  id: "05213612-9652-41aa-9e86-831a7a0ce9b7",
  name: {
    en: "Deductive Reasoning",
  },
  skills: {
    applyModusPonens: applyModusPonens_Skill_Data,
    applyModusTollens: applyModusTollens_Skill_Data,
    assessDeductiveValidity: assessDeductiveValidity_Skill_Data,
    distinguishValidityFromSoundness: distinguishValidityFromSoundness_Skill_Data,
    evaluateACategoricalSyllogism: evaluateACategoricalSyllogism_Skill_Data,
    identifyAContradictionInASetOfClaims: identifyAContradictionInASetOfClaims_Skill_Data,
  },
  description: {
    methodological: "Deduction concerns whether it is possible for premises to be true while a conclusion is false. Logical form is evaluated separately from whether the premises describe the world correctly.",
    frontend: {
      en: "Explore when conclusions necessarily follow from given premises.",
    },
  },
});
