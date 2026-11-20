import { defineSkillGroup } from '@svitlo/engine/build';

import { budgetConstraint } from './budgetConstraint';
import { calculateChange } from './calculateChange';
import { unitPriceTotal } from './unitPriceTotal';

export const transactions = defineSkillGroup({
  slug: 'transactions',
  id: '15c170e7-d86b-43d3-b08a-64a642f93f0b',
  name: {
    ar: 'المشتريات',
    be: 'Пакупкі',
    bn: 'কেনাকাটা',
    de: 'Einkäufe',
    en: 'Purchases',
    es: 'Compras',
    et: 'Ostud',
    fr: 'Achats',
    he: 'קניות',
    hi: 'खरीदारी',
    id: 'Pembelian',
    it: 'Acquisti',
    ja: '買い物',
    ka: 'შესყიდვები',
    kk: 'Satyp alular',
    ko: '구매',
    lt: 'Pirkimai',
    lv: 'Pirkumi',
    mr: 'खरेदी',
    ms: 'Pembelian',
    pl: 'Zakupy',
    pt: 'Compras',
    qm: 'Satın aluvlar',
    ta: 'கொள்முதல்',
    te: 'కొనుగోళ్లు',
    tr: 'Alışveriş',
    uk: 'Покупки',
    ur: 'خریداری',
    vi: 'Mua sắm',
    zh: '购物',
  },
  skills: {
    budgetConstraint,
    calculateChange,
    unitPriceTotal,
  },
  description: {
    methodological:
      'Using monetary calculations for unit prices, quantities, purchase totals, change, and limited budgets.',
  },
});
