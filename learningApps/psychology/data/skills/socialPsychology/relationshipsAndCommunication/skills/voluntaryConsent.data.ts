import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const voluntaryConsent_Skill_Data = buildSkillConfig({
  slug: "voluntaryConsent",
  id: "9a9d642c-08d3-42d8-bcb3-88074992f420",
  name: {
    en: "Voluntary Consent",
  },
  description: {
    methodological: "Distinguish an informed, freely given and revocable agreement from silence, coercion, or assumed permission.",
    frontend: {
      en: "Understand that consent must be voluntary and can be withdrawn.",
    },
  },
});
