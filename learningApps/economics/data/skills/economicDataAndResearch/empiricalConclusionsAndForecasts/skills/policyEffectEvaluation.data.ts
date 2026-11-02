import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const policyEffectEvaluation_Skill_Data = buildSkillConfig({
  slug: "policyEffectEvaluation",
  id: "b3c0e066-7a3b-456b-add6-07e49e2ebbae",
  name: {
    en: "Оцінювання ефекту політики",
  },
  description: {
    methodological: "Formulate the counterfactual question of what would have occurred without an intervention and assess whether evidence can answer it.",
    frontend: {
      en: "Assess what a policy changed compared with what might have happened otherwise.",
    },
  },
});
