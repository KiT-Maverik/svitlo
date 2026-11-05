import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const assessHealthRelatedRisk_Skill_Data = buildSkillConfig({
  slug: 'assessHealthRelatedRisk',
  id: '7417324a-bd12-4bb4-b6ff-ab7a1da7bedc',
  name: {
    en: 'Assess health-related risk',
  },
  description: {
    methodological:
      'Evaluate the likelihood and potential consequences of longer-term health outcomes arising from exposures, behaviours or protective measures, accounting for uncertainty without converting population-level estimates into diagnoses.',
    frontend: {
      en: 'Consider the likelihood and possible effects of a health-related risk.',
    },
  },
});
