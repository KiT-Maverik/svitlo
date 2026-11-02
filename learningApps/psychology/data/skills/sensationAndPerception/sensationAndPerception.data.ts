import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { bodyAndChemicalSenses_SkillGroup_Data } from './bodyAndChemicalSenses/bodyAndChemicalSenses.data';
import { illusionsAndMultisensoryPerception_SkillGroup_Data } from './illusionsAndMultisensoryPerception/illusionsAndMultisensoryPerception.data';
import { perceptualOrganization_SkillGroup_Data } from './perceptualOrganization/perceptualOrganization.data';
import { sensoryDetection_SkillGroup_Data } from './sensoryDetection/sensoryDetection.data';
import { visualAndAuditoryExperience_SkillGroup_Data } from './visualAndAuditoryExperience/visualAndAuditoryExperience.data';

export const sensationAndPerception_SkillDomain_Data = buildSkillDomainConfig({
  slug: "sensationAndPerception",
  id: "763ba27f-79d7-419a-aa84-bc769903dd3a",
  name: {
    en: "Sensation and Perception",
  },
  groups: {
    bodyAndChemicalSenses: bodyAndChemicalSenses_SkillGroup_Data,
    illusionsAndMultisensoryPerception: illusionsAndMultisensoryPerception_SkillGroup_Data,
    perceptualOrganization: perceptualOrganization_SkillGroup_Data,
    sensoryDetection: sensoryDetection_SkillGroup_Data,
    visualAndAuditoryExperience: visualAndAuditoryExperience_SkillGroup_Data,
  },
  description: {
    methodological: "Sensory information is detected, selected, organized, and interpreted into an experienced world. Psychological perception differs from simple measurement of physical stimuli or anatomy of sense organs.",
    frontend: {
      en: "Discover how sensory signals become experiences of the world around us.",
    },
  },
});
