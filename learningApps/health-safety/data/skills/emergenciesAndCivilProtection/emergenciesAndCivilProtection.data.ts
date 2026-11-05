import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conflictRelatedDangers_SkillGroup_Data } from './conflictRelatedDangers/conflictRelatedDangers.data';
import { evacuationAndShelter_SkillGroup_Data } from './evacuationAndShelter/evacuationAndShelter.data';
import { naturalAndTechnologicalDisasters_SkillGroup_Data } from './naturalAndTechnologicalDisasters/naturalAndTechnologicalDisasters.data';
import { preparednessAndAlerts_SkillGroup_Data } from './preparednessAndAlerts/preparednessAndAlerts.data';

export const emergenciesAndCivilProtection_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'emergenciesAndCivilProtection',
  id: '58c4ecae-a7da-4fe2-ba16-fe63cf9df259',
  name: {
    en: 'Emergencies and Civil Protection',
  },
  groups: {
    conflictRelatedDangers: conflictRelatedDangers_SkillGroup_Data,
    evacuationAndShelter: evacuationAndShelter_SkillGroup_Data,
    naturalAndTechnologicalDisasters: naturalAndTechnologicalDisasters_SkillGroup_Data,
    preparednessAndAlerts: preparednessAndAlerts_SkillGroup_Data,
  },
  description: {
    methodological:
      'Collective hazards can overwhelm normal routines and require verified alerts, protective shelter, evacuation, and coordination with responders. Local regulations and emergency numbers belong to contextual lessons, not permanent country-specific Skill identities.',
    frontend: {
      en: 'Learn to prepare for emergencies, follow reliable warnings and protect others safely.',
    },
  },
});
