import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { distinguishVisibleFromInvisibleElectromagneticRadiation_Skill_Data, explainThePropagationOfElectromagneticWavesWithoutAir_Skill_Data, relateFamiliarTypesOfRadiationToTheElectromagneticSpectrum_Skill_Data } from './skills';

export const electromagneticRadiation_SkillGroup_Data = buildSkillGroupConfig({
  slug: "electromagneticRadiation",
  id: "5f434721-4d8a-4132-8182-5538bab84899",
  name: {
    en: "Electromagnetic Radiation",
  },
  skills: {
    distinguishVisibleFromInvisibleElectromagneticRadiation: distinguishVisibleFromInvisibleElectromagneticRadiation_Skill_Data,
    explainThePropagationOfElectromagneticWavesWithoutAir: explainThePropagationOfElectromagneticWavesWithoutAir_Skill_Data,
    relateFamiliarTypesOfRadiationToTheElectromagneticSpectrum: relateFamiliarTypesOfRadiationToTheElectromagneticSpectrum_Skill_Data,
  },
  description: {
    methodological: "Radio waves, infrared, visible, and ultraviolet radiation are different regions of the electromagnetic spectrum.",
    frontend: {
      en: "Discover visible and invisible parts of the electromagnetic spectrum.",
    },
  },
});
