import { defineSkillGroup } from '@svitlo/engine/build';

import { calendarInterval } from './calendarInterval';
import { daySequence } from './daySequence';
import { leapYearDays } from './leapYearDays';
import { weekMonthYear } from './weekMonthYear';

export const calendar = defineSkillGroup({
  slug: 'calendar',
  id: '923b7a49-4547-4043-b5f6-fdb7cce37a41',
  name: {
    ar: 'التقويم',
    be: 'Каляндар',
    bn: 'পঞ্জিকা',
    de: 'Kalender',
    en: 'Calendar',
    es: 'Calendario',
    et: 'Kalender',
    fr: 'Calendrier',
    he: 'לוח שנה',
    hi: 'कैलेंडर',
    id: 'Kalender',
    it: 'Calendario',
    ja: 'カレンダー',
    ka: 'კალენდარი',
    kk: 'Küntızbe',
    ko: '달력',
    lt: 'Kalendorius',
    lv: 'Kalendārs',
    mr: 'दिनदर्शिका',
    ms: 'Kalendar',
    pl: 'Kalendarz',
    pt: 'Calendário',
    qm: 'Taqvim',
    ta: 'நாட்காட்டி',
    te: 'క్యాలెండర్',
    tr: 'Takvim',
    uk: 'Календар',
    ur: 'تقویم',
    vi: 'Lịch',
    zh: '日历',
  },
  skills: {
    calendarInterval,
    daySequence,
    leapYearDays,
    weekMonthYear,
  },
  description: {
    methodological:
      'Navigating days, weeks, months, and years while accounting for varying month lengths and leap years.',
  },
});
