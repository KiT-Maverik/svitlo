import { defineSkillGroup } from '@svitlo/engine/build';

import { chooseOperationAddSub } from './chooseOperationAddSub';
import { chooseOperationMulDiv } from './chooseOperationMulDiv';
import { createProblem } from './createProblem';
import { oneStepModel } from './oneStepModel';

export const models = defineSkillGroup({
  slug: 'models',
  id: '09128b1e-b715-40c1-a99c-da46e3f0a3d0',
  name: {
    ar: 'نماذج المسائل',
    be: 'Мадэлі задачаў',
    bn: 'সমস্যার মডেল',
    de: 'Aufgabenmodelle',
    en: 'Problem models',
    es: 'Modelos de problemas',
    et: 'Ülesannete mudelid',
    fr: 'Modélisation des problèmes',
    he: 'מודלים לבעיות',
    hi: 'समस्या के मॉडल',
    id: 'Model masalah',
    it: 'Modelli per i problemi',
    ja: '問題のモデル化',
    ka: 'ამოცანების მოდელები',
    kk: 'Esep modelderı',
    ko: '문제 모델링',
    lt: 'Uždavinių modeliai',
    lv: 'Uzdevumu modeļi',
    mr: 'समस्यांची प्रतिमाने',
    ms: 'Model masalah',
    pl: 'Modele zadań',
    pt: 'Modelagem de problemas',
    qm: 'Mesele modelleri',
    ta: 'சிக்கல் மாதிரிகள்',
    te: 'సమస్య నమూనాలు',
    tr: 'Problem modelleri',
    uk: 'Моделювання задач',
    ur: 'مسائل کے نمونے',
    vi: 'Mô hình bài toán',
    zh: '问题建模',
  },
  skills: {
    chooseOperationAddSub,
    chooseOperationMulDiv,
    createProblem,
    oneStepModel,
  },
  description: {
    methodological:
      'Relationships between a concrete situation, drawing, schematic model, and numerical expression representing the required operation.',
  },
});
