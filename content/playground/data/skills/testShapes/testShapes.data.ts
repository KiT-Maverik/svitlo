// Synthetic Playground fixtures. Locale-tagged strings are test placeholders, not translations.
import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';
import { testRoundShapes_SkillGroup_Data } from './testRoundShapes/testRoundShapes.data';
import { testPolygonShapes_SkillGroup_Data } from './testPolygonShapes/testPolygonShapes.data';

export const testShapes_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'testShapes',
  id: '00000000-0000-4000-8000-000000000014',
  name: {
    en: '[TEST en] Shape recognition',
    zh: '[TEST zh] Shape recognition',
    hi: '[TEST hi] Shape recognition',
    es: '[TEST es] Shape recognition',
    ar: '[TEST ar] Shape recognition',
    fr: '[TEST fr] Shape recognition',
    bn: '[TEST bn] Shape recognition',
    pt: '[TEST pt] Shape recognition',
    ur: '[TEST ur] Shape recognition',
    id: '[TEST id] Shape recognition',
    de: '[TEST de] Shape recognition',
    ja: '[TEST ja] Shape recognition',
    ko: '[TEST ko] Shape recognition',
    tr: '[TEST tr] Shape recognition',
    vi: '[TEST vi] Shape recognition',
    ta: '[TEST ta] Shape recognition',
    te: '[TEST te] Shape recognition',
    mr: '[TEST mr] Shape recognition',
    ms: '[TEST ms] Shape recognition',
    he: '[TEST he] Shape recognition',
    pl: '[TEST pl] Shape recognition',
    uk: '[TEST uk] Shape recognition',
    lt: '[TEST lt] Shape recognition',
    lv: '[TEST lv] Shape recognition',
    et: '[TEST et] Shape recognition',
    be: '[TEST be] Shape recognition',
    ka: '[TEST ka] Shape recognition',
    kk: '[TEST kk] Shape recognition',
    qm: '[TEST qm] Shape recognition',
  },
  groups: {
    testRoundShapes: testRoundShapes_SkillGroup_Data,
    testPolygonShapes: testPolygonShapes_SkillGroup_Data,
  },
});
