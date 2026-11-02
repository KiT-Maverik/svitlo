import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { changesAndConservation_SkillGroup_Data } from './changesAndConservation/changesAndConservation.data';
import { characteristicProperties_SkillGroup_Data } from './characteristicProperties/characteristicProperties.data';
import { composition_SkillGroup_Data } from './composition/composition.data';

export const substancesAndProperties_SkillDomain_Data = buildSkillDomainConfig({
  slug: "substancesAndProperties",
  id: "030e5211-72db-4ad7-94c5-b52fc44c9bf5",
  name: {
    en: "Substances and Properties",
  },
  groups: {
    changesAndConservation: changesAndConservation_SkillGroup_Data,
    characteristicProperties: characteristicProperties_SkillGroup_Data,
    composition: composition_SkillGroup_Data,
  },
  description: {
    methodological: "Chemists classify samples by composition and characterize them through reproducible properties. This domain focuses on observable and bulk descriptions before explaining them through atomic structure or bonding.",
    frontend: {
      en: "Discover how chemists identify substances through their composition, properties and changes.",
    },
  },
});
