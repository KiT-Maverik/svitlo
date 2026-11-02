// Synthetic Playground fixtures. Locale-tagged strings are test placeholders, not translations.
import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';
import { testRecognizeRed_Skill_Data, testRecognizeOrange_Skill_Data } from './skills';

export const testWarmColors_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'testWarmColors',
  id: '00000000-0000-4000-8000-000000000003',
  name: {
    en: '[TEST en] Warm colors',
    zh: '[TEST zh] Warm colors',
    hi: '[TEST hi] Warm colors',
    es: '[TEST es] Warm colors',
    ar: '[TEST ar] Warm colors',
    fr: '[TEST fr] Warm colors',
    bn: '[TEST bn] Warm colors',
    pt: '[TEST pt] Warm colors',
    ur: '[TEST ur] Warm colors',
    id: '[TEST id] Warm colors',
    de: '[TEST de] Warm colors',
    ja: '[TEST ja] Warm colors',
    ko: '[TEST ko] Warm colors',
    tr: '[TEST tr] Warm colors',
    vi: '[TEST vi] Warm colors',
    ta: '[TEST ta] Warm colors',
    te: '[TEST te] Warm colors',
    mr: '[TEST mr] Warm colors',
    ms: '[TEST ms] Warm colors',
    he: '[TEST he] Warm colors',
    pl: '[TEST pl] Warm colors',
    uk: '[TEST uk] Warm colors',
    lt: '[TEST lt] Warm colors',
    lv: '[TEST lv] Warm colors',
    et: '[TEST et] Warm colors',
    be: '[TEST be] Warm colors',
    ka: '[TEST ka] Warm colors',
    kk: '[TEST kk] Warm colors',
    qm: '[TEST qm] Warm colors',
  },
  skills: {
    testRecognizeRed: testRecognizeRed_Skill_Data,
    testRecognizeOrange: testRecognizeOrange_Skill_Data,
  },
});
