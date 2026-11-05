import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const traceMaterialBalances_Skill_Data = buildSkillConfig({
  slug: 'traceMaterialBalances',
  id: '02540402-28e2-4d25-92c1-47863215e213',
  name: {
    en: 'Trace material balances',
  },
  description: {
    methodological:
      'Relate input, accumulation, product and waste flows across a specified process boundary without confusing mass conservation with constant volume.',
    frontend: {
      en: 'Track material entering, leaving and accumulating in a processing system.',
    },
  },
});
