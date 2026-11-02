import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const hesssLaw_Skill_Data = buildSkillConfig({
  slug: "hesssLaw",
  id: "5e7d3cd2-39fe-4dca-a76a-335aff7cbb85",
  name: {
    en: "Hess's Law",
  },
  description: {
    methodological: "Combine known reaction equations and associated enthalpy changes to determine an overall enthalpy change using the state-function character of enthalpy.",
    frontend: {
      en: "Combine known reaction energy changes to calculate another reaction's enthalpy.",
    },
  },
});
