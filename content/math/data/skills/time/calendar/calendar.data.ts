import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  calendarInterval_Skill_Data,
  daySequence_Skill_Data,
  leapYearDays_Skill_Data,
  weekMonthYear_Skill_Data,
} from './skills';

export const calendar_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'calendar',
  id: '923b7a49-4547-4043-b5f6-fdb7cce37a41',
  name: {
    en: 'Calendar',
    qm: 'Taqvim',
    lt: 'Kalendorius',
    lv: 'Kalendārs',
    et: 'Kalender',
    be: 'Каляндар',
    ka: 'კალენდარი',
    kk: 'Күнтізбе',
    zh: '日历',
    hi: 'कैलेंडर',
    es: 'Calendario',
    ar: 'التقويم',
    fr: 'Calendrier',
    bn: 'পঞ্জিকা',
    pt: 'Calendário',
    ur: 'تقویم',
    id: 'Kalender',
    de: 'Kalender',
    ja: 'カレンダー',
    ko: '달력',
    tr: 'Takvim',
    vi: 'Lịch',
    ta: 'நாட்காட்டி',
    te: 'క్యాలెండర్',
    mr: 'दिनदर्शिका',
    ms: 'Kalendar',
    he: 'לוח שנה',
    pl: 'Kalendarz',
    uk: 'Календар',
  },
  skills: {
    daySequence: daySequence_Skill_Data,
    leapYearDays: leapYearDays_Skill_Data,
    weekMonthYear: weekMonthYear_Skill_Data,
    calendarInterval: calendarInterval_Skill_Data,
  },
  description: {
    methodological:
      'Navigating days, weeks, months, and years while accounting for varying month lengths and leap years.',
  },
});
