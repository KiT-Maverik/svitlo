import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const processContainment_Skill_Data = buildSkillConfig({
  slug: 'processContainment',
  id: 'ee2818b5-7673-4944-9dc8-7a0ba5ea6df1',
  name: {
    en: 'Process containment',
  },
  description: {
    methodological:
      'Relate sealed vessels, piping, ventilation and pressure controls to keeping working materials within suitable operating boundaries.',
    frontend: {
      en: 'Explain why containers and seals must prevent uncontrolled releases.',
    },
  },
});
