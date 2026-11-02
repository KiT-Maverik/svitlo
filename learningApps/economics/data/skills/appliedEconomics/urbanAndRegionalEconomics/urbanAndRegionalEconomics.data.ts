import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { agglomerationEffects_Skill_Data, regionalEconomicDisparities_Skill_Data, regionalSpecialization_Skill_Data } from './skills';

export const urbanAndRegionalEconomics_SkillGroup_Data = buildSkillGroupConfig({
  slug: "urbanAndRegionalEconomics",
  id: "0b441c9b-b15b-4876-97f8-1b2ae64c9c5d",
  name: {
    en: "Міста та регіони",
  },
  skills: {
    agglomerationEffects: agglomerationEffects_Skill_Data,
    regionalEconomicDisparities: regionalEconomicDisparities_Skill_Data,
    regionalSpecialization: regionalSpecialization_Skill_Data,
  },
  description: {
    methodological: "Concentrations of people and firms yield benefits from proximity, infrastructure constraints, and regional specialization.",
    frontend: {
      en: "Discover why cities and regions develop different economic strengths.",
    },
  },
});
