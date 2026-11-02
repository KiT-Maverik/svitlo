import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { contactForcesAndFriction_SkillGroup_Data } from './contactForcesAndFriction/contactForcesAndFriction.data';
import { equilibriumAndStability_SkillGroup_Data } from './equilibriumAndStability/equilibriumAndStability.data';
import { gravity_SkillGroup_Data } from './gravity/gravity.data';

export const forcesAndInteractions_SkillDomain_Data = buildSkillDomainConfig({
  slug: "forcesAndInteractions",
  id: "1af49c02-4fe8-455a-9e1e-2a83c3b08353",
  name: {
    en: "Forces and Interactions",
  },
  groups: {
    contactForcesAndFriction: contactForcesAndFriction_SkillGroup_Data,
    equilibriumAndStability: equilibriumAndStability_SkillGroup_Data,
    gravity: gravity_SkillGroup_Data,
  },
  description: {
    methodological: "When bodies touch or affect one another at a distance, their motion, shape, or state of equilibrium may change. This Domain covers general concepts of force, contact, gravity, and stability; specifically magnetic and electric phenomena belong to Electromagnetism.",
    frontend: {
      en: "Discover how forces change motion, deform objects and maintain stability.",
    },
  },
});
