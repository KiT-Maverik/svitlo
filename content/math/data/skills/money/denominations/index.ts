import { defineSkillGroup } from '@svitlo/engine/build';

import { compareAmounts } from './compareAmounts';
import { composeAmount } from './composeAmount';
import { recognizeDenominations } from './recognizeDenominations';

export const denominations = defineSkillGroup({
  slug: 'denominations',
  id: 'b2a96b3c-533d-4649-98e3-dd1e58566e66',
  name: {
    ar: 'المبالغ النقدية',
    be: 'Сумы грошай',
    bn: 'অর্থের পরিমাণ',
    de: 'Geldbeträge',
    en: 'Money amounts',
    es: 'Cantidades de dinero',
    et: 'Rahasummad',
    fr: 'Sommes d’argent',
    he: 'סכומי כסף',
    hi: 'धनराशियाँ',
    id: 'Jumlah uang',
    it: 'Importi di denaro',
    ja: '金額',
    ka: 'ფულადი თანხები',
    kk: 'Aqşa somalary',
    ko: '금액',
    lt: 'Pinigų sumos',
    lv: 'Naudas summas',
    mr: 'पैशांच्या रकमा',
    ms: 'Jumlah wang',
    pl: 'Kwoty pieniędzy',
    pt: 'Quantias em dinheiro',
    qm: 'Aqça miqdarları',
    ta: 'பணத் தொகைகள்',
    te: 'డబ్బు మొత్తాలు',
    tr: 'Para tutarları',
    uk: 'Грошові суми',
    ur: 'رقوم',
    vi: 'Số tiền',
    zh: '货币金额',
  },
  skills: {
    compareAmounts,
    composeAmount,
    recognizeDenominations,
  },
  description: {
    methodological:
      'Monetary value represented by coins and banknotes of a specific currency, equivalent denomination combinations, and comparisons between amounts.',
  },
});
