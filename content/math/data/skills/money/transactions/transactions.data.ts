import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { calculateChange_Skill_Data, unitPriceTotal_Skill_Data, budgetConstraint_Skill_Data } from './skills';

export const transactions_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'transactions',
  id: '15c170e7-d86b-43d3-b08a-64a642f93f0b',
  name: {
    en: 'Purchases',
    qm: 'Satın aluvlar',
    lt: 'Pirkimai',
    lv: 'Pirkumi',
    et: 'Ostud',
    be: 'Пакупкі',
    ka: 'შესყიდვები',
    kk: 'Сатып алулар',
    zh: '购物',
    hi: 'खरीदारी',
    es: 'Compras',
    ar: 'المشتريات',
    fr: 'Achats',
    bn: 'কেনাকাটা',
    pt: 'Compras',
    ur: 'خریداری',
    id: 'Pembelian',
    de: 'Einkäufe',
    ja: '買い物',
    ko: '구매',
    tr: 'Alışveriş',
    vi: 'Mua sắm',
    ta: 'கொள்முதல்',
    te: 'కొనుగోళ్లు',
    mr: 'खरेदी',
    ms: 'Pembelian',
    he: 'קניות',
    pl: 'Zakupy',
    uk: 'Покупки',
  },
  skills: {
    calculateChange: calculateChange_Skill_Data,
    unitPriceTotal: unitPriceTotal_Skill_Data,
    budgetConstraint: budgetConstraint_Skill_Data,
  },
  description: {
    methodological:
      'Using monetary calculations for unit prices, quantities, purchase totals, change, and limited budgets.',
  },
});
