import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  electricalGridDistribution_Skill_Data,
  rechargeableBatterySystems_Skill_Data,
  thermalEnergyStorage_Skill_Data,
  transformerUse_Skill_Data,
} from './skills';

export const storageAndDelivery_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'storageAndDelivery',
  id: '0ffe7c1b-b28d-4733-b45f-4f4d2ec9bd6b',
  name: {
    en: 'Storage and Delivery',
  },
  skills: {
    electricalGridDistribution: electricalGridDistribution_Skill_Data,
    rechargeableBatterySystems: rechargeableBatterySystems_Skill_Data,
    thermalEnergyStorage: thermalEnergyStorage_Skill_Data,
    transformerUse: transformerUse_Skill_Data,
  },
  description: {
    methodological: 'Reliable supply requires matching time, location and suitable electrical or thermal interfaces.',
    frontend: {
      en: 'Learn how energy is stored and delivered to users.',
    },
  },
});
