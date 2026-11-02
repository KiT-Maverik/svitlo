import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { computeSetIntersection_Skill_Data, computeSetUnion_Skill_Data, explainSetStructure_Skill_Data, testSetMembership_Skill_Data } from './skills';

export const sets_SkillGroup_Data = buildSkillGroupConfig({
  slug: "sets",
  id: "526a36eb-6cd4-41d6-aa8e-72ed92effbd1",
  name: {
    en: "Sets",
  },
  skills: {
    computeSetIntersection: computeSetIntersection_Skill_Data,
    computeSetUnion: computeSetUnion_Skill_Data,
    explainSetStructure: explainSetStructure_Skill_Data,
    testSetMembership: testSetMembership_Skill_Data,
  },
  description: {
    methodological: "Collections of unique elements supporting membership tests, union, and intersection. Positional indexing is not an inherent property of a set.",
    frontend: {
      en: "Explore collections of unique values and operations on their membership.",
    },
  },
});
