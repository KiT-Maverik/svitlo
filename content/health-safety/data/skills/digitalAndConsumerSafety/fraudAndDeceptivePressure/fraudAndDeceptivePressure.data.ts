import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  recognizeFinancialFraudPatterns_Skill_Data,
  recognizePhishingAndImpersonation_Skill_Data,
  resistManipulativeOffers_Skill_Data,
  respondAfterSuspectedFraud_Skill_Data,
} from './skills';

export const fraudAndDeceptivePressure_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'fraudAndDeceptivePressure',
  id: '8f786718-1e57-4e78-a818-c938201f90c3',
  name: {
    en: 'Fraud and Deceptive Pressure',
  },
  skills: {
    recognizeFinancialFraudPatterns: recognizeFinancialFraudPatterns_Skill_Data,
    recognizePhishingAndImpersonation: recognizePhishingAndImpersonation_Skill_Data,
    resistManipulativeOffers: resistManipulativeOffers_Skill_Data,
    respondAfterSuspectedFraud: respondAfterSuspectedFraud_Skill_Data,
  },
  description: {
    methodological:
      'Scams often combine impersonation, urgency, emotional leverage, and requests for information or money; persuasive framing is not proof of legitimacy.',
    frontend: {
      en: 'Learn to recognize scams based on impersonation, urgency and financial pressure.',
    },
  },
});
