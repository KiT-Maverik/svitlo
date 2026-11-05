import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const machiningProcesses_Skill_Data = buildSkillConfig({
  slug: 'machiningProcesses',
  id: '9d2e8e0b-b7a4-4139-b8f0-c9989d45a3e8',
  name: {
    en: 'Machining processes',
  },
  description: {
    methodological:
      'Describe controlled material removal by tools, such as drilling, milling or turning, and the consequences for accuracy, tool access and waste.',
    frontend: {
      en: 'Recognize when material is cut away to make a component.',
    },
  },
});
