import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { balancingEquations_Skill_Data, equationStateSymbols_Skill_Data, symbolicEquations_Skill_Data, wordEquations_Skill_Data } from './skills';

export const reactionEquations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "reactionEquations",
  id: "e833a8d3-d31e-4af3-9181-36ff9e6e4dd7",
  name: {
    en: "Reaction Equations",
  },
  skills: {
    balancingEquations: balancingEquations_Skill_Data,
    equationStateSymbols: equationStateSymbols_Skill_Data,
    symbolicEquations: symbolicEquations_Skill_Data,
    wordEquations: wordEquations_Skill_Data,
  },
  description: {
    methodological: "An equation records reactants, products and stoichiometric relationships but is not, by itself, a mechanism.",
    frontend: {
      en: "Explore how equations represent chemical transformations and their proportions.",
    },
  },
});
