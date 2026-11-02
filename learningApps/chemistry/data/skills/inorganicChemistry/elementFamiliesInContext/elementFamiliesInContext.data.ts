import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { allotropes_Skill_Data, metalReactivity_Skill_Data, nobleGases_Skill_Data, nonmetals_Skill_Data } from './skills';

export const elementFamiliesInContext_SkillGroup_Data = buildSkillGroupConfig({
  slug: "elementFamiliesInContext",
  id: "4f2c1be2-a355-4fb2-a454-d90ab013c2f4",
  name: {
    en: "Element Families in Context",
  },
  skills: {
    allotropes: allotropes_Skill_Data,
    metalReactivity: metalReactivity_Skill_Data,
    nobleGases: nobleGases_Skill_Data,
    nonmetals: nonmetals_Skill_Data,
  },
  description: {
    methodological: "Elemental forms can vary in structure, oxidation state and behavior despite shared periodic classification.",
    frontend: {
      en: "Compare chemical behavior among common families of elements.",
    },
  },
});
