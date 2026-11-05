import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  recognizeInfectionTransmissionRoutes_Skill_Data,
  respiratoryHygiene_Skill_Data,
  respondToSignsOfInfectiousIllness_Skill_Data,
  safeContactWithBloodAndBodyFluids_Skill_Data,
  vaccinationLiteracy_Skill_Data,
} from './skills';

export const transmissionAndProtection_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'transmissionAndProtection',
  id: 'aa64b2a4-45ef-48d9-ab71-9344160fc668',
  name: {
    en: 'Transmission and Protection',
  },
  skills: {
    recognizeInfectionTransmissionRoutes: recognizeInfectionTransmissionRoutes_Skill_Data,
    respiratoryHygiene: respiratoryHygiene_Skill_Data,
    respondToSignsOfInfectiousIllness: respondToSignsOfInfectiousIllness_Skill_Data,
    safeContactWithBloodAndBodyFluids: safeContactWithBloodAndBodyFluids_Skill_Data,
    vaccinationLiteracy: vaccinationLiteracy_Skill_Data,
  },
  description: {
    methodological:
      'Infectious hazards can spread through different routes and require measures suited to the agent and environment, not one universal precaution.',
    frontend: {
      en: 'Discover how infections spread and which precautions fit each route.',
    },
  },
});
