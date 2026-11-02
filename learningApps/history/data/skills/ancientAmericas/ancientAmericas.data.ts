import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { amazonAndCaribbean_SkillGroup_Data } from './amazonAndCaribbean/amazonAndCaribbean.data';
import { ancientAndes_SkillGroup_Data } from './ancientAndes/ancientAndes.data';
import { earliestAmericanPopulations_SkillGroup_Data } from './earliestAmericanPopulations/earliestAmericanPopulations.data';
import { mesoamerica_SkillGroup_Data } from './mesoamerica/mesoamerica.data';
import { northAmericaBeyondMesoamerica_SkillGroup_Data } from './northAmericaBeyondMesoamerica/northAmericaBeyondMesoamerica.data';

export const ancientAmericas_SkillDomain_Data = buildSkillDomainConfig({
  slug: "ancientAmericas",
  id: "b460f1a4-07a1-463a-8095-03f27708ad9e",
  name: {
    en: "Америки",
  },
  groups: {
    amazonAndCaribbean: amazonAndCaribbean_SkillGroup_Data,
    ancientAndes: ancientAndes_SkillGroup_Data,
    earliestAmericanPopulations: earliestAmericanPopulations_SkillGroup_Data,
    mesoamerica: mesoamerica_SkillGroup_Data,
    northAmericaBeyondMesoamerica: northAmericaBeyondMesoamerica_SkillGroup_Data,
  },
  description: {
    methodological: "American history includes early peopling, independent agriculture, complex cities and states, and diverse societies without major cities.",
    frontend: {
      en: "Explore the variety of ancient societies throughout the Americas.",
    },
  },
});
