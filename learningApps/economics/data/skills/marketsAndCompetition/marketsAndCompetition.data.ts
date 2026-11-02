import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { competitiveMarketStructures_SkillGroup_Data } from './competitiveMarketStructures/competitiveMarketStructures.data';
import { demand_SkillGroup_Data } from './demand/demand.data';
import { elasticity_SkillGroup_Data } from './elasticity/elasticity.data';
import { marketEquilibrium_SkillGroup_Data } from './marketEquilibrium/marketEquilibrium.data';
import { marketOutcomes_SkillGroup_Data } from './marketOutcomes/marketOutcomes.data';
import { supply_SkillGroup_Data } from './supply/supply.data';

export const marketsAndCompetition_SkillDomain_Data = buildSkillDomainConfig({
  slug: "marketsAndCompetition",
  id: "7f4ab068-ec3e-4cf4-bb8f-0fcfbe8175a2",
  name: {
    en: "Ринки та конкуренція",
  },
  groups: {
    competitiveMarketStructures: competitiveMarketStructures_SkillGroup_Data,
    demand: demand_SkillGroup_Data,
    elasticity: elasticity_SkillGroup_Data,
    marketEquilibrium: marketEquilibrium_SkillGroup_Data,
    marketOutcomes: marketOutcomes_SkillGroup_Data,
    supply: supply_SkillGroup_Data,
  },
  description: {
    methodological: "Market prices and quantities arise from interactions between buyers and sellers under particular rules and competitive structures. This domain explains market mechanisms, not individual selling techniques.",
    frontend: {
      en: "Understand how buyers, sellers, and competition shape markets.",
    },
  },
});
