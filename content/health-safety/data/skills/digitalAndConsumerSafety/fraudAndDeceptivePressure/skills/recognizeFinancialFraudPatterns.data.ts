import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const recognizeFinancialFraudPatterns_Skill_Data = buildSkillConfig({
  slug: 'recognizeFinancialFraudPatterns',
  id: 'b56b1957-8734-4d3d-860c-0dd7db12fe13',
  name: {
    en: 'Recognize financial fraud patterns',
  },
  description: {
    methodological:
      'Identify advance-fee demands, fake prizes, fraudulent marketplaces, and requests to transfer funds outside trusted channels.',
    frontend: {
      en: 'Recognize fake prizes, payment demands and fraudulent sales offers.',
    },
  },
});
