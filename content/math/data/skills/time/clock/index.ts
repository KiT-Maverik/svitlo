import { defineSkillGroup } from '@svitlo/engine/build';

import { read24HourClock } from './read24HourClock';
import { readFiveMinute } from './readFiveMinute';
import { readHalfQuarter } from './readHalfQuarter';
import { readHour } from './readHour';
import { readMinute } from './readMinute';

export const clock = defineSkillGroup({
  slug: 'clock',
  id: '03f5c155-b4e6-4e8f-8ee4-81141018984d',
  name: {
    ar: 'قراءة الساعة',
    be: 'Чытаньне гадзіньніка',
    bn: 'ঘড়িতে সময় পড়া',
    de: 'Uhrzeit ablesen',
    en: 'Reading clocks',
    es: 'Lectura del reloj',
    et: 'Kella lugemine',
    fr: "Lecture de l'heure",
    he: 'קריאת שעון',
    hi: 'घड़ी से समय पढ़ना',
    id: 'Membaca jam',
    it: "Leggere l'orologio",
    ja: '時計の読み方',
    ka: 'საათის წაკითხვა',
    kk: 'Sağatty oqu',
    ko: '시계 읽기',
    lt: 'Laikrodžio skaitymas',
    lv: 'Pulksteņa lasīšana',
    mr: 'घड्याळ वाचणे',
    ms: 'Membaca jam',
    pl: 'Odczytywanie godziny',
    pt: 'Leitura das horas',
    qm: 'Saatnı oqumaq',
    ta: 'கடிகார நேரத்தை வாசித்தல்',
    te: 'గడియారం చదవడం',
    tr: 'Saat okuma',
    uk: 'Зчитування часу з годинника',
    ur: 'گھڑی سے وقت پڑھنا',
    vi: 'Đọc đồng hồ',
    zh: '钟表读时',
  },
  skills: {
    read24HourClock,
    readFiveMinute,
    readHalfQuarter,
    readHour,
    readMinute,
  },
  description: {
    methodological:
      'Matching clock-hand positions and digital notation to a particular instant of the day at different levels of reading precision.',
  },
});
