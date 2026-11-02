import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { compareParticleArrangementsInSolidsLiquidsAndGases_Skill_Data, explainGasPressureThroughParticleMotion_Skill_Data, explainRandomThermalMotionOfParticles_Skill_Data, explainTheParticulateStructureOfMatter_Skill_Data, explainThePropertiesOfStatesOfMatterThroughParticleMotion_Skill_Data, explainThermalExpansionThroughParticleMotionAndInteractions_Skill_Data, relateParticleMotionToTemperatureChanges_Skill_Data } from './skills';

export const particleModelOfMatter_SkillGroup_Data = buildSkillGroupConfig({
  slug: "particleModelOfMatter",
  id: "970007f0-cb32-4b4e-9839-bec8e25c2446",
  name: {
    en: "Particle Model of Matter",
  },
  skills: {
    compareParticleArrangementsInSolidsLiquidsAndGases: compareParticleArrangementsInSolidsLiquidsAndGases_Skill_Data,
    explainGasPressureThroughParticleMotion: explainGasPressureThroughParticleMotion_Skill_Data,
    explainRandomThermalMotionOfParticles: explainRandomThermalMotionOfParticles_Skill_Data,
    explainTheParticulateStructureOfMatter: explainTheParticulateStructureOfMatter_Skill_Data,
    explainThePropertiesOfStatesOfMatterThroughParticleMotion: explainThePropertiesOfStatesOfMatterThroughParticleMotion_Skill_Data,
    explainThermalExpansionThroughParticleMotionAndInteractions: explainThermalExpansionThroughParticleMotionAndInteractions_Skill_Data,
    relateParticleMotionToTemperatureChanges: relateParticleMotionToTemperatureChanges_Skill_Data,
  },
  description: {
    methodological: "Substances consist of particles with spaces and interactions between them; the model explains properties without requiring complex formulas.",
    frontend: {
      en: "Learn how invisible particles interact to make up physical substances.",
    },
  },
});
