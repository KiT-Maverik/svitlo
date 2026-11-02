import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { behavioralFactorsInChoice_SkillGroup_Data } from './behavioralFactorsInChoice/behavioralFactorsInChoice.data';
import { consumerInformationAndRights_SkillGroup_Data } from './consumerInformationAndRights/consumerInformationAndRights.data';
import { needsAndPreferences_SkillGroup_Data } from './needsAndPreferences/needsAndPreferences.data';

export const consumerBehavior_SkillDomain_Data = buildSkillDomainConfig({
  slug: "consumerBehavior",
  id: "d69b6b66-cd9a-44c0-95e1-4cadaa325466",
  name: {
    en: "Поведінка споживачів",
  },
  groups: {
    behavioralFactorsInChoice: behavioralFactorsInChoice_SkillGroup_Data,
    consumerInformationAndRights: consumerInformationAndRights_SkillGroup_Data,
    needsAndPreferences: needsAndPreferences_SkillGroup_Data,
  },
  description: {
    methodological: "Consumers evaluate needs, quality, alternatives, and information under varying incomes and psychological constraints. This domain analyzes their choices rather than sellers' methods of promoting goods.",
    frontend: {
      en: "Explore how people choose what to buy and what information shapes their decisions.",
    },
  },
});
