import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { particleBehavior_SkillGroup_Data } from './particleBehavior/particleBehavior.data';
import { phasesAndTransitions_SkillGroup_Data } from './phasesAndTransitions/phasesAndTransitions.data';

export const particlesAndStates_SkillDomain_Data = buildSkillDomainConfig({
  slug: "particlesAndStates",
  id: "22544804-a376-48e0-b804-b89ae734e265",
  name: {
    en: "Particles and States",
  },
  groups: {
    particleBehavior: particleBehavior_SkillGroup_Data,
    phasesAndTransitions: phasesAndTransitions_SkillGroup_Data,
  },
  description: {
    methodological: "Particle arrangements and motion explain properties of solids, liquids and gases, including transitions between phases. Detailed equations of thermodynamics belong to their own chemical energy competencies.",
    frontend: {
      en: "Explore how the movement and arrangement of particles explain solids, liquids, gases and phase changes.",
    },
  },
});
