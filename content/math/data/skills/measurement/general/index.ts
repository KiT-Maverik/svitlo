import { defineSkillGroup } from '@svitlo/engine/build';

import { chooseAppropriateUnit } from './chooseAppropriateUnit';
import { standardUnitPurpose } from './standardUnitPurpose';
import { wordProblemsMeasures } from './wordProblemsMeasures';

export const general = defineSkillGroup({
  slug: 'general',
  id: '44154798-a292-4ff4-8f64-5093114af194',
  name: {
    ar: 'مهارات القياس العامة',
    be: 'Агульныя навыкі вымярэньня',
    bn: 'সাধারণ পরিমাপ দক্ষতা',
    de: 'Allgemeine Messfertigkeiten',
    en: 'General measurement skills',
    es: 'Habilidades generales de medición',
    et: 'Üldised mõõtmisoskused',
    fr: 'Compétences générales de mesure',
    he: 'מיומנויות מדידה כלליות',
    hi: 'सामान्य मापन कौशल',
    id: 'Keterampilan pengukuran umum',
    it: 'Competenze generali di misurazione',
    ja: '測定の基本技能',
    ka: 'გაზომვის ზოგადი უნარები',
    kk: 'Jalpy ölşeu dağdylary',
    ko: '일반 측정 기능',
    lt: 'Bendrieji matavimo įgūdžiai',
    lv: 'Vispārīgās mērīšanas prasmes',
    mr: 'सर्वसाधारण मापन कौशल्ये',
    ms: 'Kemahiran pengukuran umum',
    pl: 'Ogólne umiejętności mierzenia',
    pt: 'Princípios gerais de medição',
    qm: 'Umumiy ölçüv becerileri',
    ta: 'பொதுவான அளவீட்டுத் திறன்கள்',
    te: 'సాధారణ కొలత నైపుణ్యాలు',
    tr: 'Genel ölçme becerileri',
    uk: 'Загальні вимірювальні навички',
    ur: 'پیمائش کی عمومی مہارتیں',
    vi: 'Kỹ năng đo lường chung',
    zh: '通用测量技能',
  },
  skills: {
    chooseAppropriateUnit,
    standardUnitPurpose,
    wordProblemsMeasures,
  },
  description: {
    methodological:
      'General principles for choosing units, reconciling measurements, and calculating with comparable quantities.',
  },
});
