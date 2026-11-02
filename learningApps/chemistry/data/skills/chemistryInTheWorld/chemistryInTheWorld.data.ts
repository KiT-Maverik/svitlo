import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { airAndWater_SkillGroup_Data } from './airAndWater/airAndWater.data';
import { materialsChemistry_SkillGroup_Data } from './materialsChemistry/materialsChemistry.data';
import { moleculesOfLife_SkillGroup_Data } from './moleculesOfLife/moleculesOfLife.data';
import { sustainableChemicalChoices_SkillGroup_Data } from './sustainableChemicalChoices/sustainableChemicalChoices.data';

export const chemistryInTheWorld_SkillDomain_Data = buildSkillDomainConfig({
  slug: "chemistryInTheWorld",
  id: "fceb8307-d2a3-4c45-b3d5-dd51f4d31bad",
  name: {
    en: "Chemistry in the World",
  },
  groups: {
    airAndWater: airAndWater_SkillGroup_Data,
    materialsChemistry: materialsChemistry_SkillGroup_Data,
    moleculesOfLife: moleculesOfLife_SkillGroup_Data,
    sustainableChemicalChoices: sustainableChemicalChoices_SkillGroup_Data,
  },
  description: {
    methodological: "Chemical concepts support understanding of manufactured materials, environmental systems and molecules associated with life. The emphasis is composition, transformation and evidence—not industrial process engineering, clinical advice or organism-level biology.",
    frontend: {
      en: "Discover how chemistry explains everyday materials, the environment and molecules of life.",
    },
  },
});
