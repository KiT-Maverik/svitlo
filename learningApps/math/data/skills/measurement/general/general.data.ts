import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  standardUnitPurpose_Skill_Data,
  chooseAppropriateUnit_Skill_Data,
  wordProblemsMeasures_Skill_Data,
} from './skills';

export const general_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'general',
  id: '44154798-a292-4ff4-8f64-5093114af194',
  name: {
    en: 'General measurement skills',
    qm: 'Umumiy ölçüv becerileri',
    lt: 'Bendrieji matavimo įgūdžiai',
    lv: 'Vispārīgās mērīšanas prasmes',
    et: 'Üldised mõõtmisoskused',
    be: 'Агульныя навыкі вымярэньня',
    ka: 'გაზომვის ზოგადი უნარები',
    kk: 'Жалпы өлшеу дағдылары',
    zh: '通用测量技能',
    hi: 'सामान्य मापन कौशल',
    es: 'Habilidades generales de medición',
    ar: 'مهارات القياس العامة',
    fr: 'Compétences générales de mesure',
    bn: 'সাধারণ পরিমাপ দক্ষতা',
    pt: 'Princípios gerais de medição',
    ur: 'پیمائش کی عمومی مہارتیں',
    id: 'Keterampilan pengukuran umum',
    de: 'Allgemeine Messfertigkeiten',
    ja: '測定の基本技能',
    ko: '일반 측정 기능',
    tr: 'Genel ölçme becerileri',
    vi: 'Kỹ năng đo lường chung',
    ta: 'பொதுவான அளவீட்டுத் திறன்கள்',
    te: 'సాధారణ కొలత నైపుణ్యాలు',
    mr: 'सर्वसाधारण मापन कौशल्ये',
    ms: 'Kemahiran pengukuran umum',
    he: 'מיומנויות מדידה כלליות',
    pl: 'Ogólne umiejętności mierzenia',
    uk: 'Загальні вимірювальні навички',
  },
  skills: {
    standardUnitPurpose: standardUnitPurpose_Skill_Data,
    chooseAppropriateUnit: chooseAppropriateUnit_Skill_Data,
    wordProblemsMeasures: wordProblemsMeasures_Skill_Data,
  },
  description: {
    methodological:
      'General principles for choosing units, reconciling measurements, and calculating with comparable quantities.',
  },
});
