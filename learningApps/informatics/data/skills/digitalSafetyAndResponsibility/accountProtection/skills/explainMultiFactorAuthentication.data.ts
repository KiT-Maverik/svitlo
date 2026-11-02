import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const explainMultiFactorAuthentication_Skill_Data = buildSkillConfig({
  slug: "explainMultiFactorAuthentication",
  id: "1b11ddbb-539c-49e2-aaa1-0a5d2425ecff",
  name: {
    en: "Explain Multi-Factor Authentication",
  },
  description: {
    methodological: "Explain how different factor categories can be combined for sign-in: knowledge (password), possession (device or security key), and biometrics. Two passwords are not two independent factors; MFA lowers risk but cannot make an account invulnerable.",
    frontend: {
      en: "Understand how a second independent authentication factor protects an account.",
    },
  },
});
