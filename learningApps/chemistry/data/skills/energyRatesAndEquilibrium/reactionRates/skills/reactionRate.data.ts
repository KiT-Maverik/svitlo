import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const reactionRate_Skill_Data = buildSkillConfig({
  slug: "reactionRate",
  id: "692bb447-d64e-4a8c-baf4-ebaaceba85a9",
  name: {
    en: "Reaction Rate",
  },
  description: {
    methodological: "Interpret change in reactant or product amount over time with consistent sign and units.",
    frontend: {
      en: "Calculate how fast reactants disappear or products appear over time.",
    },
  },
});
