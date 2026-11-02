import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const reactionReversibility_Skill_Data = buildSkillConfig({
  slug: "reactionReversibility",
  id: "e56e1543-4fb1-49f1-8922-398a4240f9fd",
  name: {
    en: "Reaction Reversibility",
  },
  description: {
    methodological: "Determine when products can reform reactants, distinguishing a possible reverse pathway from a system that has actually reached dynamic equilibrium.",
    frontend: {
      en: "Recognize reactions that can proceed in both directions.",
    },
  },
});
