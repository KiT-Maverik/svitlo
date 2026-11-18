import { defineSkillGroup } from '@svitlo/engine/build';

import { readTemperature } from './readTemperature';

export const temperature = defineSkillGroup({
  slug: 'temperature',
  id: '3bf02823-2dbf-49cd-af93-2df758f4208a',
  name: {
    ar: 'درجة الحرارة',
    be: 'Тэмпэратура',
    bn: 'তাপমাত্রা',
    de: 'Temperatur',
    en: 'Temperature',
    es: 'Temperatura',
    et: 'Temperatuur',
    fr: 'Température',
    he: 'טמפרטורה',
    hi: 'तापमान',
    id: 'Suhu',
    it: 'Temperatura',
    ja: '温度',
    ka: 'ტემპერატურა',
    kk: 'Temperatura',
    ko: '온도',
    lt: 'Temperatūra',
    lv: 'Temperatūra',
    mr: 'तापमान',
    ms: 'Suhu',
    pl: 'Temperatura',
    pt: 'Temperatura',
    qm: 'Sıcaqlıq',
    ta: 'வெப்பநிலை',
    te: 'ఉష్ణోగ్రత',
    tr: 'Sıcaklık',
    uk: 'Температура',
    ur: 'درجہ حرارت',
    vi: 'Nhiệt độ',
    zh: '温度',
  },
  skills: {
    readTemperature,
  },
  description: {
    methodological:
      'Temperature as a physical quantity, its reading from a thermometer scale, interpretation of scale divisions, and correct temperature-unit notation; whether a reading is positive or negative does not determine membership in this group.',
  },
});
