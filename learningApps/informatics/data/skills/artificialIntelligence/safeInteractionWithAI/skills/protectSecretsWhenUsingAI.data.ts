import { buildSkillConfig } from '@svitlo/engine/taxonomy';

export const protectSecretsWhenUsingAI_Skill_Data = buildSkillConfig({
  slug: "protectSecretsWhenUsingAI",
  id: "ce8bc546-e3c4-4539-ad46-5666db8bfbb4",
  name: {
    en: "Protect Secrets When Using AI",
  },
  description: {
    methodological: "Avoid entering passwords, confirmation codes, access keys, or confidential information into chatbots without proper authorization and verified safeguards.",
    frontend: {
      en: "Protect passwords, access keys and confidential information when working with AI.",
    },
  },
});
