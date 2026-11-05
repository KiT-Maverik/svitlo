import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { findExtraneousData_Skill_Data, findMissingData_Skill_Data, identifyKnownUnknown_Skill_Data } from './skills';

export const conditions_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'conditions',
  id: 'bd512014-8ad2-4db5-8b53-cd24ee73492b',
  name: {
    en: 'Analyzing problem statements',
    qm: 'Meseleniñ şartını tahlil etüv',
    lt: 'Uždavinių sąlygų analizė',
    lv: 'Uzdevumu nosacījumu analīze',
    et: 'Ülesandetekstide analüüs',
    be: 'Аналіз умоваў задачаў',
    ka: 'ამოცანის პირობის ანალიზი',
    kk: 'Есеп шарттарын талдау',
    zh: '分析题目条件',
    hi: 'प्रश्न की शर्तों का विश्लेषण',
    es: 'Análisis de enunciados',
    ar: 'تحليل معطيات المسألة',
    fr: 'Analyse des énoncés',
    bn: 'সমস্যার শর্ত বিশ্লেষণ',
    pt: 'Análise de enunciados',
    ur: 'مسئلے کی شرائط کا تجزیہ',
    id: 'Analisis soal cerita',
    de: 'Analyse von Aufgabenstellungen',
    ja: '問題文の条件分析',
    ko: '문제 조건 분석',
    tr: 'Problem koşullarını analiz etme',
    vi: 'Phân tích đề bài',
    ta: 'கணக்குக் கேள்வியின் நிபந்தனைகளைப் பகுப்பாய்வு செய்தல்',
    te: 'సమస్యలోని షరతుల విశ్లేషణ',
    mr: 'प्रश्नातील अटींचे विश्लेषण',
    ms: 'Analisis pernyataan soalan',
    he: 'ניתוח נתוני השאלה',
    pl: 'Analiza treści zadania',
    uk: 'Аналіз умови задачі',
  },
  skills: {
    identifyKnownUnknown: identifyKnownUnknown_Skill_Data,
    findExtraneousData: findExtraneousData_Skill_Data,
    findMissingData: findMissingData_Skill_Data,
  },
  description: {
    methodological:
      'Separating the question, known data, and implicit assumptions in a word problem before choosing an arithmetic operation.',
  },
});
