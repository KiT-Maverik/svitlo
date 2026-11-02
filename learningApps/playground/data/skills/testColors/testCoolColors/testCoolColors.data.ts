// Synthetic Playground fixtures. Locale-tagged strings are test placeholders, not translations.
import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';
import { testRecognizeBlue_Skill_Data, testRecognizeGreen_Skill_Data } from './skills';

export const testCoolColors_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'testCoolColors',
  id: '00000000-0000-4000-8000-000000000006',
  name: {
    en: '[TEST en] Cool colors',
    zh: '[TEST zh] Cool colors',
    hi: '[TEST hi] Cool colors',
    es: '[TEST es] Cool colors',
    ar: '[TEST ar] Cool colors',
    fr: '[TEST fr] Cool colors',
    bn: '[TEST bn] Cool colors',
    pt: '[TEST pt] Cool colors',
    ur: '[TEST ur] Cool colors',
    id: '[TEST id] Cool colors',
    de: '[TEST de] Cool colors',
    ja: '[TEST ja] Cool colors',
    ko: '[TEST ko] Cool colors',
    tr: '[TEST tr] Cool colors',
    vi: '[TEST vi] Cool colors',
    ta: '[TEST ta] Cool colors',
    te: '[TEST te] Cool colors',
    mr: '[TEST mr] Cool colors',
    ms: '[TEST ms] Cool colors',
    he: '[TEST he] Cool colors',
    pl: '[TEST pl] Cool colors',
    uk: '[TEST uk] Cool colors',
    lt: '[TEST lt] Cool colors',
    lv: '[TEST lv] Cool colors',
    et: '[TEST et] Cool colors',
    be: '[TEST be] Cool colors',
    ka: '[TEST ka] Cool colors',
    kk: '[TEST kk] Cool colors',
    qm: '[TEST qm] Cool colors',
  },
  skills: {
    testRecognizeBlue: testRecognizeBlue_Skill_Data,
    testRecognizeGreen: testRecognizeGreen_Skill_Data,
  },
});
