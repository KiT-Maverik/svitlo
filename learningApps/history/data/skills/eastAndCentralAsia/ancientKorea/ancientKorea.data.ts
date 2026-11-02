import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { baekje_Skill_Data, goguryeo_Skill_Data, gojoseon_Skill_Data, silla_Skill_Data } from './skills';

export const ancientKorea_SkillGroup_Data = buildSkillGroupConfig({
  slug: "ancientKorea",
  id: "84333876-0c5b-4758-94f2-5c28e374ec9c",
  name: {
    en: "Корея",
  },
  skills: {
    baekje: baekje_Skill_Data,
    goguryeo: goguryeo_Skill_Data,
    gojoseon: gojoseon_Skill_Data,
    silla: silla_Skill_Data,
  },
  description: {
    methodological: "Study early Korean and Manchurian polities through texts and archaeology that do not always corroborate traditional founding dates.",
    frontend: {
      en: "Explore the early kingdoms of the Korean peninsula.",
    },
  },
});
