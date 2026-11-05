import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const estimateEnergyDemand_Skill_Data = buildSkillConfig({
  slug: 'estimateEnergyDemand',
  id: '33dc12c6-17b5-42cb-b831-836151d582d0',
  name: {
    en: 'Estimate energy demand',
  },
  description: {
    methodological: 'Combine device power and operating duration to assess required supply or storage.',
    frontend: {
      en: 'Estimate how much energy a device or system needs to operate.',
    },
  },
});
