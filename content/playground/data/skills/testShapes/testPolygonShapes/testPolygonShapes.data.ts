// Synthetic Playground fixtures. Locale-tagged strings are test placeholders, not translations.
import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';
import { testRecognizeTriangle_Skill_Data, testRecognizeSquare_Skill_Data } from './skills';

export const testPolygonShapes_SkillGroup_Data = buildSkillGroupConfig({
  slug: 'testPolygonShapes',
  id: '00000000-0000-4000-8000-000000000013',
  name: {
    en: '[TEST en] Polygon shapes',
    zh: '[TEST zh] Polygon shapes',
    hi: '[TEST hi] Polygon shapes',
    es: '[TEST es] Polygon shapes',
    ar: '[TEST ar] Polygon shapes',
    fr: '[TEST fr] Polygon shapes',
    bn: '[TEST bn] Polygon shapes',
    pt: '[TEST pt] Polygon shapes',
    ur: '[TEST ur] Polygon shapes',
    id: '[TEST id] Polygon shapes',
    de: '[TEST de] Polygon shapes',
    ja: '[TEST ja] Polygon shapes',
    ko: '[TEST ko] Polygon shapes',
    tr: '[TEST tr] Polygon shapes',
    vi: '[TEST vi] Polygon shapes',
    ta: '[TEST ta] Polygon shapes',
    te: '[TEST te] Polygon shapes',
    mr: '[TEST mr] Polygon shapes',
    ms: '[TEST ms] Polygon shapes',
    he: '[TEST he] Polygon shapes',
    pl: '[TEST pl] Polygon shapes',
    uk: '[TEST uk] Polygon shapes',
    lt: '[TEST lt] Polygon shapes',
    lv: '[TEST lv] Polygon shapes',
    et: '[TEST et] Polygon shapes',
    be: '[TEST be] Polygon shapes',
    ka: '[TEST ka] Polygon shapes',
    kk: '[TEST kk] Polygon shapes',
    qm: '[TEST qm] Polygon shapes',
  },
  skills: {
    testRecognizeTriangle: testRecognizeTriangle_Skill_Data,
    testRecognizeSquare: testRecognizeSquare_Skill_Data,
  },
});
