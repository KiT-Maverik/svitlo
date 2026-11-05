import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { basicLifeSupport_SkillGroup_Data } from './basicLifeSupport/basicLifeSupport.data';
import { bleedingAndInjuries_SkillGroup_Data } from './bleedingAndInjuries/bleedingAndInjuries.data';
import { environmentalAndAcuteInjuries_SkillGroup_Data } from './environmentalAndAcuteInjuries/environmentalAndAcuteInjuries.data';
import { initialAssessmentAndHelp_SkillGroup_Data } from './initialAssessmentAndHelp/initialAssessmentAndHelp.data';
import { medicalEmergencies_SkillGroup_Data } from './medicalEmergencies/medicalEmergencies.data';

export const firstAidAndImmediateResponse_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'firstAidAndImmediateResponse',
  id: 'd5869e78-d660-4634-99a8-a7b05e8ce81b',
  name: {
    en: 'First Aid and Immediate Response',
  },
  groups: {
    basicLifeSupport: basicLifeSupport_SkillGroup_Data,
    bleedingAndInjuries: bleedingAndInjuries_SkillGroup_Data,
    environmentalAndAcuteInjuries: environmentalAndAcuteInjuries_SkillGroup_Data,
    initialAssessmentAndHelp: initialAssessmentAndHelp_SkillGroup_Data,
    medicalEmergencies: medicalEmergencies_SkillGroup_Data,
  },
  description: {
    methodological:
      'Immediate assistance aims to recognize danger, activate professional help, and provide appropriate basic interventions within training and scene safety. Clinical treatment and invasive procedures are not implied by inclusion in the taxonomy.',
    frontend: {
      en: 'Learn to recognize urgent danger, call for help and give appropriate basic assistance.',
    },
  },
});
