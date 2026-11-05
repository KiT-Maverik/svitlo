import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { checkReasonableness_Skill_Data, verifyWithSecondMethod_Skill_Data } from './skills';

export const verification_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'verification',
  id: 'a40b2d58-257b-4517-a48d-8e839b9687bf',
  name: {
    en: 'Checking solutions',
    qm: 'Çözümlerini teşkere etüv',
    lt: 'Sprendimų tikrinimas',
    lv: 'Risinājumu pārbaude',
    et: 'Lahenduste kontrollimine',
    be: 'Праверка рашэньняў',
    ka: 'ამოხსნების შემოწმება',
    kk: 'Шешімдерді тексеру',
    zh: '检验解答',
    hi: 'उत्तरों की जाँच',
    es: 'Comprobación de soluciones',
    ar: 'التحقق من الحلول',
    fr: 'Vérification des solutions',
    bn: 'সমাধান যাচাই',
    pt: 'Verificação de soluções',
    ur: 'حل کی جانچ',
    id: 'Memeriksa penyelesaian',
    de: 'Überprüfen von Lösungen',
    ja: '解答の検証',
    ko: '풀이 검증',
    tr: 'Çözümleri kontrol etme',
    vi: 'Kiểm tra lời giải',
    ta: 'தீர்வுகளைச் சரிபார்த்தல்',
    te: 'పరిష్కారాలను తనిఖీ చేయడం',
    mr: 'उत्तरे तपासणे',
    ms: 'Menyemak penyelesaian',
    he: 'בדיקת פתרונות',
    pl: 'Sprawdzanie rozwiązań',
    uk: 'Перевірка розв’язань',
  },
  skills: {
    checkReasonableness: checkReasonableness_Skill_Data,
    verifyWithSecondMethod: verifyWithSecondMethod_Skill_Data,
  },
  description: {
    methodological:
      'Critically comparing a calculated result with the problem conditions, identifying mistakes, and using independent methods of verification.',
  },
});
