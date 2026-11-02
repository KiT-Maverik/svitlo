import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainDNS_Skill_Data = buildSkillConfig({
  slug: "explainDNS",
  id: "c74ae7d0-025f-4abb-b8f2-282166c52a98",
  name: {
    en: "Explain DNS",
  },
  description: {
    methodological: "DNS resolves domain names to network addresses; it does not replace actual data transmission between devices.",
    frontend: {
      en: "Explain how DNS helps find network addresses from domain names.",
    },
  },
});
