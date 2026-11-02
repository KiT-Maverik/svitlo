import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishEnergyEmissionFromReflectionOfReceivedLight_Skill_Data, explainHeatingThroughRadiationAbsorption_Skill_Data } from './skills';

export const radiationAndMatter_SkillGroup_Data = buildSkillGroupConfig({
  slug: "radiationAndMatter",
  id: "1ea877ce-e5fb-4273-bf09-bfd1a7e880cd",
  name: {
    en: "Radiation and Matter",
  },
  skills: {
    distinguishEnergyEmissionFromReflectionOfReceivedLight: distinguishEnergyEmissionFromReflectionOfReceivedLight_Skill_Data,
    explainHeatingThroughRadiationAbsorption: explainHeatingThroughRadiationAbsorption_Skill_Data,
  },
  description: {
    methodological: "Materials can emit, reflect, transmit, or absorb energy; the outcomes depend on the type of radiation and the properties of matter.",
    frontend: {
      en: "Explore how materials absorb, emit, reflect or transmit radiation.",
    },
  },
});
