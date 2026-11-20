import { defineSkillDomain } from '@svitlo/engine/build';

import { denominations } from './denominations';
import { transactions } from './transactions';

export const money = defineSkillDomain({
  slug: 'money',
  id: 'fc6e1529-7c86-4141-b8b7-9df999eeaea5',
  title: {
    ar: 'النقود',
    be: 'Грошы',
    bn: 'অর্থ',
    de: 'Geld',
    en: 'Money',
    es: 'Dinero',
    et: 'Raha',
    fr: 'Argent',
    he: 'כסף',
    hi: 'धन',
    id: 'Uang',
    it: 'Denaro',
    ja: 'お金',
    ka: 'ფული',
    kk: 'Aqşa',
    ko: '돈',
    lt: 'Pinigai',
    lv: 'Nauda',
    mr: 'पैसे',
    ms: 'Wang',
    pl: 'Pieniądze',
    pt: 'Dinheiro',
    qm: 'Aqça',
    ta: 'பணம்',
    te: 'డబ్బు',
    tr: 'Para',
    uk: 'Гроші',
    ur: 'رقم',
    vi: 'Tiền',
    zh: '货币',
  },
  groups: {
    denominations,
    transactions,
  },
  description: {
    methodological:
      'Applications of arithmetic to monetary denominations, composing and comparing amounts, calculating costs and change, and selecting purchases within a budget.',
  },
});
