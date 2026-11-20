import { defineSkillGroup } from '@svitlo/engine/build';

import { checkReasonableness } from './checkReasonableness';
import { verifyWithSecondMethod } from './verifyWithSecondMethod';

export const verification = defineSkillGroup({
  slug: 'verification',
  id: 'a40b2d58-257b-4517-a48d-8e839b9687bf',
  name: {
    ar: 'التحقق من الحلول',
    be: 'Праверка рашэньняў',
    bn: 'সমাধান যাচাই',
    de: 'Überprüfen von Lösungen',
    en: 'Checking solutions',
    es: 'Comprobación de soluciones',
    et: 'Lahenduste kontrollimine',
    fr: 'Vérification des solutions',
    he: 'בדיקת פתרונות',
    hi: 'उत्तरों की जाँच',
    id: 'Memeriksa penyelesaian',
    it: 'Verifica delle soluzioni',
    ja: '解答の検証',
    ka: 'ამოხსნების შემოწმება',
    kk: 'Şeşımderdı tekseru',
    ko: '풀이 검증',
    lt: 'Sprendimų tikrinimas',
    lv: 'Risinājumu pārbaude',
    mr: 'उत्तरे तपासणे',
    ms: 'Menyemak penyelesaian',
    pl: 'Sprawdzanie rozwiązań',
    pt: 'Verificação de soluções',
    qm: 'Çözümlerini teşkere etüv',
    ta: 'தீர்வுகளைச் சரிபார்த்தல்',
    te: 'పరిష్కారాలను తనిఖీ చేయడం',
    tr: 'Çözümleri kontrol etme',
    uk: 'Перевірка розв’язань',
    ur: 'حل کی جانچ',
    vi: 'Kiểm tra lời giải',
    zh: '检验解答',
  },
  skills: {
    checkReasonableness,
    verifyWithSecondMethod,
  },
  description: {
    methodological:
      'Critically comparing a calculated result with the problem conditions, identifying mistakes, and using independent methods of verification.',
  },
});
