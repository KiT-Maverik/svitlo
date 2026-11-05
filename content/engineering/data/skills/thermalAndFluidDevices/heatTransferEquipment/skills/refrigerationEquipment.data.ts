import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const refrigerationEquipment_Skill_Data = buildSkillConfig({
  slug: 'refrigerationEquipment',
  id: 'f8e7fae3-243b-446e-950f-559d9c23008e',
  name: {
    en: 'Refrigeration equipment',
  },
  description: {
    methodological: 'Trace compressor, condenser, expansion device and evaporator in a cooling cycle.',
    frontend: {
      en: 'Trace the main stages of a refrigeration cycle.',
    },
  },
});
