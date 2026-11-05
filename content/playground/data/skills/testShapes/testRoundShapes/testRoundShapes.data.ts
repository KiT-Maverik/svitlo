// Synthetic Playground fixtures. Locale-tagged strings are test placeholders, not translations.
import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';
import { testRecognizeCircle_Skill_Data, testRecognizeOval_Skill_Data } from './skills';

export const testRoundShapes_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'testRoundShapes',
  id: '00000000-0000-4000-8000-000000000010',
  name: {
    en: '[TEST en] Round shapes',
    zh: '[TEST zh] Round shapes',
    hi: '[TEST hi] Round shapes',
    es: '[TEST es] Round shapes',
    ar: '[TEST ar] Round shapes',
    fr: '[TEST fr] Round shapes',
    bn: '[TEST bn] Round shapes',
    pt: '[TEST pt] Round shapes',
    ur: '[TEST ur] Round shapes',
    id: '[TEST id] Round shapes',
    de: '[TEST de] Round shapes',
    ja: '[TEST ja] Round shapes',
    ko: '[TEST ko] Round shapes',
    tr: '[TEST tr] Round shapes',
    vi: '[TEST vi] Round shapes',
    ta: '[TEST ta] Round shapes',
    te: '[TEST te] Round shapes',
    mr: '[TEST mr] Round shapes',
    ms: '[TEST ms] Round shapes',
    he: '[TEST he] Round shapes',
    pl: '[TEST pl] Round shapes',
    uk: '[TEST uk] Round shapes',
    lt: '[TEST lt] Round shapes',
    lv: '[TEST lv] Round shapes',
    et: '[TEST et] Round shapes',
    be: '[TEST be] Round shapes',
    ka: '[TEST ka] Round shapes',
    kk: '[TEST kk] Round shapes',
    qm: '[TEST qm] Round shapes',
  },
  skills: {
    testRecognizeCircle: testRecognizeCircle_Skill_Data,
    testRecognizeOval: testRecognizeOval_Skill_Data,
  },
});
