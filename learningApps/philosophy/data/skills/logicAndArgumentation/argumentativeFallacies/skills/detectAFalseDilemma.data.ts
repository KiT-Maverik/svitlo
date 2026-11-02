import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const detectAFalseDilemma_Skill_Data = buildSkillConfig({
  slug: "detectAFalseDilemma",
  id: "06f0eb6f-29e7-49a6-aba1-9a7e654f4670",
  name: {
    en: "Detect a false dilemma",
  },
  description: {
    methodological: "Identify a purported exhaustive choice that overlooks meaningful alternatives or combined possibilities.",
    frontend: {
      en: "Find meaningful alternatives hidden by a misleading either-or choice.",
    },
  },
});
