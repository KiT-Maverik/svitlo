import { defineSkillGroup } from '@svitlo/engine/build';

import { collectCounts } from './collectCounts';
import { fillSimpleTable } from './fillSimpleTable';
import { formulateInvestigationQuestion } from './formulateInvestigationQuestion';
import { tallyMarks } from './tallyMarks';

export const collection = defineSkillGroup({
  slug: 'collection',
  id: 'fbff6de3-3855-4c1f-9ec6-025693e12adf',
  name: {
    ar: 'جمع البيانات',
    be: 'Збор зьвестак',
    bn: 'উপাত্ত সংগ্রহ',
    de: 'Datenerhebung',
    en: 'Data collection',
    es: 'Recopilación de datos',
    et: 'Andmete kogumine',
    fr: 'Collecte des données',
    he: 'איסוף נתונים',
    hi: 'आँकड़ों का संग्रह',
    id: 'Pengumpulan data',
    it: 'Raccolta dei dati',
    ja: 'データの収集',
    ka: 'მონაცემების შეგროვება',
    kk: 'Derekterdı jinau',
    ko: '자료 수집',
    lt: 'Duomenų rinkimas',
    lv: 'Datu vākšana',
    mr: 'माहिती संकलन',
    ms: 'Pengumpulan data',
    pl: 'Zbieranie danych',
    pt: 'Coleta de dados',
    qm: 'Malümat toplav',
    ta: 'தரவு சேகரிப்பு',
    te: 'దత్తాంశ సేకరణ',
    tr: 'Veri toplama',
    uk: 'Збирання даних',
    ur: 'اعداد و شمار جمع کرنا',
    vi: 'Thu thập dữ liệu',
    zh: '数据收集',
  },
  skills: {
    collectCounts,
    fillSimpleTable,
    formulateInvestigationQuestion,
    tallyMarks,
  },
  description: {
    methodological:
      'Formulating an investigation question, selecting classification attributes, counting occurrences, and recording observations.',
  },
});
