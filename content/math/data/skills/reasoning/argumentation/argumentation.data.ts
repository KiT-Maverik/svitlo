import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  classifyAndJustify_Skill_Data,
  findCounterexample_Skill_Data,
  explainStrategy_Skill_Data,
  distinguishExampleRule_Skill_Data,
  drawConclusion_Skill_Data,
} from './skills';

export const argumentation_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'argumentation',
  id: '811e7c20-0dd4-40d2-8ff3-a7bce455d29f',
  name: {
    en: 'Mathematical argumentation',
    qm: 'Matematik isbatlav',
    lt: 'Matematinis argumentavimas',
    lv: 'Matemātiskā argumentācija',
    et: 'Matemaatiline põhjendamine',
    be: 'Матэматычная аргумэнтацыя',
    ka: 'მათემატიკური არგუმენტაცია',
    kk: 'Математикалық дәлелдеу',
    zh: '数学论证',
    hi: 'गणितीय तर्क-वितर्क',
    es: 'Argumentación matemática',
    ar: 'التبرير الرياضي',
    fr: 'Argumentation mathématique',
    bn: 'গাণিতিক যুক্তি উপস্থাপন',
    pt: 'Argumentação matemática',
    ur: 'ریاضی استدلال',
    id: 'Argumentasi matematika',
    de: 'Mathematisches Begründen',
    ja: '数学的な根拠づけ',
    ko: '수학적 논증',
    tr: 'Matematiksel gerekçelendirme',
    vi: 'Lập luận toán học',
    ta: 'கணித வாதம்',
    te: 'గణిత వాదన',
    mr: 'गणितीय युक्तिवाद',
    ms: 'Penghujahan matematik',
    he: 'הנמקה מתמטית',
    pl: 'Argumentacja matematyczna',
    uk: 'Математична аргументація',
  },
  skills: {
    classifyAndJustify: classifyAndJustify_Skill_Data,
    findCounterexample: findCounterexample_Skill_Data,
    explainStrategy: explainStrategy_Skill_Data,
    distinguishExampleRule: distinguishExampleRule_Skill_Data,
    drawConclusion: drawConclusion_Skill_Data,
  },
  description: {
    methodological:
      'Justifying conclusions from mathematical conditions, evaluating universal statements, and explaining the selected solution method.',
  },
});
