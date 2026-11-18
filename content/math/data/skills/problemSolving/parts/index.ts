import { defineSkillGroup } from '@svitlo/engine/build';

import { fractionsContext } from './fractionsContext';
import { partWholeAddsub } from './partWholeAddsub';

export const parts = defineSkillGroup({
  slug: 'parts',
  id: '9e77f69d-5ecb-42df-85b0-e8d19ca27c1b',
  name: {
    ar: 'مسائل الجزء والكل',
    be: 'Задачы на частку і цэлае',
    bn: 'অংশ ও সম্পূর্ণের সমস্যা',
    de: 'Teil-Ganzes-Aufgaben',
    en: 'Part-whole problems',
    es: 'Problemas de partes y todo',
    et: 'Osa ja terviku ülesanded',
    fr: 'Problèmes de parties et de tout',
    he: 'בעיות חלק ושלם',
    hi: 'भाग और पूर्ण की समस्याएँ',
    id: 'Soal bagian dan keseluruhan',
    it: 'Problemi sulle parti e sul tutto',
    ja: '部分と全体の文章題',
    ka: 'ნაწილისა და მთელის ამოცანები',
    kk: 'Bölık pen bütınge arnalğan esepter',
    ko: '부분과 전체 문제',
    lt: 'Dalies ir visumos uždaviniai',
    lv: 'Daļas un veseluma uzdevumi',
    mr: 'भाग व पूर्ण समस्या',
    ms: 'Masalah bahagian dan keseluruhan',
    pl: 'Zadania o części i całości',
    pt: 'Problemas de partes e todo',
    qm: 'Parça ve bütün meseleleri',
    ta: 'பகுதி மற்றும் முழுமைக் கணக்குகள்',
    te: 'భాగం మరియు మొత్తం సమస్యలు',
    tr: 'Parça-bütün problemleri',
    uk: 'Задачі на частини й ціле',
    ur: 'حصے اور کل کے مسائل',
    vi: 'Bài toán phần và toàn thể',
    zh: '整体与部分问题',
  },
  skills: {
    fractionsContext,
    partWholeAddsub,
  },
  description: {
    methodological:
      'Relationships between a whole and its parts in contextual problems, including unit fractional parts.',
  },
});
