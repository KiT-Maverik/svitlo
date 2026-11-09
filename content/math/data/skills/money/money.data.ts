import { defineSkillDomain } from '@svitlo/engine';

import { denominations_SkillGroup_Data } from './denominations/denominations.data';
import { transactions_SkillGroup_Data } from './transactions/transactions.data';

export const money_SkillDomain_Data = defineSkillDomain({
  slug: 'money',
  id: 'fc6e1529-7c86-4141-b8b7-9df999eeaea5',
  title: {
    en: 'Money',
    qm: 'Aqça',
    lt: 'Pinigai',
    lv: 'Nauda',
    et: 'Raha',
    be: 'Грошы',
    ka: 'ფული',
    kk: 'Ақша',
    zh: '货币',
    hi: 'धन',
    es: 'Dinero',
    ar: 'النقود',
    fr: 'Argent',
    bn: 'অর্থ',
    pt: 'Dinheiro',
    ur: 'رقم',
    id: 'Uang',
    de: 'Geld',
    ja: 'お金',
    ko: '돈',
    tr: 'Para',
    vi: 'Tiền',
    ta: 'பணம்',
    te: 'డబ్బు',
    mr: 'पैसे',
    ms: 'Wang',
    he: 'כסף',
    pl: 'Pieniądze',
    uk: 'Гроші',
  },
  groups: [denominations_SkillGroup_Data, transactions_SkillGroup_Data],
  description: {
    methodological:
      'Applications of arithmetic to monetary denominations, composing and comparing amounts, calculating costs and change, and selecting purchases within a budget.',
  },
});
