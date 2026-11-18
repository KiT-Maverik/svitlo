import { defineSkillGroup } from '@svitlo/engine/build';

import { classifyAndJustify } from './classifyAndJustify';
import { distinguishExampleRule } from './distinguishExampleRule';
import { drawConclusion } from './drawConclusion';
import { explainStrategy } from './explainStrategy';
import { findCounterexample } from './findCounterexample';

export const argumentation = defineSkillGroup({
  slug: 'argumentation',
  id: '811e7c20-0dd4-40d2-8ff3-a7bce455d29f',
  name: {
    ar: 'التبرير الرياضي',
    be: 'Матэматычная аргумэнтацыя',
    bn: 'গাণিতিক যুক্তি উপস্থাপন',
    de: 'Mathematisches Begründen',
    en: 'Mathematical argumentation',
    es: 'Argumentación matemática',
    et: 'Matemaatiline põhjendamine',
    fr: 'Argumentation mathématique',
    he: 'הנמקה מתמטית',
    hi: 'गणितीय तर्क-वितर्क',
    id: 'Argumentasi matematika',
    it: 'Argomentazione matematica',
    ja: '数学的な根拠づけ',
    ka: 'მათემატიკური არგუმენტაცია',
    kk: 'Matematikalyq däleldeu',
    ko: '수학적 논증',
    lt: 'Matematinis argumentavimas',
    lv: 'Matemātiskā argumentācija',
    mr: 'गणितीय युक्तिवाद',
    ms: 'Penghujahan matematik',
    pl: 'Argumentacja matematyczna',
    pt: 'Argumentação matemática',
    qm: 'Matematik isbatlav',
    ta: 'கணித வாதம்',
    te: 'గణిత వాదన',
    tr: 'Matematiksel gerekçelendirme',
    uk: 'Математична аргументація',
    ur: 'ریاضی استدلال',
    vi: 'Lập luận toán học',
    zh: '数学论证',
  },
  skills: {
    classifyAndJustify,
    distinguishExampleRule,
    drawConclusion,
    explainStrategy,
    findCounterexample,
  },
  description: {
    methodological:
      'Justifying conclusions from mathematical conditions, evaluating universal statements, and explaining the selected solution method.',
  },
});
