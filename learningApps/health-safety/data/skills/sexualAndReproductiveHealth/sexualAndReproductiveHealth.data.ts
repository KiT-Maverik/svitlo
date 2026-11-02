import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { developmentAndBodilyCare_SkillGroup_Data } from './developmentAndBodilyCare/developmentAndBodilyCare.data';
import { sexualAndReproductiveHealthcare_SkillGroup_Data } from './sexualAndReproductiveHealthcare/sexualAndReproductiveHealthcare.data';

export const sexualAndReproductiveHealth_SkillDomain_Data = buildSkillDomainConfig({
  slug: "sexualAndReproductiveHealth",
  id: "a994dfe0-00f2-470e-b070-53b6ef18338e",
  name: {
    en: "Sexual and Reproductive Health",
  },
  groups: {
    developmentAndBodilyCare: developmentAndBodilyCare_SkillGroup_Data,
    sexualAndReproductiveHealthcare: sexualAndReproductiveHealthcare_SkillGroup_Data,
  },
  description: {
    methodological: "Practical knowledge about bodily development, sexual health, prevention, and access to services supports informed and safe choices. Anatomy and reproductive mechanisms are mainly Biology; moral evaluation is not substituted for factual health information.",
    frontend: {
      en: "Learn factual information about development, reproductive health and available care.",
    },
  },
});
