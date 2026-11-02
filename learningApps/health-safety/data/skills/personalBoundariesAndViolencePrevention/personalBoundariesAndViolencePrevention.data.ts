import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { bodilyAutonomyAndConsent_SkillGroup_Data } from './bodilyAutonomyAndConsent/bodilyAutonomyAndConsent.data';
import { pressureAndManipulation_SkillGroup_Data } from './pressureAndManipulation/pressureAndManipulation.data';
import { violenceAndProtection_SkillGroup_Data } from './violenceAndProtection/violenceAndProtection.data';

export const personalBoundariesAndViolencePrevention_SkillDomain_Data = buildSkillDomainConfig({
  slug: "personalBoundariesAndViolencePrevention",
  id: "364e9534-ac9f-4540-85d0-86233b09cd2d",
  name: {
    en: "Personal Boundaries and Violence Prevention",
  },
  groups: {
    bodilyAutonomyAndConsent: bodilyAutonomyAndConsent_SkillGroup_Data,
    pressureAndManipulation: pressureAndManipulation_SkillGroup_Data,
    violenceAndProtection: violenceAndProtection_SkillGroup_Data,
  },
  description: {
    methodological: "Safety in relationships requires bodily autonomy, recognition of coercion, and effective routes to protection. Mechanisms of social influence are studied in Psychology; here the emphasis is on avoiding harm and obtaining help.",
    frontend: {
      en: "Recognize coercion and violence and find ways to protect personal safety and boundaries.",
    },
  },
});
