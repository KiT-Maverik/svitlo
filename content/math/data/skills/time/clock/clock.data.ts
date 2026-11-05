import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  read24HourClock_Skill_Data,
  readFiveMinute_Skill_Data,
  readHalfQuarter_Skill_Data,
  readHour_Skill_Data,
  readMinute_Skill_Data,
} from './skills';

export const clock_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'clock',
  id: '03f5c155-b4e6-4e8f-8ee4-81141018984d',
  name: {
    en: 'Reading clocks',
    qm: 'Saatnı oqumaq',
    lt: 'Laikrodžio skaitymas',
    lv: 'Pulksteņa lasīšana',
    et: 'Kella lugemine',
    be: 'Чытаньне гадзіньніка',
    ka: 'საათის წაკითხვა',
    kk: 'Сағатты оқу',
    zh: '钟表读时',
    hi: 'घड़ी से समय पढ़ना',
    es: 'Lectura del reloj',
    ar: 'قراءة الساعة',
    fr: "Lecture de l'heure",
    bn: 'ঘড়িতে সময় পড়া',
    pt: 'Leitura das horas',
    ur: 'گھڑی سے وقت پڑھنا',
    id: 'Membaca jam',
    de: 'Uhrzeit ablesen',
    ja: '時計の読み方',
    ko: '시계 읽기',
    tr: 'Saat okuma',
    vi: 'Đọc đồng hồ',
    ta: 'கடிகார நேரத்தை வாசித்தல்',
    te: 'గడియారం చదవడం',
    mr: 'घड्याळ वाचणे',
    ms: 'Membaca jam',
    he: 'קריאת שעון',
    pl: 'Odczytywanie godziny',
    uk: 'Зчитування часу з годинника',
  },
  skills: {
    read24HourClock: read24HourClock_Skill_Data,
    readHour: readHour_Skill_Data,
    readHalfQuarter: readHalfQuarter_Skill_Data,
    readFiveMinute: readFiveMinute_Skill_Data,
    readMinute: readMinute_Skill_Data,
  },
  description: {
    methodological:
      'Matching clock-hand positions and digital notation to a particular instant of the day at different levels of reading precision.',
  },
});
