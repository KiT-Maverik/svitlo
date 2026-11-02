import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { diffusionAndMixing_SkillGroup_Data } from './diffusionAndMixing/diffusionAndMixing.data';
import { gasProperties_SkillGroup_Data } from './gasProperties/gasProperties.data';
import { particleModelOfMatter_SkillGroup_Data } from './particleModelOfMatter/particleModelOfMatter.data';

export const molecularPhysics_SkillDomain_Data = buildSkillDomainConfig({
  slug: "molecularPhysics",
  id: "8f16e6e4-0b6b-4b73-a88a-55a2c5fe4fad",
  name: {
    en: "Molecular Physics",
  },
  groups: {
    diffusionAndMixing: diffusionAndMixing_SkillGroup_Data,
    gasProperties: gasProperties_SkillGroup_Data,
    particleModelOfMatter: particleModelOfMatter_SkillGroup_Data,
  },
  description: {
    methodological: "Particle models help explain physical properties and changes in states of matter. Unlike chemistry, this Domain focuses on particle movement, interactions, and arrangement rather than chemical reactions.",
    frontend: {
      en: "Explore how the movement and arrangement of particles explain matter's behavior.",
    },
  },
});
