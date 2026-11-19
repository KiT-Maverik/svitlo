import { defineSkillGroup } from '@svitlo/engine/build';

import { findExtraneousData } from './findExtraneousData';
import { findMissingData } from './findMissingData';
import { identifyKnownUnknown } from './identifyKnownUnknown';

export const conditions = defineSkillGroup({
  slug: 'conditions',
  id: 'bd512014-8ad2-4db5-8b53-cd24ee73492b',
  name: {
    ar: 'تحليل معطيات المسألة',
    be: 'Аналіз умоваў задачаў',
    bn: 'সমস্যার শর্ত বিশ্লেষণ',
    de: 'Analyse von Aufgabenstellungen',
    en: 'Analyzing problem statements',
    es: 'Análisis de enunciados',
    et: 'Ülesandetekstide analüüs',
    fr: 'Analyse des énoncés',
    he: 'ניתוח נתוני השאלה',
    hi: 'प्रश्न की शर्तों का विश्लेषण',
    id: 'Analisis soal cerita',
    it: 'Analizzare i testi dei problemi',
    ja: '問題文の条件分析',
    ka: 'ამოცანის პირობის ანალიზი',
    kk: 'Esep şarttaryn taldau',
    ko: '문제 조건 분석',
    lt: 'Uždavinių sąlygų analizė',
    lv: 'Uzdevumu nosacījumu analīze',
    mr: 'प्रश्नातील अटींचे विश्लेषण',
    ms: 'Analisis pernyataan soalan',
    pl: 'Analiza treści zadania',
    pt: 'Análise de enunciados',
    qm: 'Meseleniñ şartını tahlil etüv',
    ta: 'கணக்குக் கேள்வியின் நிபந்தனைகளைப் பகுப்பாய்வு செய்தல்',
    te: 'సమస్యలోని షరతుల విశ్లేషణ',
    tr: 'Problem koşullarını analiz etme',
    uk: 'Аналіз умови задачі',
    ur: 'مسئلے کی شرائط کا تجزیہ',
    vi: 'Phân tích đề bài',
    zh: '分析题目条件',
  },
  skills: {
    findExtraneousData,
    findMissingData,
    identifyKnownUnknown,
  },
  description: {
    methodological:
      'Separating the question, known data, and implicit assumptions in a word problem before choosing an arithmetic operation.',
  },
});
