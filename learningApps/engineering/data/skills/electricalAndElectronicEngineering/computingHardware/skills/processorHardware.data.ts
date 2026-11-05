import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const processorHardware_Skill_Data = buildSkillConfig({
  slug: 'processorHardware',
  id: '79b27f78-1818-4403-baa8-46f233c3f936',
  name: {
    en: 'Processor hardware',
  },
  description: {
    methodological:
      'Identify the functions of processing units, registers and internal interfaces in executing machine operations without confusing hardware architecture with the algorithms it runs.',
    frontend: {
      en: 'Recognize how processor circuitry performs computing operations.',
    },
  },
});
