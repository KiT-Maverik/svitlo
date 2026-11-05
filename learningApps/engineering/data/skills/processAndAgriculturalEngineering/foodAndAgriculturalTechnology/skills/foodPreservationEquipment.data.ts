import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const foodPreservationEquipment_Skill_Data = buildSkillConfig({
  slug: 'foodPreservationEquipment',
  id: 'e3cda56e-c623-4d7e-99f1-ebadfdc4ab0a',
  name: {
    en: 'Food-preservation equipment',
  },
  description: {
    methodological:
      'Identify how refrigeration, dehydration, heating or sealed packaging apparatus supports a specified preservation process.',
    frontend: {
      en: 'Recognize equipment that helps keep food safe and slow spoilage.',
    },
  },
});
