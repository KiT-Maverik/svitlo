import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const interpretStandardWeatherSymbolsOnAMap_Skill_Data = buildSkillConfig({
  slug: "interpretStandardWeatherSymbolsOnAMap",
  id: "d0fbd9a0-ed51-41b8-afba-d78f3f746eb3",
  name: {
    en: "Interpret standard weather symbols on a map",
  },
  description: {
    methodological: "Use an explicit legend to identify rain, cloud, or wind indicators without relying on color alone.",
    frontend: {
      en: "Use a legend to interpret weather symbols on a map.",
    },
  },
});
