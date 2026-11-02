import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareTheStrengthOfStructuralShapes_Skill_Data, explainLoadTransfer_Skill_Data, identifyStructuralSupportElements_Skill_Data, predictStructuralStability_Skill_Data, predictTheEffectOfCenterOfMassPositionOnStability_Skill_Data, recognizeBalancedForces_Skill_Data } from './skills';

export const equilibriumAndStability_SkillGroup_Data = buildSkillGroupConfig({
  slug: "equilibriumAndStability",
  id: "b35c01ed-da1c-479e-bb44-7bad565f0c5f",
  name: {
    en: "Equilibrium and Stability",
  },
  skills: {
    compareTheStrengthOfStructuralShapes: compareTheStrengthOfStructuralShapes_Skill_Data,
    explainLoadTransfer: explainLoadTransfer_Skill_Data,
    identifyStructuralSupportElements: identifyStructuralSupportElements_Skill_Data,
    predictStructuralStability: predictStructuralStability_Skill_Data,
    predictTheEffectOfCenterOfMassPositionOnStability: predictTheEffectOfCenterOfMassPositionOnStability_Skill_Data,
    recognizeBalancedForces: recognizeBalancedForces_Skill_Data,
  },
  description: {
    methodological: "Balanced forces allow a body to remain at rest, while the arrangement of supports and loads affects a model's stability and deformation.",
    frontend: {
      en: "Understand the forces that keep structures balanced and stable.",
    },
  },
});
