import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishElasticFromInelasticCollisions_Skill_Data = buildSkillConfig({
  slug: "distinguishElasticFromInelasticCollisions",
  id: "2b3f2b52-7d11-45ad-9253-d2e5ceb80b3b",
  name: {
    en: "Distinguish elastic from inelastic collisions",
  },
  description: {
    methodological: "In an elastic collision, the system's kinetic energy is conserved; in an inelastic collision, some becomes internal energy and deformation. Momentum remains conserved in an isolated system.",
    frontend: {
      en: "Compare elastic and inelastic collisions without confusing energy with momentum conservation.",
    },
  },
});
