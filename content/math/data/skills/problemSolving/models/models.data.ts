import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import {
  chooseOperationAddSub_Skill_Data,
  chooseOperationMulDiv_Skill_Data,
  createProblem_Skill_Data,
  oneStepModel_Skill_Data,
} from './skills';

export const models_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'models',
  id: '09128b1e-b715-40c1-a99c-da46e3f0a3d0',
  name: {
    en: 'Problem models',
    qm: 'Mesele modelleri',
    lt: 'Uždavinių modeliai',
    lv: 'Uzdevumu modeļi',
    et: 'Ülesannete mudelid',
    be: 'Мадэлі задачаў',
    ka: 'ამოცანების მოდელები',
    kk: 'Есеп модельдері',
    zh: '问题建模',
    hi: 'समस्या के मॉडल',
    es: 'Modelos de problemas',
    ar: 'نماذج المسائل',
    fr: 'Modélisation des problèmes',
    bn: 'সমস্যার মডেল',
    pt: 'Modelagem de problemas',
    ur: 'مسائل کے نمونے',
    id: 'Model masalah',
    de: 'Aufgabenmodelle',
    ja: '問題のモデル化',
    ko: '문제 모델링',
    tr: 'Problem modelleri',
    vi: 'Mô hình bài toán',
    ta: 'சிக்கல் மாதிரிகள்',
    te: 'సమస్య నమూనాలు',
    mr: 'समस्यांची प्रतिमाने',
    ms: 'Model masalah',
    he: 'מודלים לבעיות',
    pl: 'Modele zadań',
    uk: 'Моделювання задач',
  },
  skills: {
    chooseOperationAddSub: chooseOperationAddSub_Skill_Data,
    chooseOperationMulDiv: chooseOperationMulDiv_Skill_Data,
    oneStepModel: oneStepModel_Skill_Data,
    createProblem: createProblem_Skill_Data,
  },
  description: {
    methodological:
      'Relationships between a concrete situation, drawing, schematic model, and numerical expression representing the required operation.',
  },
});
