import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { arabianTradeRoutes_Skill_Data, southArabianKingdoms_Skill_Data } from './skills';

export const ancientSouthArabia_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientSouthArabia",
  id: "8e230639-c72e-4e01-899e-f96e92c075aa",
  name: {
    en: "Південна Аравія",
  },
  skills: {
    arabianTradeRoutes: arabianTradeRoutes_Skill_Data,
    southArabianKingdoms: southArabianKingdoms_Skill_Data,
  },
  description: {
    methodological: "Oasis and mountain centers participated in long-distance trade before the Islamic period.",
    frontend: {
      en: "Discover the trading kingdoms of ancient southern Arabia.",
    },
  },
});
