import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const distinguishValueCopyingFromSharedReferences_Skill_Data = buildSkillConfig({
  slug: "distinguishValueCopyingFromSharedReferences",
  id: "f6499ac2-6ad9-4160-81a6-64404f83aa81",
  name: {
    en: "Distinguish Value Copying from Shared References",
  },
  description: {
    methodological: "In a particular language, demonstrate when modifying a reference affects a shared mutable object and when a new value remains independent; do not equate this universally with a primitive/reference type distinction.",
    frontend: {
      en: "Explain when two variables share an object and when values are independent.",
    },
  },
});
