import { buildSkillGroupConfig } from '@svitlo/engine/taxonomy';

import { abstractFactory_Skill_Data, builder_Skill_Data, factoryMethod_Skill_Data, prototype_Skill_Data, singleton_Skill_Data } from './skills';

export const creational_SkillGroup_Data = buildSkillGroupConfig({
  slug: "creational",
  id: "05e2c408-0705-48cb-8c2e-b10ff4ef8d4b",
  name: {
    en: "Creational",
  },
  skills: {
    abstractFactory: abstractFactory_Skill_Data,
    builder: builder_Skill_Data,
    factoryMethod: factoryMethod_Skill_Data,
    prototype: prototype_Skill_Data,
    singleton: singleton_Skill_Data,
  },
  description: {
    methodological: "Five approaches to constructing instances and object families that separate creation logic from usage.",
    frontend: {
      en: "Learn patterns for constructing objects without tying clients to concrete types.",
    },
  },
});
