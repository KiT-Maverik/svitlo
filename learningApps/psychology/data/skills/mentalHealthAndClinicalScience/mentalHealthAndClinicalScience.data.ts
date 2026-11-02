import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { assessmentAndProfessionalSupport_SkillGroup_Data } from './assessmentAndProfessionalSupport/assessmentAndProfessionalSupport.data';
import { interventionEvidenceAndEthics_SkillGroup_Data } from './interventionEvidenceAndEthics/interventionEvidenceAndEthics.data';
import { patternsOfPsychologicalDifficulty_SkillGroup_Data } from './patternsOfPsychologicalDifficulty/patternsOfPsychologicalDifficulty.data';
import { wellbeingAndImpairment_SkillGroup_Data } from './wellbeingAndImpairment/wellbeingAndImpairment.data';

export const mentalHealthAndClinicalScience_SkillDomain_Data = buildSkillDomainConfig({
  slug: "mentalHealthAndClinicalScience",
  id: "e4cacd3a-1021-43ac-a5b2-e0ee8788672a",
  name: {
    en: "Mental Health and Clinical Science",
  },
  groups: {
    assessmentAndProfessionalSupport: assessmentAndProfessionalSupport_SkillGroup_Data,
    interventionEvidenceAndEthics: interventionEvidenceAndEthics_SkillGroup_Data,
    patternsOfPsychologicalDifficulty: patternsOfPsychologicalDifficulty_SkillGroup_Data,
    wellbeingAndImpairment: wellbeingAndImpairment_SkillGroup_Data,
  },
  description: {
    methodological: "Clinical psychology investigates distress, impaired functioning, and evidence-based assessment and intervention. Learning these concepts does not authorize students to diagnose themselves or others, deliver therapy, or replace qualified professional care.",
    frontend: {
      en: "Explore psychological wellbeing, mental-health difficulties and professional care through evidence.",
    },
  },
});
