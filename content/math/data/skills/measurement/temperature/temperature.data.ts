import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { readTemperature_Skill_Data } from './skills';

export const temperature_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'temperature',
  id: '3bf02823-2dbf-49cd-af93-2df758f4208a',
  name: {
    en: 'Temperature',
    qm: 'Sıcaqlıq',
    lt: 'Temperatūra',
    lv: 'Temperatūra',
    et: 'Temperatuur',
    be: 'Тэмпэратура',
    ka: 'ტემპერატურა',
    kk: 'Температура',
    zh: '温度',
    hi: 'तापमान',
    es: 'Temperatura',
    ar: 'درجة الحرارة',
    fr: 'Température',
    bn: 'তাপমাত্রা',
    pt: 'Temperatura',
    ur: 'درجہ حرارت',
    id: 'Suhu',
    de: 'Temperatur',
    ja: '温度',
    ko: '온도',
    tr: 'Sıcaklık',
    vi: 'Nhiệt độ',
    ta: 'வெப்பநிலை',
    te: 'ఉష్ణోగ్రత',
    mr: 'तापमान',
    ms: 'Suhu',
    he: 'טמפרטורה',
    pl: 'Temperatura',
    uk: 'Температура',
  },
  skills: {
    readTemperature: readTemperature_Skill_Data,
  },
  description: {
    methodological:
      'Temperature as a physical quantity, its reading from a thermometer scale, interpretation of scale divisions, and correct temperature-unit notation; whether a reading is positive or negative does not determine membership in this group.',
  },
});
