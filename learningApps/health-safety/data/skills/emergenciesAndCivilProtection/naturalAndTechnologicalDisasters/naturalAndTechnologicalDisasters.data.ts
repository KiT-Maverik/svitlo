import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  chemicalIncidentProtection_Skill_Data,
  floodSafety_Skill_Data,
  radiologicalEmergencyProtection_Skill_Data,
  respondSafelyToAnEarthquake_Skill_Data,
} from './skills';

export const naturalAndTechnologicalDisasters_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'naturalAndTechnologicalDisasters',
  id: 'e86c58d5-2069-4c5d-a4de-38c61e262a16',
  name: {
    en: 'Natural and Technological Disasters',
  },
  skills: {
    chemicalIncidentProtection: chemicalIncidentProtection_Skill_Data,
    floodSafety: floodSafety_Skill_Data,
    radiologicalEmergencyProtection: radiologicalEmergencyProtection_Skill_Data,
    respondSafelyToAnEarthquake: respondSafelyToAnEarthquake_Skill_Data,
  },
  description: {
    methodological:
      'Floods, earthquakes, chemical releases, and radiation incidents create different exposure pathways and require different protective behaviour.',
    frontend: {
      en: 'Learn why floods, earthquakes and contamination demand different responses.',
    },
  },
});
