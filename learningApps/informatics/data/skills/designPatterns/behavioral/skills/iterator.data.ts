import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const iterator_Skill_Data = buildSkillConfig({
  slug: "iterator",
  id: "1e7127bc-f931-4027-8274-88b03bdeb9e7",
  name: {
    en: "Iterator",
  },
  description: {
    methodological: "Traverse collection elements through a defined interface without exposing their internal representation.",
    frontend: {
      en: "Visit collection elements without exposing how the collection is stored.",
    },
  },
});
