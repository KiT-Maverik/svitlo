import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { collection_SkillGroup_Data } from './collection/collection.data';
import { presentation_SkillGroup_Data } from './presentation/presentation.data';
import { interpretation_SkillGroup_Data } from './interpretation/interpretation.data';

export const data_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'data',
  id: 'ae6d7bb7-0ee8-4bdd-8853-3d8d11233007',
  name: {
    en: 'Data',
    qm: 'Malümatlar',
    lt: 'Duomenys',
    lv: 'Dati',
    et: 'Andmed',
    be: 'Зьвесткі',
    ka: 'მონაცემები',
    kk: 'Деректер',
    zh: '数据',
    hi: 'आँकड़े',
    es: 'Datos',
    ar: 'البيانات',
    fr: 'Données',
    bn: 'উপাত্ত',
    pt: 'Dados',
    ur: 'اعداد و شمار',
    id: 'Data',
    de: 'Daten',
    ja: 'データ',
    ko: '자료',
    tr: 'Veri',
    vi: 'Dữ liệu',
    ta: 'தரவுகள்',
    te: 'దత్తాంశం',
    mr: 'माहिती',
    ms: 'Data',
    he: 'נתונים',
    pl: 'Dane',
    uk: 'Дані',
  },
  groups: {
    collection: collection_SkillGroup_Data,
    presentation: presentation_SkillGroup_Data,
    interpretation: interpretation_SkillGroup_Data,
  },
  description: {
    methodological:
      'Formulating questions, collecting and classifying information, representing it in tables and charts, and drawing conclusions supported by the data.',
  },
});
