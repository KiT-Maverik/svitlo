import { defineSkillDomain } from '@svitlo/engine/build';

import { collection } from './collection';
import { interpretation } from './interpretation';
import { presentation } from './presentation';

export const data = defineSkillDomain({
  slug: 'data',
  id: 'ae6d7bb7-0ee8-4bdd-8853-3d8d11233007',
  title: {
    ar: 'البيانات',
    be: 'Зьвесткі',
    bn: 'উপাত্ত',
    de: 'Daten',
    en: 'Data',
    es: 'Datos',
    et: 'Andmed',
    fr: 'Données',
    he: 'נתונים',
    hi: 'आँकड़े',
    id: 'Data',
    it: 'Dati',
    ja: 'データ',
    ka: 'მონაცემები',
    kk: 'Derekter',
    ko: '자료',
    lt: 'Duomenys',
    lv: 'Dati',
    mr: 'माहिती',
    ms: 'Data',
    pl: 'Dane',
    pt: 'Dados',
    qm: 'Malümatlar',
    ta: 'தரவுகள்',
    te: 'దత్తాంశం',
    tr: 'Veri',
    uk: 'Дані',
    ur: 'اعداد و شمار',
    vi: 'Dữ liệu',
    zh: '数据',
  },
  groups: {
    collection,
    interpretation,
    presentation,
  },
  description: {
    methodological:
      'Formulating questions, collecting and classifying information, representing it in tables and charts, and drawing conclusions supported by the data.',
  },
});
