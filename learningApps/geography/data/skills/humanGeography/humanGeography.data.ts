import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { culturalGeography_SkillGroup_Data } from './culturalGeography/culturalGeography.data';
import { economicGeography_SkillGroup_Data } from './economicGeography/economicGeography.data';
import { politicalTerritories_SkillGroup_Data } from './politicalTerritories/politicalTerritories.data';
import { populationAndSettlement_SkillGroup_Data } from './populationAndSettlement/populationAndSettlement.data';

export const humanGeography_SkillDomain_Data = buildSkillDomainConfig({
  slug: "humanGeography",
  id: "4cbaebaf-99ce-425a-886f-46b577b152d3",
  name: {
    en: "Human Geography",
  },
  groups: {
    culturalGeography: culturalGeography_SkillGroup_Data,
    economicGeography: economicGeography_SkillGroup_Data,
    politicalTerritories: politicalTerritories_SkillGroup_Data,
    populationAndSettlement: populationAndSettlement_SkillGroup_Data,
  },
  description: {
    methodological: "Settlement, mobility, culture, political territories, livelihoods and economic connections create spatial patterns across inhabited places. The focus is geographic distribution, diffusion, regional relationships and the effects of place, not national political history or business accounting.",
    frontend: {
      en: "Explore how people, settlements, cultures and economic activities are distributed across places.",
    },
  },
});
