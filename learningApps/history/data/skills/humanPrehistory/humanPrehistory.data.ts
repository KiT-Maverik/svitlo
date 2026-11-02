import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { growingSocialComplexity_SkillGroup_Data } from './growingSocialComplexity/growingSocialComplexity.data';
import { humanOriginsAndDispersal_SkillGroup_Data } from './humanOriginsAndDispersal/humanOriginsAndDispersal.data';
import { hunterGathererSocieties_SkillGroup_Data } from './hunterGathererSocieties/hunterGathererSocieties.data';
import { transitionToFoodProduction_SkillGroup_Data } from './transitionToFoodProduction/transitionToFoodProduction.data';

export const humanPrehistory_SkillDomain_Data = buildSkillDomainConfig({
  slug: "humanPrehistory",
  id: "76421fa2-5fcb-4a89-abc2-55966aa5f2f7",
  name: {
    en: "Первісна історія людства",
  },
  groups: {
    growingSocialComplexity: growingSocialComplexity_SkillGroup_Data,
    humanOriginsAndDispersal: humanOriginsAndDispersal_SkillGroup_Data,
    hunterGathererSocieties: hunterGathererSocieties_SkillGroup_Data,
    transitionToFoodProduction: transitionToFoodProduction_SkillGroup_Data,
  },
  description: {
    methodological: "The long era before written states encompasses human evolution, global dispersal, varied subsistence, and uneven regional transitions toward settlements and metallurgy.",
    frontend: {
      en: "Explore how early people lived and spread across the world.",
    },
  },
});
