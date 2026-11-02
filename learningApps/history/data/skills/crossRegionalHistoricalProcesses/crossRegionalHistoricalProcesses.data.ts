import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { ancientTradeAndContact_SkillGroup_Data } from './ancientTradeAndContact/ancientTradeAndContact.data';
import { crisesAndHistoricalTransformations_SkillGroup_Data } from './crisesAndHistoricalTransformations/crisesAndHistoricalTransformations.data';
import { everydayLifeInAntiquity_SkillGroup_Data } from './everydayLifeInAntiquity/everydayLifeInAntiquity.data';
import { inventionsAndEngineeringHistory_SkillGroup_Data } from './inventionsAndEngineeringHistory/inventionsAndEngineeringHistory.data';
import { powerAndSocialRelations_SkillGroup_Data } from './powerAndSocialRelations/powerAndSocialRelations.data';
import { productionAndKnowledge_SkillGroup_Data } from './productionAndKnowledge/productionAndKnowledge.data';

export const crossRegionalHistoricalProcesses_SkillDomain_Data = buildSkillDomainConfig({
  slug: "crossRegionalHistoricalProcesses",
  id: "963c15c5-4829-4514-9fea-8e2e5f6083f0",
  name: {
    en: "Спільні процеси",
  },
  groups: {
    ancientTradeAndContact: ancientTradeAndContact_SkillGroup_Data,
    crisesAndHistoricalTransformations: crisesAndHistoricalTransformations_SkillGroup_Data,
    everydayLifeInAntiquity: everydayLifeInAntiquity_SkillGroup_Data,
    inventionsAndEngineeringHistory: inventionsAndEngineeringHistory_SkillGroup_Data,
    powerAndSocialRelations: powerAndSocialRelations_SkillGroup_Data,
    productionAndKnowledge: productionAndKnowledge_SkillGroup_Data,
  },
  description: {
    methodological: "Study shared patterns of interaction among independent regional histories without inventing a single unified ancient civilization.",
    frontend: {
      en: "Explore historical processes that connected different societies.",
    },
  },
});
