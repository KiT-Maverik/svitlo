import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { ergonomicsAndSensoryCare_SkillGroup_Data } from './ergonomicsAndSensoryCare/ergonomicsAndSensoryCare.data';
import { physicalActivity_SkillGroup_Data } from './physicalActivity/physicalActivity.data';
import { sleepAndRecovery_SkillGroup_Data } from './sleepAndRecovery/sleepAndRecovery.data';

export const movementSleepAndEverydayRoutines_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'movementSleepAndEverydayRoutines',
  id: 'ec59c28f-6362-471e-8ce0-e510b83f94ac',
  name: {
    en: 'Movement, Sleep and Everyday Routines',
  },
  groups: {
    ergonomicsAndSensoryCare: ergonomicsAndSensoryCare_SkillGroup_Data,
    physicalActivity: physicalActivity_SkillGroup_Data,
    sleepAndRecovery: sleepAndRecovery_SkillGroup_Data,
  },
  description: {
    methodological:
      'Physical functioning benefits from feasible movement, adequate recovery, and adjustments to daily environments. This domain concerns practical health habits, not the physiology of exercise as a separate science.',
    frontend: {
      en: 'Explore sustainable habits for movement, recovery and comfortable daily activities.',
    },
  },
});
