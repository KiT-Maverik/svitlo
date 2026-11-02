import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const applyElementCounting_Skill_Data = buildSkillConfig({
  slug: "applyElementCounting",
  id: "11a9fb37-9afc-43f6-af92-d48fc7eaa39f",
  name: {
    en: "Apply Element Counting",
  },
  description: {
    methodological: "Traverse a collection, incrementing a counter for every item that meets the given condition.",
    frontend: {
      en: "Count all collection elements that meet a stated condition.",
    },
  },
});
