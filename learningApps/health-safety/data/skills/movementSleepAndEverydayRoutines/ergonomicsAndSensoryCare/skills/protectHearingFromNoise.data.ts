import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const protectHearingFromNoise_Skill_Data = buildSkillConfig({
  slug: 'protectHearingFromNoise',
  id: 'f1dcfadd-48e1-4acb-872b-3a3432545928',
  name: {
    en: 'Protect hearing from noise',
  },
  description: {
    methodological:
      'Relate loudness and exposure time to hearing risk, including personal listening devices and noisy environments.',
    frontend: {
      en: 'Recognize why volume and listening time both affect hearing safety.',
    },
  },
});
