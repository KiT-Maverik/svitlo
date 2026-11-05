import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const fitsAndClearances_Skill_Data = buildSkillConfig({
  slug: 'fitsAndClearances',
  id: '323fbd57-3ebc-41ec-b0e3-d36a9020b742',
  name: {
    en: 'Fits and clearances',
  },
  description: {
    methodological:
      "Relate permissible gaps and interference between mating parts to sliding, rotation, retention or sealing. This is distinct from decoding a production drawing's dimensional specification.",
    frontend: {
      en: 'Understand how clearances and fits affect moving or sealing parts.',
    },
  },
});
