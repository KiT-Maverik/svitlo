import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  chooseAnAppropriateLevelOfHealthcare_Skill_Data,
  communicateSymptomsToAClinician_Skill_Data,
  participateInInformedHealthcareDecisions_Skill_Data,
  understandACarePlan_Skill_Data,
} from './skills';

export const usingHealthcare_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'usingHealthcare',
  id: '76948621-3b7c-45db-a90c-0b45995524cf',
  name: {
    en: 'Using Healthcare',
  },
  skills: {
    chooseAnAppropriateLevelOfHealthcare: chooseAnAppropriateLevelOfHealthcare_Skill_Data,
    communicateSymptomsToAClinician: communicateSymptomsToAClinician_Skill_Data,
    participateInInformedHealthcareDecisions: participateInInformedHealthcareDecisions_Skill_Data,
    understandACarePlan: understandACarePlan_Skill_Data,
  },
  description: {
    methodological:
      'Seeking care effectively includes choosing an appropriate service, describing a concern, understanding an agreed plan, and knowing when assistance is urgent.',
    frontend: {
      en: 'Discover how to access care and work with healthcare professionals.',
    },
  },
});
