import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { diffusion_Skill_Data, gasPressure_Skill_Data, gasPressureTemperatureRelationship_Skill_Data, gasPressureVolumeRelationship_Skill_Data, gasVolumeAmountRelationship_Skill_Data, gasVolumeTemperatureRelationship_Skill_Data, idealGasModel_Skill_Data, particleMotion_Skill_Data, particleNatureOfMatter_Skill_Data } from './skills';

export const particleBehavior_SkillGroup_Data = buildSkillGroupConfig({
  slug: "particleBehavior",
  id: "0315ca26-35d1-45e8-8efd-bd940b5e71d6",
  name: {
    en: "Particle Behavior",
  },
  skills: {
    diffusion: diffusion_Skill_Data,
    gasPressure: gasPressure_Skill_Data,
    gasPressureTemperatureRelationship: gasPressureTemperatureRelationship_Skill_Data,
    gasPressureVolumeRelationship: gasPressureVolumeRelationship_Skill_Data,
    gasVolumeAmountRelationship: gasVolumeAmountRelationship_Skill_Data,
    gasVolumeTemperatureRelationship: gasVolumeTemperatureRelationship_Skill_Data,
    idealGasModel: idealGasModel_Skill_Data,
    particleMotion: particleMotion_Skill_Data,
    particleNatureOfMatter: particleNatureOfMatter_Skill_Data,
  },
  description: {
    methodological: "Models of matter distinguish constituent particles, the spaces between them and their collective motion.",
    frontend: {
      en: "Discover how tiny particles move, interact and make up the materials around us.",
    },
  },
});
