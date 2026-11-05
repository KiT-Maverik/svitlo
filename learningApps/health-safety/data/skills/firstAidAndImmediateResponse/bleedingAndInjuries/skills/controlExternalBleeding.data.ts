import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const controlExternalBleeding_Skill_Data = buildSkillConfig({
  slug: 'controlExternalBleeding',
  id: '41e9caf9-b94f-4bfd-9512-048120508924',
  name: {
    en: 'Control external bleeding',
  },
  description: {
    methodological:
      'Apply appropriate direct pressure and escalation when bleeding is severe, while protecting the responder from body-fluid exposure.',
    frontend: {
      en: 'Use appropriate pressure to control bleeding while protecting yourself.',
    },
  },
});
