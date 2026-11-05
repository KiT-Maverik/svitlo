import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  adaptAnErgonomicWorkspace_Skill_Data,
  manageVisualStrain_Skill_Data,
  protectHearingFromNoise_Skill_Data,
} from './skills';

export const ergonomicsAndSensoryCare_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'ergonomicsAndSensoryCare',
  id: 'a866822d-a2b0-4de7-b49e-f706daa847ec',
  name: {
    en: 'Ergonomics and Sensory Care',
  },
  skills: {
    adaptAnErgonomicWorkspace: adaptAnErgonomicWorkspace_Skill_Data,
    manageVisualStrain: manageVisualStrain_Skill_Data,
    protectHearingFromNoise: protectHearingFromNoise_Skill_Data,
  },
  description: {
    methodological:
      'Workspaces and devices can be adapted to reduce strain, fatigue, and exposure rather than enforcing a single rigid body position.',
    frontend: {
      en: 'Learn how workspaces and devices can reduce strain on the senses and body.',
    },
  },
});
