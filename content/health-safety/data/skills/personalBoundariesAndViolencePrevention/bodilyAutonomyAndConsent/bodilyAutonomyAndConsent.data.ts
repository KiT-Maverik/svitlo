import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  communicateRefusalAndLimits_Skill_Data,
  recognizePersonalBoundaries_Skill_Data,
  recognizeValidConsent_Skill_Data,
} from './skills';

export const bodilyAutonomyAndConsent_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'bodilyAutonomyAndConsent',
  id: '4fc1be80-606f-4c0b-8e7f-17f01a6c8d52',
  name: {
    en: 'Bodily Autonomy and Consent',
  },
  skills: {
    communicateRefusalAndLimits: communicateRefusalAndLimits_Skill_Data,
    recognizePersonalBoundaries: recognizePersonalBoundaries_Skill_Data,
    recognizeValidConsent: recognizeValidConsent_Skill_Data,
  },
  description: {
    methodological:
      'Personal space, privacy, and permission govern respectful contact; consent must not be inferred from silence, fear, or power imbalance.',
    frontend: {
      en: 'Understand permission, privacy and the right to choose what happens to your body.',
    },
  },
});
