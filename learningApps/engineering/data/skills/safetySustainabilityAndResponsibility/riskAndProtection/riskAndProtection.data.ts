import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  evaluateTechnicalRisk_Skill_Data,
  hazardControlMeasures_Skill_Data,
  identifyEngineeringHazards_Skill_Data,
  safetyMargins_Skill_Data,
} from './skills';

export const riskAndProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'riskAndProtection',
  id: '085df317-a86e-44ed-80a2-acee13e1397c',
  name: {
    en: 'Risk and Protection',
  },
  skills: {
    evaluateTechnicalRisk: evaluateTechnicalRisk_Skill_Data,
    hazardControlMeasures: hazardControlMeasures_Skill_Data,
    identifyEngineeringHazards: identifyEngineeringHazards_Skill_Data,
    safetyMargins: safetyMargins_Skill_Data,
  },
  description: {
    methodological:
      'Hazard control should be integrated into the physical design and take precedence over simple warnings.',
    frontend: {
      en: 'Learn to identify engineering hazards and reduce risks.',
    },
  },
});
