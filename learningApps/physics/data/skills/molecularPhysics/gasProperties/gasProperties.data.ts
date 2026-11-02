import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { explainGasCompressibility_Skill_Data, explainHowGasPressureDependsOnTemperatureAtConstantVolume_Skill_Data } from './skills';

export const gasProperties_SkillGroup_Data = buildSkillGroupConfig({
  slug: "gasProperties",
  id: "370da89e-fa86-43b4-b7b3-231aa98ac394",
  name: {
    en: "Gas Properties",
  },
  skills: {
    explainGasCompressibility: explainGasCompressibility_Skill_Data,
    explainHowGasPressureDependsOnTemperatureAtConstantVolume: explainHowGasPressureDependsOnTemperatureAtConstantVolume_Skill_Data,
  },
  description: {
    methodological: "The compressibility of gases and the dependence of their pressure on conditions follow from particle motion and the spaces between particles.",
    frontend: {
      en: "Explore the physical properties of gases using the particle model.",
    },
  },
});
