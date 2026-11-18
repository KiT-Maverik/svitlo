import { defineSkillDomain } from '@svitlo/engine/build';

import { calendar } from './calendar';
import { clock } from './clock';
import { duration } from './duration';

export const time = defineSkillDomain({
  slug: 'time',
  id: 'be33de46-a3d9-4535-8eee-cf1c3c304827',
  title: {
    ar: 'الوقت',
    be: 'Час',
    bn: 'সময়',
    de: 'Zeit',
    en: 'Time',
    es: 'Tiempo',
    et: 'Aeg',
    fr: 'Temps',
    he: 'זמן',
    hi: 'समय',
    id: 'Waktu',
    it: 'Tempo',
    ja: '時間',
    ka: 'დრო',
    kk: 'Uaqyt',
    ko: '시간',
    lt: 'Laikas',
    lv: 'Laiks',
    mr: 'वेळ',
    ms: 'Masa',
    pl: 'Czas',
    pt: 'Tempo',
    qm: 'Vaqıt',
    ta: 'நேரம்',
    te: 'సమయం',
    tr: 'Zaman',
    uk: 'Час',
    ur: 'وقت',
    vi: 'Thời gian',
    zh: '时间',
  },
  groups: {
    calendar,
    clock,
    duration,
  },
  description: {
    methodological:
      'Calendar cycles, ways to represent instants, and calculations of event durations, distinguishing a date, a clock reading, and an elapsed interval.',
  },
});
