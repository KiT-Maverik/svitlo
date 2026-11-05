import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { recognizeDenominations_Skill_Data, composeAmount_Skill_Data, compareAmounts_Skill_Data } from './skills';

export const denominations_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'denominations',
  id: 'b2a96b3c-533d-4649-98e3-dd1e58566e66',
  name: {
    en: 'Money amounts',
    qm: 'Aqça miqdarları',
    lt: 'Pinigų sumos',
    lv: 'Naudas summas',
    et: 'Rahasummad',
    be: 'Сумы грошай',
    ka: 'ფულადი თანხები',
    kk: 'Ақша сомалары',
    zh: '货币金额',
    hi: 'धनराशियाँ',
    es: 'Cantidades de dinero',
    ar: 'المبالغ النقدية',
    fr: 'Sommes d’argent',
    bn: 'অর্থের পরিমাণ',
    pt: 'Quantias em dinheiro',
    ur: 'رقوم',
    id: 'Jumlah uang',
    de: 'Geldbeträge',
    ja: '金額',
    ko: '금액',
    tr: 'Para tutarları',
    vi: 'Số tiền',
    ta: 'பணத் தொகைகள்',
    te: 'డబ్బు మొత్తాలు',
    mr: 'पैशांच्या रकमा',
    ms: 'Jumlah wang',
    he: 'סכומי כסף',
    pl: 'Kwoty pieniędzy',
    uk: 'Грошові суми',
  },
  skills: {
    recognizeDenominations: recognizeDenominations_Skill_Data,
    composeAmount: composeAmount_Skill_Data,
    compareAmounts: compareAmounts_Skill_Data,
  },
  description: {
    methodological:
      'Monetary value represented by coins and banknotes of a specific currency, equivalent denomination combinations, and comparisons between amounts.',
  },
});
