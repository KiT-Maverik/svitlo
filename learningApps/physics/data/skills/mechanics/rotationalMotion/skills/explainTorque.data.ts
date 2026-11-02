import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainTorque_Skill_Data = buildSkillConfig({
  slug: "explainTorque",
  id: "29bc63d7-6fcb-40f0-be0e-fca4c67aa4df",
  name: {
    en: "Explain torque",
  },
  description: {
    methodological: "The turning effect of a force depends on its direction and lever arm relative to the axis, not merely on the force's magnitude.",
    frontend: {
      en: "Explain why the same force can turn an object differently depending on its lever arm.",
    },
  },
});
