import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { absoluteAdvantage_Skill_Data, comparativeAdvantage_Skill_Data, gainsFromInternationalTrade_Skill_Data, globalValueChains_Skill_Data } from './skills';

export const specializationAndTradeGains_SkillGroup_Data = buildSkillGroupConfig({
  slug: "specializationAndTradeGains",
  id: "7ab3048b-121f-415a-925b-b02d81ebcb70",
  name: {
    en: "Спеціалізація та вигоди торгівлі",
  },
  skills: {
    absoluteAdvantage: absoluteAdvantage_Skill_Data,
    comparativeAdvantage: comparativeAdvantage_Skill_Data,
    gainsFromInternationalTrade: gainsFromInternationalTrade_Skill_Data,
    globalValueChains: globalValueChains_Skill_Data,
  },
  description: {
    methodological: "Relative rather than merely absolute advantages can explain the pattern of exchange between economies.",
    frontend: {
      en: "Discover why countries specialize and what they gain from trading.",
    },
  },
});
