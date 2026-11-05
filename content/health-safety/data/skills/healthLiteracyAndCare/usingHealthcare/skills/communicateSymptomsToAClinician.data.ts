import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const communicateSymptomsToAClinician_Skill_Data = buildSkillConfig({
  slug: 'communicateSymptomsToAClinician',
  id: 'db7a94e9-b062-415c-b811-a0e51b029242',
  name: {
    en: 'Communicate symptoms to a clinician',
  },
  description: {
    methodological:
      'Convey onset, duration, relevant changes, treatments already taken, and questions without substituting an assumed diagnosis for observations.',
    frontend: {
      en: 'Describe symptoms and their timing clearly to a healthcare professional.',
    },
  },
});
