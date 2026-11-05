// Synthetic Playground fixtures. Locale-tagged strings are test placeholders, not translations.
import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';
import { testWarmColors_SkillGroup_Data } from './testWarmColors/testWarmColors.data';
import { testCoolColors_SkillGroup_Data } from './testCoolColors/testCoolColors.data';

export const testColors_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'testColors',
  id: '00000000-0000-4000-8000-000000000007',
  name: {
    en: '[TEST en] Color recognition',
    zh: '[TEST zh] Color recognition',
    hi: '[TEST hi] Color recognition',
    es: '[TEST es] Color recognition',
    ar: '[TEST ar] Color recognition',
    fr: '[TEST fr] Color recognition',
    bn: '[TEST bn] Color recognition',
    pt: '[TEST pt] Color recognition',
    ur: '[TEST ur] Color recognition',
    id: '[TEST id] Color recognition',
    de: '[TEST de] Color recognition',
    ja: '[TEST ja] Color recognition',
    ko: '[TEST ko] Color recognition',
    tr: '[TEST tr] Color recognition',
    vi: '[TEST vi] Color recognition',
    ta: '[TEST ta] Color recognition',
    te: '[TEST te] Color recognition',
    mr: '[TEST mr] Color recognition',
    ms: '[TEST ms] Color recognition',
    he: '[TEST he] Color recognition',
    pl: '[TEST pl] Color recognition',
    uk: '[TEST uk] Color recognition',
    lt: '[TEST lt] Color recognition',
    lv: '[TEST lv] Color recognition',
    et: '[TEST et] Color recognition',
    be: '[TEST be] Color recognition',
    ka: '[TEST ka] Color recognition',
    kk: '[TEST kk] Color recognition',
    qm: '[TEST qm] Color recognition',
  },
  groups: {
    testWarmColors: testWarmColors_SkillGroup_Data,
    testCoolColors: testCoolColors_SkillGroup_Data,
  },
});
