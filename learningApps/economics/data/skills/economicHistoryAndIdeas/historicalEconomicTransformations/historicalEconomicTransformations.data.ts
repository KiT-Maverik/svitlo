import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { agrarianEconomies_Skill_Data, globalizationOfEconomicRelations_Skill_Data, industrialization_Skill_Data } from './skills';

export const historicalEconomicTransformations_SkillGroup_Data = buildSkillGroupConfig({
  slug: "historicalEconomicTransformations",
  id: "88b42a7a-2204-4d59-937b-bac54997f385",
  name: {
    en: "Історичні трансформації",
  },
  skills: {
    agrarianEconomies: agrarianEconomies_Skill_Data,
    globalizationOfEconomicRelations: globalizationOfEconomicRelations_Skill_Data,
    industrialization: industrialization_Skill_Data,
  },
  description: {
    methodological: "Technological, commercial, and institutional changes have transformed how goods are produced and distributed.",
    frontend: {
      en: "Discover how production and trade have changed over time.",
    },
  },
});
