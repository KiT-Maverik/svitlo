import { defineSkillGroup } from '@svitlo/engine/build';

import { convertHoursMinutes } from './convertHoursMinutes';
import { convertMinutesSeconds } from './convertMinutesSeconds';
import { eventDuration } from './eventDuration';
import { findStartOrEnd } from './findStartOrEnd';

export const duration = defineSkillGroup({
  slug: 'duration',
  id: '7bd683f2-1db4-4242-b223-733aa66481f7',
  name: {
    ar: 'المدة الزمنية',
    be: 'Працягласьць',
    bn: 'সময়কাল',
    de: 'Zeitdauer',
    en: 'Duration',
    es: 'Duración',
    et: 'Kestus',
    fr: 'Durée',
    he: 'משך זמן',
    hi: 'समयावधि',
    id: 'Durasi',
    it: 'Durata',
    ja: '時間の長さ',
    ka: 'ხანგრძლივობა',
    kk: 'Ūzaqtyq',
    ko: '시간의 길이',
    lt: 'Trukmė',
    lv: 'Ilgums',
    mr: 'कालावधी',
    ms: 'Tempoh masa',
    pl: 'Czas trwania',
    pt: 'Duração',
    qm: 'Vaqıt devamlılığı',
    ta: 'கால அளவு',
    te: 'వ్యవధి',
    tr: 'Süre',
    uk: 'Тривалість',
    ur: 'دورانیہ',
    vi: 'Khoảng thời gian',
    zh: '持续时间',
  },
  skills: {
    convertHoursMinutes,
    convertMinutesSeconds,
    eventDuration,
    findStartOrEnd,
  },
  description: {
    methodological:
      'Relationships among seconds, minutes, and hours, and deriving a time interval or instant from other known time information.',
  },
});
