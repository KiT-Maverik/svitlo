import { defineSkillGroup } from '@svitlo/engine/build';

import { buildBarChart } from './buildBarChart';
import { buildPictograph } from './buildPictograph';
import { linePlotMeasurements } from './linePlotMeasurements';
import { readBarChart } from './readBarChart';
import { readPictograph } from './readPictograph';
import { readSimpleTable } from './readSimpleTable';
import { scaledChart } from './scaledChart';

export const presentation = defineSkillGroup({
  slug: 'presentation',
  id: '37dd18b1-b119-438c-96e5-44226023a7a3',
  name: {
    ar: 'تمثيل البيانات',
    be: 'Прадстаўленьне зьвестак',
    bn: 'উপাত্ত উপস্থাপন',
    de: 'Datendarstellung',
    en: 'Data representation',
    es: 'Representación de datos',
    et: 'Andmete esitamine',
    fr: 'Représentation des données',
    he: 'ייצוג נתונים',
    hi: 'आँकड़ों का निरूपण',
    id: 'Penyajian data',
    it: 'Rappresentazione dei dati',
    ja: 'データの表現',
    ka: 'მონაცემების წარმოდგენა',
    kk: 'Derekterdı ūsynu',
    ko: '자료 표현',
    lt: 'Duomenų pateikimas',
    lv: 'Datu attēlošana',
    mr: 'माहितीचे सादरीकरण',
    ms: 'Perwakilan data',
    pl: 'Przedstawianie danych',
    pt: 'Representação de dados',
    qm: 'Malümatlarnı kösterüv',
    ta: 'தரவுக் காட்சிப்படுத்தல்',
    te: 'దత్తాంశ ప్రదర్శన',
    tr: 'Veri gösterimi',
    uk: 'Подання даних',
    ur: 'اعداد و شمار کی نمائندگی',
    vi: 'Biểu diễn dữ liệu',
    zh: '数据呈现',
  },
  skills: {
    buildBarChart,
    buildPictograph,
    linePlotMeasurements,
    readBarChart,
    readPictograph,
    readSimpleTable,
    scaledChart,
  },
  description: {
    methodological:
      'Representing collected counts in tables, pictographs, and charts while correctly interpreting the scales and values of marks.',
  },
});
