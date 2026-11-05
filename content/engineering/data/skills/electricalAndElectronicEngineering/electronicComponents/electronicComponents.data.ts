import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  capacitorApplications_Skill_Data,
  diodeApplications_Skill_Data,
  resistorApplications_Skill_Data,
  transistorSwitching_Skill_Data,
} from './skills';

export const electronicComponents_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'electronicComponents',
  id: '94d2e99f-bf2a-4b89-b5ed-f672c294a305',
  name: {
    en: 'Electronic Components',
  },
  skills: {
    capacitorApplications: capacitorApplications_Skill_Data,
    diodeApplications: diodeApplications_Skill_Data,
    resistorApplications: resistorApplications_Skill_Data,
    transistorSwitching: transistorSwitching_Skill_Data,
  },
  description: {
    methodological:
      'Components can limit, store, steer or switch electrical signals; their appropriate use depends on ratings and surrounding circuit context.',
    frontend: {
      en: 'Learn the functions of common electronic components.',
    },
  },
});
