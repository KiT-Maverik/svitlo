import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const predictConsequencesOfExecutionOrder_Skill_Data = buildSkillConfig({
  slug: "predictConsequencesOfExecutionOrder",
  id: "69fe2aee-51a3-4129-a6ea-56b8042b7db7",
  name: {
    en: "Predict Consequences of Execution Order",
  },
  description: {
    methodological: "Determine how the order of assignments, calls, or checks affects program state and outcomes, especially when intuitive code reading is misleading. For example, a later instruction operates on a value already changed by an earlier one; unlike merely predicting output, this analyzes causal dependencies on order.",
    frontend: {
      en: "Explain why changing the order of commands can change the result.",
    },
  },
});
