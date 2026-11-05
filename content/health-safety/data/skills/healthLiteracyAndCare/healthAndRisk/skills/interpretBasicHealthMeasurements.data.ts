import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretBasicHealthMeasurements_Skill_Data = buildSkillConfig({
  slug: 'interpretBasicHealthMeasurements',
  id: '3993a537-75bf-4668-af81-a06bcda36799',
  name: {
    en: 'Interpret basic health measurements',
  },
  description: {
    methodological:
      'Relate observations such as temperature, pulse, or blood pressure to measurement conditions and reference context without making a diagnosis from one reading.',
    frontend: {
      en: 'Interpret basic health readings without treating one result as a diagnosis.',
    },
  },
});
