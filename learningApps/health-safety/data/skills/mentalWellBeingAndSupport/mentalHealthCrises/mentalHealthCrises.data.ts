import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  providePsychologicalFirstAid_Skill_Data,
  recognizeAnAcutePsychologicalCrisis_Skill_Data,
  respondToSelfHarmOrSuicideRisk_Skill_Data,
} from './skills';

export const mentalHealthCrises_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'mentalHealthCrises',
  id: '6712238b-386d-45eb-aa4d-780747dea487',
  name: {
    en: 'Mental Health Crises',
  },
  skills: {
    providePsychologicalFirstAid: providePsychologicalFirstAid_Skill_Data,
    recognizeAnAcutePsychologicalCrisis: recognizeAnAcutePsychologicalCrisis_Skill_Data,
    respondToSelfHarmOrSuicideRisk: respondToSelfHarmOrSuicideRisk_Skill_Data,
  },
  description: {
    methodological:
      'Immediate safety and connection to competent support take priority over attempting therapy or managing a potentially dangerous situation alone.',
    frontend: {
      en: 'Learn why urgent psychological danger requires competent immediate assistance.',
    },
  },
});
