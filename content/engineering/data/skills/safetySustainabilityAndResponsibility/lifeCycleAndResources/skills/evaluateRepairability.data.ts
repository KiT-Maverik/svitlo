import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const evaluateRepairability_Skill_Data = buildSkillConfig({
  slug: 'evaluateRepairability',
  id: 'd7c89c97-1b64-45dd-8740-403afc24d989',
  name: {
    en: 'Evaluate repairability',
  },
  description: {
    methodological: 'Recognize the importance of accessible parts, reversible fasteners and replacement options.',
    frontend: {
      en: 'Evaluate how easily a product can be serviced or repaired.',
    },
  },
});
