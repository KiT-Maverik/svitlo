import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const economicDataQuality_Skill_Data = buildSkillConfig({
  slug: "economicDataQuality",
  id: "60febcca-4187-4172-baae-58d4086cea21",
  name: {
    en: "Якість економічних даних",
  },
  description: {
    methodological: "Check sources, samples, measurement methods, revisions, and limitations of comparisons.",
    frontend: {
      en: "Judge whether economic figures come from reliable and comparable data.",
    },
  },
});
