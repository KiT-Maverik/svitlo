import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const marineSteering_Skill_Data = buildSkillConfig({
  slug: 'marineSteering',
  id: 'fec87457-84b9-4664-b264-354ff3216bc6',
  name: {
    en: 'Marine steering',
  },
  description: {
    methodological: 'Identify how rudders, steerable drives or differential thrust change course.',
    frontend: {
      en: "Explain how a rudder or another mechanism controls a vessel's heading.",
    },
  },
});
