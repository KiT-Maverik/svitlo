import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const heatExchangers_Skill_Data = buildSkillConfig({
  slug: "heatExchangers",
  id: "016bccbe-0744-45cb-bd06-610a8551d7a1",
  name: {
    en: "Heat exchangers",
  },
  description: {
    methodological: "Show how two streams transfer heat across a barrier without normally mixing.",
    frontend: {
      en: "Explain how heat flows between separate streams in a heat exchanger.",
    },
  },
});
